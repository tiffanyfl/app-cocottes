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
  apiURL = 'http://localhost:3000';
  authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjJhNDM3ODJiMmI4ZjU3YjQ1NjVkZjUiLCJlbWFpbCI6InRlc3Q5QHRlc3QuY29tIiwiZXhwIjoxNTMwMTg4NzMyLCJpYXQiOjE1Mjk1ODM5MzJ9.w2dHxA8OhKaqZ5H0-e97ZYxDMVM6M0b7tr9o7HAtR8k';

  constructor(public http: HttpClient) {}

    //connect to the application
    login(user) {
      return new Promise((resolve,reject) => {
        let headers = new HttpHeaders();
        let creds = {'email': user.email, 'password': user.password};
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

         this.http.post(this.apiURL+'/login', creds, {headers: headers}).subscribe(data => {
             if(data){
               window.localStorage.setItem('userData', data.toString());
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
