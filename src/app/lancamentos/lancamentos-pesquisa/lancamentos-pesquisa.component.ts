import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { ToastyService } from 'ng2-toasty';

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
    private confirmation: ConfirmationService
  ) { }

  ngOnInit() { }

  pesquisar() {
    this.filtro.pagina = this.pagina;

    this.lancamentoService.pesquisar(this.filtro)
      .then(lancamentos => {
        this.lancamentos = lancamentos.lancamentos;
        this.totalRegistros = lancamentos.totalRegistros;
      });
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
      });
  }
}