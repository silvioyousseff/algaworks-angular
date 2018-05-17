import { Injectable } from '@angular/core';

import { ToastyService } from 'ng2-toasty';

@Injectable()
export class ErrorHandlerService {

  constructor(private toastyService: ToastyService) { }

  handle(error: any){
    let msg: string;

    if(typeof error === "string"){
      msg = error;
    } else {
      msg = "Erro ao processar serviço remoto, tente novamente";
      console.log("Ocorreu um erro:", error);
    }

    this.toastyService.error(msg);
  }
}
