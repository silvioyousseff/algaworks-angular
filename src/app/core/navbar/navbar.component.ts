import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

import { ErrorHandlerService } from './../error-handler.service';
import { LogoutService } from './../../seguranca/logout.service';
import { AuthService } from './../../seguranca/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  exibindoMenu: boolean;

  constructor(
    private authService: AuthService,
    private logoutService: LogoutService,
    private errorHandlerService: ErrorHandlerService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logout() {
    this.logoutService.logout()
      .then(() => {
        this.hidenMenu();
        this.router.navigate(['/login']);
      })
      .catch(error => this.errorHandlerService.handle(error))
  }

  hidenMenu() {
    this.exibindoMenu = false;
  }
}
