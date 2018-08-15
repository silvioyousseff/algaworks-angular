import { Component, OnInit, Input } from '@angular/core';

import { AuthService } from './../../seguranca/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  exibindoMenu: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  hidenMenu(){
    this.exibindoMenu = false;
  }
}
