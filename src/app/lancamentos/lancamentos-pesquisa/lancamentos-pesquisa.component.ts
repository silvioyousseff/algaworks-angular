import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';

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

  constructor(private lancamentoService: LancamentoService) { }

  ngOnInit() { }

  pesquisar(){
    this.filtro.pagina = this.pagina;

    this.lancamentoService.pesquisar(this.filtro)
      .then(lancamentos => {
        this.lancamentos = lancamentos.lancamentos;
        this.totalRegistros = lancamentos.totalRegistros;
      });
  }

  aoMudarPagina(event: LazyLoadEvent){
    this.pagina = event.first / event.rows;
    
    this.pesquisar();
  }

  excluir(Lancamento: any){
    this.lancamentoService.excluir(Lancamento.id)
      .then(() => {
        this.tabelaLancamentos.first = 0;
      });
}

  }