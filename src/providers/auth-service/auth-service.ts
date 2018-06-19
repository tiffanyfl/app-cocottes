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

  constructor(public http: HttpClient) {
  }

  login(user) {

    return new Promise(resolve => {

        let headers = new HttpHeaders();
        let creds = "email=" + user.email + "&password=" + user.password;
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        this.http.post("http://localhost:3000/login",creds, {headers: headers}).subscribe(data => {

            if(data){
              window.localStorage.setItem('raja', data.toString());
              this.isLoggedin = true;
            }
            resolve(this.isLoggedin);

        });

        });

    }

    logout() {
      this.isLoggedin = false;
      window.localStorage.clear();
    }

}
