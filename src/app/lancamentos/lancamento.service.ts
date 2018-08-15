import { URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';

import { Lancamento } from './../core/model';
import { AuthHttp } from '../../../node_modules/angular2-jwt';

export class LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class LancamentoService {

  lancamentosUrl: string = "http://localhost:8080/lancamentos";

  constructor(private http: AuthHttp) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    const params = new URLSearchParams();

    params.set("page", filtro.pagina.toString());
    params.set("size", filtro.itensPorPagina.toString());

    if (filtro.descricao) {
      params.set("descricao", filtro.descricao);
    }

    if (filtro.dataVencimentoInicio) {
      params.set("dataInicio", moment(filtro.dataVencimentoInicio).format("YYYY-MM-DD"));
    }

    if (filtro.dataVencimentoFim) {
      params.set("dataFim", moment(filtro.dataVencimentoFim).format("YYYY-MM-DD"));
    }

    return this.http.get(`${this.lancamentosUrl}?resumo&`, { search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const lancamentos = responseJson.content;

        const resultado = {
          lancamentos: lancamentos,
          totalRegistros: responseJson.totalElements
        }

        return resultado;
      })
  }

  excluir(id: number): Promise<void> {
    return this.http.delete(`${this.lancamentosUrl}/${id}`)
      .toPromise()
      .then(() => null);
  }

  salvarLancamento(lancamento: Lancamento): Promise<Lancamento> {
    return this.http.post(this.lancamentosUrl, JSON.stringify(lancamento))
      .toPromise()
      .then(response => response.json());
  }

  atualizarLancamento(lancamento: Lancamento): Promise<Lancamento> {
    return this.http.put(`${this.lancamentosUrl}/${lancamento.id}`,
      JSON.stringify(lancamento))
      .toPromise()
      .then(response => {
        const lancamentoAlterado = response.json() as Lancamento;

        this.converterStringsParaDatas([lancamentoAlterado]);

        return lancamentoAlterado;
      });
  }

  getById(id: number): Promise<Lancamento> {
    return this.http.get(`${this.lancamentosUrl}/${id}`)
      .toPromise()
      .then(response => {
        const lancamento = response.json() as Lancamento;

        this.converterStringsParaDatas([lancamento]);

        return lancamento;
      });
  }

  private converterStringsParaDatas(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      lancamento.dataVencimento = moment(lancamento.dataVencimento,
        'YYYY-MM-DD').toDate();

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(lancamento.dataPagamento,
          'YYYY-MM-DD').toDate();
      }
    }
  }
}
