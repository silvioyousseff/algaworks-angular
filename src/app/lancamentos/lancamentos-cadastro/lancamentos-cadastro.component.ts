import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriasService } from './../../categorias/categorias.service';
import { FormControl } from '@angular/forms';
import { PessoaService } from './../../pessoas/pessoa.service';
import { Lancamento } from '../../core/model';
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
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    const idLancamento = this.router.snapshot.params['id'];

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
      })
      .catch(error => this.errorHandlerService.handle(error))
  }

  salvarLancamento(form: FormControl) {
    this.lancamentoService.salvarLancamento(this.lancamento)
      .then(() => {
        this.toastService.success("Lançamento salvo com sucesso!");

        form.reset();
        this.lancamento = new Lancamento();
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

  get editando(){
    return Boolean(this.lancamento.id);
  }
}
