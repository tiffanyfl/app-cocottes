
import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';


import { MarionnettePage } from '../marionnette/marionnette';
import { LoginPage } from '../login/login';

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
  gettingDevices: Boolean;

  //Ble
  devices: any[] = [{name : "premierTest"}, {name : "secondTest"}];
  serialDatas : any[] = [{data : "premierTest", out: false}, {data : "secondTest", out: true}]
  status : string = "Non connecté";

  online: string = "online";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private bluetoothSerial: BluetoothSerial,
    private alertCtrl: AlertController,

    public authServiceProvider:AuthServiceProvider,
    private ble : BLE,
    private ngZone : NgZone,
    public app: App
  ) {

    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    bluetoothSerial.enable();

    this.items = [];
    for(let i = 1; i < 4; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }

  }

  // Pour la liste des appareils connectés (tout en haut de l'appli)
  itemTapped(event, item) {
    this.bluetoothSerial.list().then((success) => {
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
    },
      (err) => {

      })
  }
  success = (data) => alert(data);
  fail = (error) => alert(error);

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
            console.log('Annuler cliqué');
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

  // Essai BLE (à supprimer)
  scanDevices() {
    //this.devices = [];
    this.ble.scan([], 5).subscribe(
      device => {
        this.ngZone.run(() => {
          this.devices.push(device);
        })
      },
      error => {
        console.log("Erreur pendant le scan");
      }
    )
  }

  //logout

  logout() {
    let nav = this.app.getRootNav();
    this.authServiceProvider.logout();
    nav.setRoot(LoginPage);
 }


}
