import { Component } from '@angular/core';
//import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import 'rxjs/add/operator/toPromise';
//import { TabsPage } from '../tabs/tabs';
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

  //get info of user
  // @ViewChild('email') email;
  // @ViewChild('passwordConf') passwordConf;

  //auth
  responseData: any;
  //userData= {"email":"","passwordConf":""};
  userData={'name':''};


  constructor(
    public navCtrl: NavController,
    public authServiceProvider: AuthServiceProvider,
    public alertCtrl: AlertController,
  ) {
}

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad LoginPage');
  // }

  login(){
    this.authServiceProvider.postData(this.userData.name).subscribe((result) =>{
      console.log(this.userData.name);
    });

  //without API
  // if(this.email.value=="test@test.com" && this.passwordConf.value =="test"){
  //   let alert = this.alertCtrl.create({
  //     title: 'Connexion réussie !',
  //     subTitle: 'Tu es connecté',
  //     buttons: ['OK']
  //   });
  //   alert.present();
  //   console.log(this.email.value, this.passwordConf.value);
  //   this.navCtrl.push(TabsPage, {}, {animate: false});
  // }else{
  //   let alert = this.alertCtrl.create({
  //     title: 'Connexion échouée !',
  //     subTitle: 'Les informations sont incorrectes',
  //     buttons: ['OK']
  //   });
  //   alert.present();
  // }

  //this.authServiceProvider.postData(this.userData,"login").then((result) => {
  // this.authServiceProvider.postData(this.userData.email, this.userData.passwordConf).subscribe((result) => {
  //   this.responseData = result;
  //   console.log(this.responseData);
  //   if(this.responseData.userData.email && this.responseData.userData.passwordConf){
  //     //localStorage.setItem('userData', JSON.stringify(this.responseData));
  //     this.navCtrl.push(TabsPage);
  //   }
  //   else{ console.log("User already exists"); }
  // }, err => {
  //   console.log(err);
  // });


 }

}
