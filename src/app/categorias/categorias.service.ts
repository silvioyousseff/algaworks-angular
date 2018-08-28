import { Injectable } from '@angular/core';

import { environment } from './../../environments/environment';
import 'rxjs/add/operator/toPromise';
import { AuthHttp } from '../../../node_modules/angular2-jwt';

@Injectable()
export class CategoriasService {

  categoriasUrl : string;

  constructor(private http: AuthHttp) {
    this.categoriasUrl = `${environment.apiUrl}/categorias`;
  }

  listarTodas(): Promise<any> {
    return this.http.get(this.categoriasUrl)
      .toPromise()
      .then(response => response.json());
  }
}
