import { inject } from '@angular/core';
import { CanActivateFn, CanDeactivateFn, Router } from '@angular/router';
import { LocalStorage } from 'src/app/utils/localstorage';
import { CadastroComponent } from '../cadastro/cadastro.component';

// proteje sair do formulario alterado sem salvar
export const canDeactivate: CanDeactivateFn<CadastroComponent> = component => {
  if (component.mudancasNaoSalvas) {
    return window.confirm('Tem certeza que deseja abandonar o preenchimento do formulario?');
  }
  return true;
};

// protege a rota
export const canActivate: CanActivateFn = () => {
  const router = inject(Router);
  const localStorage = new LocalStorage();

  if (localStorage.obterTokenUsuario()) {
    router.navigate(['/home']);
  }

  return true;
};
