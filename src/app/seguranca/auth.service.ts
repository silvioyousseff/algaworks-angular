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
    this.recuperarTokenLocalStorage();
  }

  login(usuario: string, senha: string): Promise<void> {
    const headers = new Headers;
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    headers.append("Authorization", "Basic YW5ndWxhcjphbmd1bGFy");

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post(this.tokenUrl, body, { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        this.armazenarTokenLocalStorage(response.json().access_token);
      })
      .catch(response => {
        if (response.status === 400) {
          const responseJson = response.json();

          if (responseJson.error === "invalid_grant") {
            return Promise.reject("Login ou senha inválidos!");
          }
        }

        return Promise.reject(response);
      });
  }

  obterNovoAccessToken(): Promise<void> {
    const headers = new Headers;
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    headers.append("Authorization", "Basic YW5ndWxhcjphbmd1bGFy");

    const body = "grant_type=refresh_token";

    return this.http.post(this.tokenUrl, body, { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        this.armazenarTokenLocalStorage(response.json().access_token);
        return Promise.resolve(null);
      })
      .catch(response => {
        console.error("Erro recuperar access_token", response);
        return Promise.resolve(null);
      });
  }

  isAccessTokenInvalido() {
    const token = localStorage.getItem("token");

    return !token || this.jwtHelper.isTokenExpired(token);
  }

  armazenarTokenLocalStorage(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem("token", token);
  }

  recuperarTokenLocalStorage() {
    const token = localStorage.getItem("token");

    if (token) {
      this.armazenarTokenLocalStorage(token);
    }
  }

  removerTokenLocalStorage() {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  isUsuarioTemPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  isUsuarioContemPermissao(roles: any) {
    for (const role of roles) {
      if (this.isUsuarioTemPermissao(role)) {
        return true;
      }
    }

    return false;
  }
}
