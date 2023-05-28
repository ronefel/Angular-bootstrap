import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorage } from 'src/app/utils/localstorage';

@Component({
  selector: 'app-menu-login',
  templateUrl: './menu-login.component.html',
  styleUrls: ['./menu-login.component.css'],
})
export class MenuLoginComponent {
  token!: string | null;
  user: any;
  email = '';
  locaStorage = new LocalStorage();

  constructor(private router: Router) {}

  usuarioLogado(): boolean {
    this.token = this.locaStorage.obterTokenUsuario();
    this.user = this.locaStorage.obterUsuario();

    if (this.user) {
      this.email = this.user.email;
    }
    return this.token !== null;
  }

  logout() {
    this.locaStorage.limparDadosLocaisUsuario();
    this.router.navigate(['/home']);
  }
}
