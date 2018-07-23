
import { Component } from '@angular/core';
import { NavController, NavParams, App, AlertController } from 'ionic-angular';

import { MarionnettePage } from '../marionnette/marionnette';
import { LoginPage } from '../login/login';
import { RunPage } from '../run/run';

import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

declare var cordova;

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
  pairedDevicesTable = [];
  gettingDevices: Boolean;
  connected  = [];
  addressSelected : any;

  online: string = "online";

  success = (data) => alert(data);
  fail = (error) => alert(error);

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private bluetoothSerial: BluetoothSerial,
    private bluetoothSerial2: BluetoothSerial,
    private alertCtrl: AlertController,
    public authServiceProvider:AuthServiceProvider,
    public app: App
  ) {

    bluetoothSerial.enable();
    this.connected = [];


    bluetoothSerial.list().then((success) => {
      this.pairedDevices = success;
      let name, classe, id, connected;
      this.pairedDevicesTable = [];
      for(let i = 0; i < this.pairedDevices.length; i++){
        name = this.pairedDevices[i].name;
        classe = this.pairedDevices[i].class;
        id = this.pairedDevices[i].id;
        this.connected.push({connectid : "not connected"});
        connected = this.connected[i].connectid;

        if(name.substring(0,14) == "little_chicken" || name.substring(0,11) == "Big_Chicken" || name.substring(0,10) == "BigChicken" || name.substring(0,4) == "HC06" || name.substring(0,11) == "HC-06" ){

          this.pairedDevicesTable.push({
            name: name,
            class: classe,
            id: id,
            connected: connected
          });
        }

      }
    },(err) => {
      let alert = this.alertCtrl.create({
        title: err,
        buttons: ['OK']
      });
      alert.present();
    })

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

    this.bluetoothSerial.isEnabled().then((result:any) => {
      this.bluetoothSerial.isConnected().then((result:any) => {
        this.bluetoothSerial.list().then((success) => {
          this.pairedDevices = success;
          let name, classe, id, connected;
          this.pairedDevicesTable = [];
          for(let i = 0; i < this.pairedDevices.length; i++){
            name = this.pairedDevices[i].name;
            classe = this.pairedDevices[i].class;
            id = this.pairedDevices[i].id;
            if(this.pairedDevices[i].id == this.addressSelected){
              this.connected[i].connectid = "connecté";
            }
            connected = this.connected[i].connectid;

            if(name.substring(0,14) == "little_chicken" || name.substring(0,11) == "Big_Chicken" || name.substring(0,10) == "BigChicken" || name.substring(0,4) == "HC06" || name.substring(0,11) == "HC-06" ){
              this.pairedDevicesTable.push({
                name: name,
                class: classe,
                id: id,
                connected: connected
              });
            }
            //alert(this.pairedDevicesTable.length);
            //alert(this.connected[id].connectid);
          }

        },(err) => {
          console.log(err);
        })
    },(err) => {
      console.log(err);
    })
  },(err) => {
    console.log(err);
  })
  }

  selectDevice(address: any) {
    this.addressSelected = address;
    let alert = this.alertCtrl.create({
      title: 'Connect',
      message: 'Do you want to connect ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            //console.log('Annuler');
          }
        },
        {
          text: 'Connect',
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
      title: 'Disconnect ?',
      message: 'Do you want to disconnect ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            //console.log('Annuler');
          }
        },
        {
          text: 'Disconnect',
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
      let alert = this.alertCtrl.create({
        title: 'You are connected !',
        buttons: ['OK']
      });
      alert.present();
    }, error => {
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'Please start again',
        buttons: ['OK']
      });
      alert.present();
    });
  }


  //logout
  logout() {
    let nav = this.app.getRootNav();
    this.authServiceProvider.logout();
    nav.setRoot(LoginPage);
 }

}
