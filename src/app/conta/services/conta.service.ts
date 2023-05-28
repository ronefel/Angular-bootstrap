import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { BaseService } from 'src/app/services/base.service';
import { Usuario } from './../models/usuario';

@Injectable()
export class ContaService extends BaseService {
  constructor(private http: HttpClient) {
    super();

    console.log(this.UrlServiceV1);
  }

  registrarUsuario(usuario: Usuario) {
    const response = this.http
      .post(this.UrlServiceV1 + 'conta', usuario, this.ObterHeaderJson())
      .pipe(map(this.extractData), catchError(this.serviceError));

    return response;
  }

  login(usuario: Usuario) {
    const response = this.http
      .post(this.UrlServiceV1 + 'conta/login', usuario, this.ObterHeaderJson())
      .pipe(map(this.extractData), catchError(this.serviceError));

    return response;
  }
}
