import { PessoaFiltro, PessoaService } from './../pessoa.service';
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';

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

  constructor(private pessoaService: PessoaService) { }

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
    this.pessoaService.listarTodas()
      .then(pessoas => pessoas);
  }

  aoMudarPagina(event: LazyLoadEvent){
    this.pagina = event.first / event.rows;
    
    this.pesquisar();
  }

}
