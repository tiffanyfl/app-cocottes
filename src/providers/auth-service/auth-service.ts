import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

//let apiURL='http://localhost:3000/';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  constructor(public http: HttpClient) {}

  //test with add a movement
  postData(name): Observable<any> {
    const body = new HttpParams()
      .set('name', name);

    return this.http.post('http://localhost:3000/movements/create',
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }
    );
  }

  //LOGIN

  //postData(credentials,type) {
  //     return new Promise((resolve, reject) => {
  //       let headers = new HttpHeaders();
  //       headers.append("Content-Type","application/x-www-form-urlencoded");
  //
  //       this.http.post("http://localhost:3000/"+type,JSON.stringify(credentials), {headers:headers})
  //       .subscribe(data => {
  //         resolve(data);
  //       }, (err) => {
  //         reject(err);
  //       });
  //     });
  // }

  // postData(email, passwordConf): Observable<any> {
  //   const body = new HttpParams()
  //     .set('email', email)
  //     .set('passwordConf', passwordConf);
  //
  //   return this.http.post('http://localhost:3000/login',
  //     body.toString(),
  //     {
  //       headers: new HttpHeaders()
  //         .set('Content-Type', 'application/x-www-form-urlencoded')
  //     }
  //   );
  // }

}
