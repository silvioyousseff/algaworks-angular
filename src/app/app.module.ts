import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { MessageMinimoCaracteresComponent } from './message-minimo-caracteres/message-minimo-caracteres.component';
import { MessageRequiredComponent } from './message-required/message-required.component';
import { MessageComponent } from './message/message.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PessoasModule } from './pessoas/pessoas.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MessageComponent,
    MessageRequiredComponent,
    MessageMinimoCaracteresComponent
  ],
  imports: [
    PessoasModule,
    LancamentosModule,

    FormsModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
