import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

import { JwtHelper } from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

  tokenUrl: string = "http://localhost:8080/oauth/token";
  jwtPayload: any;

  constructor(
    private http: Http,
    private jwtHelper: JwtHelper
  ) { 
    this.recuperarToken();
  }

  login(usuario: string, senha: string): Promise<void>{
    const headers = new Headers;
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    headers.append("Authorization", "Basic YW5ndWxhcjphbmd1bGFy");

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post(this.tokenUrl, body, {headers})
      .toPromise()
      .then(response =>{
        this.armazenarToken(response.json().access_token);
        console.log(this.jwtPayload);
      })
      .catch(response =>{
        console.log("catch auth" + response);
      });
  }

  armazenarToken(token: string){
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem("token", token);
  }

  recuperarToken(){
    const token = localStorage.getItem("token");

    if(token){
      this.armazenarToken(token);
    }
  }
}
