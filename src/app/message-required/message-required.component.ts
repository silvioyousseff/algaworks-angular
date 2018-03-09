import { FormControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-message-required',
  template: `
    <div *ngIf="hasError()" class="ui-message ui-messages-error">
      Campo obrigatório
    </div>
  `,
  styles: [`
    .ui-messages-error {
      margin: 0;
      margin-top: 4px;
    }
  `]
})
export class MessageRequiredComponent {

  @Input() controler: FormControl;

  hasError(): boolean{
    return this.controler.hasError('required') && this.controler.dirty;
  }
}
