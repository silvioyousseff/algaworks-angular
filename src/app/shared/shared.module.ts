import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageComponent } from './message/message.component';
import { MessageMinimoCaracteresComponent } from './message-minimo-caracteres/message-minimo-caracteres.component';
import { MessageRequiredComponent } from './message-required/message-required.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MessageMinimoCaracteresComponent,
    MessageRequiredComponent,
    MessageComponent
  ],
  exports: [
    MessageMinimoCaracteresComponent,
    MessageRequiredComponent,
    MessageComponent
  ]
})
export class SharedModule { }
