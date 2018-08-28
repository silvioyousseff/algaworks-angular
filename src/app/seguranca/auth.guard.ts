import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.authService.isAccessTokenInvalido) {
      console.log('Navegação com access token inválido');
      
      return this.authService.obterNovoAccessToken()
        .then(() => {

          if (this.authService.isAccessTokenInvalido()) {
            console.log('isAccessTokenInvalido');
            this.router.navigate(['/login']);
            return false;
          }

          return true;
        }).catch(response => {
          console.error("Erro recuperar access_token", response);
          return false;
        });

    } else if (next.data.roles && this.authService.isUsuarioContemPermissao(next.data.roles)) {
      return true;
    }

    this.router.navigate(['/nao-autorizado']);
    return false;
  }
}
