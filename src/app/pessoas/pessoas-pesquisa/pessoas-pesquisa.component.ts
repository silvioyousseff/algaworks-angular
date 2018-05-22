import { Component, OnInit, ViewChild } from '@angular/core';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { ToastyService } from 'ng2-toasty';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';

import { PessoaFiltro, PessoaService } from './../pessoa.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  totalRegistros = 0;
  pagina = 0;
  pessoas = [];
  filtro = new PessoaFiltro();
  @ViewChild('tabelaPessoas') tabelaPessoas;

  constructor(
    private pessoaService: PessoaService,
    private toastyService: ToastyService,
    private confirmation: ConfirmationService,
    private errorHandlerService: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.listarTodas();
  }

  pesquisar(){
    this.filtro.pagina = this.pagina;

    this.pessoaService.pesquisar(this.filtro)
      .then(pessoas => {
        this.pessoas = pessoas.pessoas;
        this.totalRegistros = pessoas.totalRegistros;
      });
  }

  listarTodas(){
    console.log("listando todas");
    this.pessoaService.listarTodas()
      .then(pessoas => pessoas);
  }

  aoMudarPagina(event: LazyLoadEvent){
    this.pagina = event.first / event.rows;
    
    this.pesquisar();
  }

  confirmarExclusao(Pessoa: any) {
    this.confirmation.confirm({
      message: "Deseja excluir?",
      accept: () => {
        this.excluir(Pessoa);
      }
    });
  }

  excluir(Pessoa: any) {
    this.pessoaService.excluir(Pessoa.id)
      .then(() => {

        if (this.tabelaPessoas.first === 0) {
          this.pesquisar();

        } else {
          this.tabelaPessoas.first = 0;
        }

        this.toastyService.success("Pessoa excluído com sucesso!");
      })
      .catch(error => this.errorHandlerService.handle(error));
  }

}
