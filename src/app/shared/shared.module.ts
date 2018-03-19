import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageMinimoCaracteresComponent } from './message-minimo-caracteres/message-minimo-caracteres.component';
import { MessageRequiredComponent } from './message-required/message-required.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MessageMinimoCaracteresComponent,
    MessageRequiredComponent
  ],
  exports: [
    MessageMinimoCaracteresComponent,
    MessageRequiredComponent
  ]
})
export class SharedModule { }
