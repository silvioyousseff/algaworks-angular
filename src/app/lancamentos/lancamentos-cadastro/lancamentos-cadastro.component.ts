import { Title } from '@angular/platform-browser';
import { Lancamento } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriasService } from './../../categorias/categorias.service';
import { PessoaService } from './../../pessoas/pessoa.service';
import { LancamentoService } from './../lancamento.service';

@Component({
  selector: 'app-lancamentos-cadastro',
  templateUrl: './lancamentos-cadastro.component.html',
  styleUrls: ['./lancamentos-cadastro.component.css']
})
export class LancamentosCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];

  categorias = [];
  pessoas = [];
  lancamento = new Lancamento();

  constructor(
    private categoriaService: CategoriasService,
    private errorHandlerService: ErrorHandlerService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private toastService: ToastyService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Cadastro de Lançamentos');

    const idLancamento = this.activatedRoute.snapshot.params['id'];

    if (idLancamento) {
      this.getById(idLancamento);
    }

    this.listarCategorias();
    this.listarPessoas();
  }

  getById(id: number) {
    this.lancamentoService.getById(id)
      .then(lancamento => {
        this.lancamento = lancamento;
        this.atualizarTituloEdicao();
      })
      .catch(error => this.errorHandlerService.handle(error))
  }

  salvarLancamento(form: FormControl) {
    if (this.editando) {
      this.atualizarLancamento(form);
    } else {
      this.cadastrarLancamento(form);
    }
  }

  cadastrarLancamento(form: FormControl) {
    this.lancamentoService.salvarLancamento(this.lancamento)
      .then(lancamentoSalvo => {
        this.toastService.success("Lançamento salvo com sucesso!");

        this.router.navigate(['/lancamentos', lancamentoSalvo.id]);
      })
      .catch(error => this.errorHandlerService.handle(error));
  }

  atualizarLancamento(form: FormControl) {
    this.lancamentoService.atualizarLancamento(this.lancamento)
      .then(lancamento => {
        this.toastService.success("Lançamento atualizado com sucesso!");

        this.lancamento = lancamento;

        this.atualizarTituloEdicao();
      })
      .catch(error => this.errorHandlerService.handle(error));
  }

  listarPessoas() {
    return this.pessoaService.listarTodas()
      .then(pessoas => {
        this.pessoas = pessoas.map(c => {
          return { label: c.nome, value: c.id }
        });
      })
      .catch(error => this.errorHandlerService.handle(error));
  }

  listarCategorias() {
    return this.categoriaService.listarTodas()
      .then(categorias => {
        this.categorias = categorias.map(c => {
          return { label: c.nome, value: c.id }
        });
      })
      .catch(error => this.errorHandlerService.handle(error));
  }

  novoLancamento(form: FormControl) {
    form.reset();

    setTimeout(function () {
      this.lancamento = new Lancamento();
    }.bind(this), 1);

    this.router.navigate(['/lancamentos/novo']);
  }

  get editando() {
    return Boolean(this.lancamento.id);
  }

  atualizarTituloEdicao(){
    this.title.setTitle(`Edição Lançamento: ${this.lancamento.descricao}`);
  }
}
