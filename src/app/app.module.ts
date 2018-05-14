import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { ToastyModule } from 'ng2-toasty';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PessoaService } from './pessoas/pessoa.service';
import { LancamentoService } from './lancamentos/lancamento.service';
import { CoreModule } from './core/core.module';
import { MessageComponent } from './message/message.component';
import { PessoasModule } from './pessoas/pessoas.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    PessoasModule,
    LancamentosModule,
    CoreModule,
    HttpModule,

    ToastyModule.forRoot(),

    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [LancamentoService, PessoaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
