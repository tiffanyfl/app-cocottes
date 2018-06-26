import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class AuthServiceProvider {

  isLoggedin = false;
  //apiURL = 'http://localhost:3000';
  apiURL = 'http://10.40.74.17:3000';
  authToken = null;
  userDetails: any;

  constructor(public http: HttpClient) {}

    storeUserData(token) {
        window.localStorage.setItem('userData', token);
        this.useData(token);
    }

    useData(token) {
      this.isLoggedin = true;
      this.authToken = token;
    }

    loadUserData() {
      let token = window.localStorage.getItem('userData');
      this.useData(token);
    }

    //connect to the application
    login(user) {
      return new Promise((resolve,reject) => {
        let headers = new HttpHeaders();
        let creds = {'email': user.email, 'password': user.password};
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

         this.http.post(this.apiURL+'/login', creds, {headers: headers}).subscribe(data => {
           this.userDetails = data;
             if(this.userDetails.success == true) {
               this.storeUserData(this.userDetails.token);
               resolve(true);
             }
         }, (err) => {
           reject(err);
         });
       });
   }

  logout() {
    this.isLoggedin = false;
    this.authToken = null;
    window.localStorage.clear();
  }

}
