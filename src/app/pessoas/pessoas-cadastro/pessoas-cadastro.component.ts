import { ActivatedRoute, Router } from '@angular/router';
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
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Cadastro de Pessoas');

    const idPessoa = this.activatedRoute.snapshot.params['id'];

    if (idPessoa) {
      this.getById(idPessoa);
    }
  }

  getById(id: number) {
    this.pessoaService.getById(id)
      .then(pessoa => {
        this.pessoa = pessoa;
        this.atualizarTituloEdicao();
      })
      .catch(error => this.errorHandlerService.handle(error))
  }

  salvarPessoa(form: FormControl) {
    if (this.editando) {
      this.atualizarPessoa(form);
    } else {
      this.cadastrarPessoa(form);
    }
  }

  cadastrarPessoa(form: FormControl) {
    this.pessoaService.salvarPessoa(this.pessoa)
      .then(() => {
        this.toastService.success("Pessoa salva com sucesso!");

        form.reset();
        this.pessoa = new Pessoa();
      })
      .catch(error => this.errorHandlerService.handle(error));
  }

  atualizarPessoa(form: FormControl) {
    this.pessoaService.atualizarPessoa(this.pessoa)
      .then(pessoa => {
        this.toastService.success("Pessoa atualizada com sucesso!");

        this.pessoa = pessoa;

        this.atualizarTituloEdicao();
      })
      .catch(error => this.errorHandlerService.handle(error));
  }

  novaPessoa(form: FormControl) {
    form.reset();

    setTimeout(function () {
      this.pessoa = new Pessoa();
    }.bind(this), 1);

    this.router.navigate(['/pessoas/novo']);
  }

  get editando() {
    return Boolean(this.pessoa.id);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição Lançamento: ${this.pessoa.nome}`);
  }
}
