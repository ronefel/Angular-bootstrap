import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { environment } from './../../environments/environment';
import { LocalStorage } from './../utils/localstorage';

export abstract class BaseService {
  public LocalStorage = new LocalStorage();
  protected UrlServiceV1 = environment.apiUrl;

  protected ObterHeaderJson() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  protected extractData(response: any) {
    return response.data || {};
  }

  protected serviceError(response: Response | any) {
    const customError: string[] = [];

    if (response instanceof HttpErrorResponse) {
      if (response.statusText === 'Unknown Error') {
        customError.push('Ocorreu um erro desconhecido');
        response.error.errors = customError;
      }
    }

    console.log(response);
    return throwError(() => response);
  }
}
