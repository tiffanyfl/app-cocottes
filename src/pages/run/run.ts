import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
//import { AlertController } from 'ionic-angular';
//import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-run',
  templateUrl: 'run.html'
})
export class RunPage {

  key_btn_0: string = "choregraphy_0";
  key_btn_1: string = "choregraphy_1";
  key_btn_2: string = "choregraphy_2";
  key_btn_3: string = "choregraphy_3";
  key_btn_4: string = "choregraphy_4";
  key_btn_5: string = "choregraphy_5";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private bluetoothSerial: BluetoothSerial,
    private bluetoothSerial2: BluetoothSerial,
    private alertCtrl: AlertController
  ) {

      bluetoothSerial.enable();
      //bluetoothSerial2.enable();
  }

  keyBtn0() {

    this.bluetoothSerial.isConnected().then(succes => {
      this.bluetoothSerial.write(this.key_btn_0).then((success) => {
        let alert = this.alertCtrl.create({
          title: 'Choreography 0 has started',
          buttons: ['OK']
        });
        alert.present();
        //alert(success);
      }, error => {
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Please start again',
          buttons: ['OK']
        });
        alert.present();
        //alert(error);
      });

    }, error => {


    });
  }

  keyBtn1() {
    this.bluetoothSerial.write(this.key_btn_1).then((success) => {
      let alert = this.alertCtrl.create({
        title: 'Choreography 1 has started',
        buttons: ['OK']
      });
      alert.present();
      //alert(success);
    }, error => {
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'Please start again',
        buttons: ['OK']
      });
      alert.present();
      //alert(error);
    });
  }

  keyBtn2() {
    this.bluetoothSerial.write(this.key_btn_2).then((success) => {
      let alert = this.alertCtrl.create({
        title: 'Choreography 2 has started',
        buttons: ['OK']
      });
      alert.present();
      //alert(success);
    }, error => {
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Please start again',
          buttons: ['OK']
        });
        alert.present();
        //alert(error);
    });
  }

  keyBtn3() {
    this.bluetoothSerial.write(this.key_btn_3).then((success) => {
      let alert = this.alertCtrl.create({
        title: 'Choreography 3 has started',
        buttons: ['OK']
      });
      alert.present();
      //alert(success);
    }, error => {
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Please start again',
          buttons: ['OK']
        });
        alert.present();
        //alert(error);
    });
  }

  keyBtn4() {
    this.bluetoothSerial.write(this.key_btn_4).then((success) => {
      let alert = this.alertCtrl.create({
        title: 'Choreography 4 has started',
        buttons: ['OK']
      });
      alert.present();
      //alert(success);
    }, error => {
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Please start again',
          buttons: ['OK']
        });
        alert.present();
        //alert(error);
    });
  }

  keyBtn5() {
    this.bluetoothSerial.write(this.key_btn_5).then((success) => {
      let alert = this.alertCtrl.create({
        title: 'Choreography 5 has started',
        buttons: ['OK']
      });
      alert.present();
      //alert(success);
    }, error => {
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Please start again',
          buttons: ['OK']
        });
        alert.present();
        //alert(error);
    });
  }

}
