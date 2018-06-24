import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private bluetoothSerial: BluetoothSerial,
    private alertCtrl: AlertController,
    public authServiceProvider:AuthServiceProvider,
    private ble : BLE,
    private ngZone : NgZone
  ) {

    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    bluetoothSerial.enable();

    this.items = [];
    for(let i = 1; i < 8; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }

  }

  itemTapped(event, item) {
    this.navCtrl.push(MarionnettePage, {
      item: item
    });
  }

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
      title: 'Connect',
      message: 'Do you want to connect with?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
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

  disconnect() {
    let alert = this.alertCtrl.create({
      title: 'Disconnect?',
      message: 'Do you want to Disconnect?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
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

  startRunning() {
    this.bluetoothSerial.write('true') // Start the measurement
    .then((data: any) => {
      this.bluetoothSerial.available()
      .then((number: any) => {
          this.bluetoothSerial.read()
          .then((data: any) => {
            for (let i = 1; i < data.length; i++) {
              alert(data);
              this.bluetoothSerial.clear();
            }
          });
      })
    })
    .catch((e) => {
    alert(e); // Error alert
    });
  }

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

  logout() {
   this.authServiceProvider.logout();
   this.navCtrl.setRoot(LoginPage);
 }


}
