
import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { MarionnettePage } from '../marionnette/marionnette';
import { LoginPage } from '../login/login';
import { RunPage } from '../run/run';

import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { AlertController } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // Aray of Marionnette
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  // Bluetooth variables
  unpairedDevices: any;
  pairedDevices: any;
  pairedDevicesTable : any;
  gettingDevices: Boolean;

  online: string = "online";

  //BLE
  devices: any[] = [];
  statusMessage: string;
  peripheral: any = {};

  success = (data) => alert(data);
  fail = (error) => alert(error);

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private bluetoothSerial: BluetoothSerial,
    private alertCtrl: AlertController,
    private ble: BLE,
    private ngZone: NgZone,
    private toastCtrl: ToastController,
    public authServiceProvider:AuthServiceProvider,
    public app: App
  ) {

    bluetoothSerial.enable();
  }


  // Pour la liste des appareils connectés (tout en haut de l'appli)
  itemTapped(event, item) {
    this.bluetoothSerial.list().then((success) => {
    //this.ble.bondedDevices.then((success) => {
      this.pairedDevices = success;
    },
      (err) => {

      });
    this.navCtrl.push(MarionnettePage, {
      item: item
    });
  }

  // Pour scanner les appareils connectés en Bluetooth
  startScanning() {
    this.pairedDevices = null;
    this.unpairedDevices = null;
    this.gettingDevices = true;
    this.bluetoothSerial.discoverUnpaired().then((success) => {
      this.unpairedDevices = success;
      this.gettingDevices = false;
      success.forEach(element => {
        // alert(element.name);
      });
    },
      (err) => {
        console.log(err);
      })

      this.bluetoothSerial.list().then((success) => {
        this.pairedDevices = success;
        let name, classe, id;
        this.pairedDevicesTable = [];
        for(let i = 0; i < this.pairedDevices.length; i++){
          name = this.pairedDevices[i].name;
          classe = this.pairedDevices[i].class;
          id = this.pairedDevices[i].id;

          if(name.substring(0,6) == "Coucou" || name.substring(0,5) == "POULE" || name.substring(0,5) == "Poule" ){
            this.pairedDevicesTable.push({
              name: name,
              class: classe,
              id: id
            });
          }
        }
    },(err) => {

    })
  }

  selectDevice(address: any) {

    let alert = this.alertCtrl.create({
      title: 'Connecter',
      message: 'Voulez-vous vous connecter avec ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {
            console.log('Annuler clické');
          }
        },
        {
          text: 'Connecter',
          handler: () => {
            this.bluetoothSerial.connect(address).subscribe(this.success, this.fail);
          }
        }
      ]
    });
    alert.present();

  }

  run(){
    this.navCtrl.push(RunPage);
   }

  // Se déconnecter
  disconnect() {
    let alert = this.alertCtrl.create({
      title: 'Déconnecté ?',
      message: 'Voulez-vous vous déconnecter ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {
            console.log('Annuler');
          }
        },
        {
          text: 'Déconnecter',
          handler: () => {
            this.bluetoothSerial.disconnect();
          }
        }
      ]
    });
    alert.present();
  }

  // Pour envoyer le boléen à Arduino
  startRunning() {
    this.bluetoothSerial.write(this.online).then((success) => {
      alert(success);
    }, error => {
      alert(error);
    });
  }


  //logout
  logout() {
    let nav = this.app.getRootNav();
    this.authServiceProvider.logout();
    nav.setRoot(LoginPage);
 }

 // BLEM
 ionViewDidEnter() {
    console.log('ionViewDidEnter');
    this.scan();
  }

  scan() {
    this.setStatus('Scanning for Bluetooth LE Devices');
    this.devices = [];  // clear list
    this.ble.scan([], 5).subscribe(
      device => this.onDeviceDiscovered(device),
      error => this.scanError(error)
    );

    setTimeout(this.setStatus.bind(this), 5000, 'Scan complete');
    //setTimeout(this.ble.stopScan(), 5000);
    // setTimeout(() => {
    //      this.ble.stopScan();
    //     }, 500);
    // setTimeout( () => {
    //    this.ble.stopScan();
    //  }, 5250);

  //   setTimeout( () => {
  //
  //     this.ble.isConnected('00:18:E4:08:10:04').then((success) => {
  //         alert("Peripheral is connected");
  //     },
  //     error => {
  //       alert("Peripheral is *not* connected");
  //   });
  // }, 5500);
  }

  onDeviceDiscovered(device) {
    console.log('Discovered ' + JSON.stringify(device, null, 2));
    this.ngZone.run(() => {
      this.devices.push(device);
    });
  }

  // If location permission is denied, you'll end up here
  scanError(error) {
    this.setStatus('Error ' + error);
    let toast = this.toastCtrl.create({
      message: 'Error scanning for Bluetooth low energy devices',
      position: 'middle',
      duration: 5000
    });
    toast.present();
  }

  setStatus(message) {
    //alert(message);
    this.ngZone.run(() => {
      this.statusMessage = message;
    });
  }

  deviceSelected(device) {
     console.log(JSON.stringify(device) + ' selected');
    // this.navCtrl.push(MarionnettePage, {
    //   device: device
    // });
    let deviceId = JSON.stringify(device);
    alert(device.id);
    this.ble.connect(device.id).subscribe(
      device => this.onConnected(device),
      device => this.onDeviceDisconnected(device)
    );
    alert(this.peripheral);
  }

  onConnected(peripheral) {
    this.ngZone.run(() => {
      this.setStatus('Ok');
      alert("maybe");
      this.peripheral = peripheral;
    });
  }

  onDeviceDisconnected(peripheral) {
    let toast = this.toastCtrl.create({
      message: 'The peripheral unexpectedly disconnected',
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  }



}
