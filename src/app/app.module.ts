import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NavegacaoModule } from './navegacao/navegacao.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, NavegacaoModule, NgbModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
