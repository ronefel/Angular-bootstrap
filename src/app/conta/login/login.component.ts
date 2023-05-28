import { Component, ElementRef, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { fromEvent, merge, Observable } from 'rxjs';
import { DisplayMessage, GenericValidator, ValidationMessages } from './../../utils/generic-form-validation';
import { Usuario } from './../models/usuario';
import { ContaService } from './../services/conta.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements!: ElementRef[];

  loginForm!: FormGroup;
  usuario!: Usuario;

  errors: string[] = [];
  validationMessages!: ValidationMessages;
  genericValidator!: GenericValidator;
  displayMessage: DisplayMessage = {};

  constructor(
    private fb: FormBuilder,
    private contaService: ContaService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.validationMessages = {
      email: {
        required: 'Informe o e-mail',
      },
      password: {
        required: 'Informe a senha',
      },
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  ngAfterViewInit(): void {
    const controlBlurs: Observable<any>[] = this.formInputElements.map((FormControl: ElementRef) =>
      fromEvent(FormControl.nativeElement, 'blur')
    );

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processarMensagens(this.loginForm);
    });
  }

  login() {
    if (this.loginForm.dirty && this.loginForm.valid) {
      this.usuario = Object.assign({}, this.usuario, this.loginForm.value);

      this.contaService.login(this.usuario).subscribe(
        sucesso => {
          this.processarSucesso(sucesso);
        },
        falha => {
          this.processarFalha(falha);
        }
      );
    }
  }

  processarSucesso(response: any) {
    this.loginForm.reset();
    this.errors = [];

    this.contaService.LocalStorage.salvarDadosLocaisUsuario(response);

    this.router.navigate(['/home']);
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }
}
