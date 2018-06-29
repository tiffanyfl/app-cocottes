
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

  online: string = "online";

  success = (data) => alert(data);
  fail = (error) => alert(error);

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private bluetoothSerial: BluetoothSerial,
    private alertCtrl: AlertController,
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

    this.bluetoothSerial.isEnabled().then((result:any) => {
      this.bluetoothSerial.isConnected().then((result:any) => {
        this.bluetoothSerial.list().then((success) => {
          this.pairedDevices = success;
          let name, classe, id;
          this.pairedDevicesTable = [];
          for(let i = 0; i < this.pairedDevices.length; i++){
            name = this.pairedDevices[i].name;
            classe = this.pairedDevices[i].class;
            id = this.pairedDevices[i].id;

            if(name.substring(0,6) == "Coucou" || name.substring(0,5) == "POULE" || name.substring(0,5) == "Poule" || name.substring(0,14) == "little_chicken" ){
              this.pairedDevicesTable.push({
                name: name,
                class: classe,
                id: id
              });
            }

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
            //this.bluetoothSerial.setMultiple(this.success, this.fail, 'BluetoothSerial2', 'list',[]);
            cordova.exec(
              function(devices) {
                console.log('Device List:', JSON.stringify(devices));
              },
              function(error) {
                console.log('ERROR', error);
              },
              'BluetoothSerial2',
              'list',
              []
          );
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



}
