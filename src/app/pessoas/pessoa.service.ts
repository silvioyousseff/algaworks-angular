import { URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import { Pessoa } from './../core/model';

import 'rxjs/add/operator/toPromise';
import { AuthHttp } from '../../../node_modules/angular2-jwt';

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class PessoaService {

  pessoasUrl: string = "http://localhost:8080/pessoas";

  constructor(private http: AuthHttp) { }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    const params = new URLSearchParams();

    params.set("page", filtro.pagina.toString());
    params.set("size", filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params.set("nome", filtro.nome);
    }

    return this.http.get(`${this.pessoasUrl}`, { search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const pessoas = responseJson.content;

        const resultado = {
          pessoas: pessoas,
          totalRegistros: responseJson.totalElements
        }

        return resultado;
      })
  }

  listarTodas(): Promise<any> {
    return this.http.get(`${this.pessoasUrl}`)
      .toPromise()
      .then(response => response.json().content)
  }

  excluir(id: number): Promise<void> {
    return this.http.delete(`${this.pessoasUrl}/${id}`)
      .toPromise()
      .then(() => null);
  }

  alterarStatusPessoa(id: number, ativo: boolean): Promise<void> {
    return this.http.put(`${this.pessoasUrl}/${id}/ativo`, ativo)
      .toPromise()
      .then(() => null);
  }

  salvarPessoa(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.post(this.pessoasUrl, JSON.stringify(pessoa))
      .toPromise()
      .then(response => response.json());
  }

  atualizarPessoa(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.put(`${this.pessoasUrl}/${pessoa.id}`,
      JSON.stringify(pessoa))
      .toPromise()
      .then(response => {
        const pessoaAlterado = response.json() as Pessoa;

        return pessoaAlterado;
      });
  }

  getById(id: number): Promise<Pessoa> {
    return this.http.get(`${this.pessoasUrl}/${id}`)
      .toPromise()
      .then(response => {
        const pessoa = response.json() as Pessoa;

        return pessoa;
      });
  }
}
