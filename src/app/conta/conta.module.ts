import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CustomFormsModule } from '../utils/custom-validators/custom-forms.module';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ContaAppComponent } from './conta.app.component';
import { ContaRoutingModule } from './conta.route';
import { LoginComponent } from './login/login.component';
import { ContaService } from './services/conta.service';

@NgModule({
  declarations: [ContaAppComponent, CadastroComponent, LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    RouterModule,
    ContaRoutingModule,
    HttpClientModule,
  ],
  providers: [ContaService],
})
export class ContaModule {}
