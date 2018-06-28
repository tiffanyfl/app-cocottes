import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { AlertController } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-run',
  templateUrl: 'run.html'
})
export class RunPage {

  key_btn_1: string = "choregraphy_1";
  key_btn_2: string = "choregraphy_2";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private bluetoothSerial: BluetoothSerial,
    private alertCtrl: AlertController) {

      bluetoothSerial.enable();
  }

  keyBtn1() {
    this.bluetoothSerial.write(this.key_btn_1).then((success) => {
      alert(success);
    }, error => {
      alert(error);
    });
  }

  keyBtn2() {
    this.bluetoothSerial.write(this.key_btn_2).then((success) => {
      alert(success);
    }, error => {
      alert(error);
    });
  }

}
