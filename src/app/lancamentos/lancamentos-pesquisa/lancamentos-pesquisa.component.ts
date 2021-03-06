import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';

import { AuthService } from './../../seguranca/auth.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { LancamentoService, LancamentoFiltro } from './../lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  pagina = 0;
  filtro = new LancamentoFiltro();
  lancamentos = [];
  @ViewChild('tabelaLancamentos') tabelaLancamentos;

  constructor(
    private lancamentoService: LancamentoService,
    private toastyService: ToastyService,
    private confirmation: ConfirmationService,
    private errorHandlerService: ErrorHandlerService,
    private title: Title,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de Lançamentos');
   }

  pesquisar() {
    this.filtro.pagina = this.pagina;

    this.lancamentoService.pesquisar(this.filtro)
      .then(lancamentos => {
        this.lancamentos = lancamentos.lancamentos;
        this.totalRegistros = lancamentos.totalRegistros;
      })
      .catch(error => this.errorHandlerService.handle(error));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    this.pagina = event.first / event.rows;

    this.pesquisar();
  }

  confirmarExclusao(Lancamento: any) {
    this.confirmation.confirm({
      message: "Deseja excluir?",
      accept: () => {
        this.excluir(Lancamento);
      }
    });
  }

  excluir(Lancamento: any) {
    this.lancamentoService.excluir(Lancamento.id)
      .then(() => {

        if (this.tabelaLancamentos.first === 0) {
          this.pesquisar();

        } else {
          this.tabelaLancamentos.first = 0;
        }

        this.toastyService.success("Lançamento excluído com sucesso!");
      })
      .catch(error => this.errorHandlerService.handle(error));
  }
}