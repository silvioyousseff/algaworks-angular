import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { ToastyService } from 'ng2-toasty';

import { FalhaAutenticacaoError } from './../seguranca/wrapper-auth-http';

@Injectable()
export class ErrorHandlerService {

  constructor(
    private toastyService: ToastyService,
    private router: Router
  ) { }

  handle(error: any) {
    let msg: string;

    if (typeof error === "string") {
      msg = error;

    } else if (error instanceof FalhaAutenticacaoError) {
      msg = 'Sua sessão expirou!';
      this.router.navigate(['/login']);

    } else if (error instanceof Response && error.status >= 400 && error.status <= 499) {
      let errors;
      msg = 'Ocorreu um erro ao processar a sua solicitação';

      if (error.status === 403) {
        msg = 'Usuário sem permissão para processar a solicitação';
      }

      try {
        errors = error.json();

        msg = errors[0].erroUsuario;
      } catch (e) { }

      console.error('Ocorreu um erro 400 ', error);

    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente.';
      console.error('Ocorreu um erro', error);
    }

    this.toastyService.error(msg);
  }
}
