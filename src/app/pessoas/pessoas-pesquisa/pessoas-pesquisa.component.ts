import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { ToastyService } from 'ng2-toasty';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';

import { AuthService } from './../../seguranca/auth.service';
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
    private errorHandlerService: ErrorHandlerService,
    public authService: AuthService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de Pessoas');

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

  alterarStatusPessoa(Pessoa: any){
    const status = !Pessoa.ativo;

    this.pessoaService.alterarStatusPessoa(Pessoa.id, status)
      .then(() => {
        const acao = status ? 'ativada' : 'desativada';

        Pessoa.ativo = status;
        this.toastyService.success(`Pessoa ${acao} com sucesso!`);
      })
      .catch(error => this.errorHandlerService.handle(error));
  }
}
