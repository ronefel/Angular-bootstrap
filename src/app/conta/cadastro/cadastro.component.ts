import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { fromEvent, merge, Observable } from 'rxjs';
import { CustomValidators } from '../../utils/custom-validators/custom-forms.module';
import { DisplayMessage, GenericValidator, ValidationMessages } from './../../utils/generic-form-validation';
import { Usuario } from './../models/usuario';
import { ContaService } from './../services/conta.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
})
export class CadastroComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements!: ElementRef[];

  cadastroForm!: FormGroup;
  usuario!: Usuario;

  errors: string[] = [];
  validationMessages!: ValidationMessages;
  genericValidator!: GenericValidator;
  displayMessage: DisplayMessage = {};

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
        required: 'Informe a senha novamente',
        equalTo: 'As senhas não conferem',
      },
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    const senha = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 15])]);
    const confirmaSenha = new FormControl('', [Validators.required, CustomValidators.equalTo(senha)]);

    this.cadastroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: senha,
      confirmPassword: confirmaSenha,
    });
  }
  ngAfterViewInit(): void {
    const controlBlurs: Observable<any>[] = this.formInputElements.map((FormControl: ElementRef) =>
      fromEvent(FormControl.nativeElement, 'blur')
    );

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processarMensagens(this.cadastroForm);
    });
  }

  adicionarConta() {
    if (this.cadastroForm.dirty && this.cadastroForm.valid) {
      this.usuario = Object.assign({}, this.usuario, this.cadastroForm.value);

      this.contaService.registrarUsuario(this.usuario).subscribe(
        sucesso => {
          this.processarSucesso(sucesso);
        },
        falha => {
          this.processarFalha(falha);
        }
      );
    }
  }

  processarSucesso(response: any) {}

  processarFalha(fail: any) {}
}
