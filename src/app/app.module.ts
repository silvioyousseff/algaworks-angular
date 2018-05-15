import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastyModule } from 'ng2-toasty';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';

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
    ConfirmDialogModule,

    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [LancamentoService, PessoaService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
