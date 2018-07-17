import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the LoginPage page.
 *

 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  usercreds = {
    email: '',
    password: ''
  }

  constructor(
    public navCtrl: NavController,
    public authServiceProvider: AuthServiceProvider,
    public alertCtrl: AlertController
  ) {}

  //connect to the application
  login(usercreds) {
    this.authServiceProvider.login(this.usercreds).then(data => {
      if(data){
        this.navCtrl.setRoot(HomePage);
      }
    }, (err) => {
      let alert = this.alertCtrl.create({
        title: "Failed connection !",
        subTitle: "Please start again",
        buttons: ['OK']
      });
      alert.present();
    });
  }

}
