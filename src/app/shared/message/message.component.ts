import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-message',
  template: `
    <div *ngIf="hasError()" class="ui-message ui-messages-error">
      {{ message }}
    </div>
  `,
  styles: [`
    .ui-messages-error {
      margin: 0;
      margin-top: 4px;
    }
  `]
})
export class MessageComponent{

  @Input() error: string;
  @Input() controler: FormControl;
  @Input() message: string;

  hasError(): boolean{
    return this.controler.hasError(this.error) && this.controler.dirty;
  }
}
