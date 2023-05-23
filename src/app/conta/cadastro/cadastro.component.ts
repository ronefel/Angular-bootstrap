import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DisplayMessage, GenericValidator, ValidationMessages } from './../../utils/generic-form-validation';
import { Usuario } from './../models/usuario';
import { ContaService } from './../services/conta.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
})
export class CadastroComponent implements OnInit, AfterViewInit {
  cadastroForm!: FormGroup;
  usuario!: Usuario;

  errors: string[] = [];
  validationMessages!: ValidationMessages;
  genericValidator!: GenericValidator;
  displayMessage!: DisplayMessage;

  constructor(private fb: FormBuilder, private contaService: ContaService) {
    this.validationMessages = {
      email: {
        required: 'Informe o e-mail',
        email: 'Email inválido',
      },
      password: {
        required: 'Informe a senha',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres',
      },
      confirmPassword: {
        equalTo: 'As senhas não conferem',
      },
    };
  }

  ngOnInit(): void {
    this.cadastroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      confirmPassword: [''],
    });
  }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  adicionarConta() {
    if (this.cadastroForm.dirty && this.cadastroForm.valid) {
      this.usuario = Object.assign({}, this.usuario, this.cadastroForm.value);

      this.contaService.registrarUsuario(this.usuario);
    }
  }
}
