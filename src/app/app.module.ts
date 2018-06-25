import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';

import { PessoasCadastroComponent } from './pessoas/pessoas-cadastro/pessoas-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas/pessoas-pesquisa/pessoas-pesquisa.component';
import { LancamentosCadastroComponent } from './lancamentos/lancamentos-cadastro/lancamentos-cadastro.component';
import { LancamentosPesquisaComponent } from './lancamentos/lancamentos-pesquisa/lancamentos-pesquisa.component';

const routes: Routes = [
  { path: 'lancamentos', component: LancamentosPesquisaComponent},
  { path: 'lancamentos/novo', component: LancamentosCadastroComponent},
  { path: 'pessoas', component: PessoasPesquisaComponent},
  { path: 'pessoas/novo', component: PessoasCadastroComponent}
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    PessoasModule,
    LancamentosModule,
    CoreModule,
    HttpModule,
    RouterModule.forRoot(routes),

    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
