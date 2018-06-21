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

  constructor(public http: HttpClient) {}

    //connect to the application
    login(user) {
      return new Promise((resolve,reject) => {
        let headers = new HttpHeaders();
        let creds = {'email': user.email, 'password': user.password};
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

         this.http.post("http://localhost:3000/login", creds, {headers: headers}).subscribe(data => {
             if(data){
               window.localStorage.setItem('chicken', data.toString());
               this.isLoggedin = true;
             }
             resolve(this.isLoggedin);
         }, (err) => {
           reject(err);
         });
       });
   }

    logout() {
      this.isLoggedin = false;
      window.localStorage.clear();
    }

}
