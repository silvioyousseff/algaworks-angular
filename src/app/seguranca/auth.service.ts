import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

  tokenUrl: string = "http://localhost:8080/oauth/token";

  constructor(private http: Http) { }

  login(usuario: string, senha: string): Promise<void>{
    const headers = new Headers;
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    headers.append("Authorization", "Basic YW5ndWxhcjphbmd1bGFy");

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post(this.tokenUrl, body, {headers})
      .toPromise()
      .then(response =>{
        console.log(response);
      })
      .catch(response =>{
        console.log("catch " + response);
      });
  }

}
