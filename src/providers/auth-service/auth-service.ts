//import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/toPromise';

//let apiURL = 'http://localhost:3000/';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  constructor(public http: HttpClient) {
    //console.log('Hello AuthServiceProvider Provider');
  }

  // postData(credentials,type) {
  //   return new Promise((resolve, reject) => {
  //     let headers = new HttpHeaders();
  //     headers.append('Content-Type', 'application/x-www-form-urlencoded');
  //
  //     this.http.post(apiURL+type, JSON.stringify(credentials), {headers: headers})
  //       .subscribe(res => {
  //         resolve(res);
  //       }, (err) => {
  //         reject(err);
  //       });
  //
  //   });
  // }

}
