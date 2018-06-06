import { Component, OnInit } from '@angular/core';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriasService } from './../../categorias/categorias.service';

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

  pessoas = [
    { label: 'João da Silva', value: 4 },
    { label: 'Sebastião Souza', value: 9 },
    { label: 'Maria Abadia', value: 3 },
  ];

  constructor(
    private categoriaService: CategoriasService,
    private errorHandlerService: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.listarCategorias();
  }

  listarCategorias(){
    return this.categoriaService.listarTodas()
      .then(categorias => {
        this.categorias = categorias.map(c => {
          return { label: c.nome, value: c.id }
        });
      })
      .catch(error => this.errorHandlerService.handle(error));
  }

}
