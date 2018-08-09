import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { ToastyService } from 'ng2-toasty';
import { PessoaService } from './../pessoa.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { Pessoa } from '../../core/model';
import { Endereco } from './../../core/model';

@Component({
  selector: 'app-pessoas-cadastro',
  templateUrl: './pessoas-cadastro.component.html',
  styleUrls: ['./pessoas-cadastro.component.css']
})
export class PessoasCadastroComponent implements OnInit {

  pessoa = new Pessoa();

  constructor(
    private errorHandlerService: ErrorHandlerService,
    private pessoaService: PessoaService,
    private toastService: ToastyService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Cadastro de Pessoas');
  }

  salvarPessoa(form: FormControl){
    this.pessoaService.salvarPessoa(this.pessoa)
      .then(() => {
        this.toastService.success("Pessoa salva com sucesso!");

        form.reset();
        this.pessoa = new Pessoa();
      })
      .catch(error => this.errorHandlerService.handle(error));
  }

  atualizarTituloEdicao(){
    this.title.setTitle(`Edição Lançamento: ${this.pessoa.nome}`);
  }
}
