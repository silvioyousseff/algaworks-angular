import { FormControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-message-minimo-caracteres',
  template: `
    <div *ngIf="hasError()" class="ui-message ui-messages-error">
      Minimo de {{controler.errors?.minlength?.requiredLength}} caracteres
    </div>
  `,
  styles: [`
    .ui-messages-error {
      margin: 0;
      margin-top: 4px;
    }
  `]
})
export class MessageMinimoCaracteresComponent {

  @Input() controler: FormControl;

  hasError(): boolean{
    return this.controler.hasError('minlength') && this.controler.dirty;
  }

}
