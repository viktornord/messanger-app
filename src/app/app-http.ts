import {Observable} from 'rxjs/observable';
import {Http, XHRBackend, RequestOptions, RequestOptionsArgs, Request, Response, Headers} from '@angular/http';

export class AppHttp extends Http {
  token: string;
  constructor (_backend: XHRBackend, _defaultOptions: RequestOptions) {
    super(_backend, _defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    this.setAuthorizationHeader();
    return super.request(url, options);
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    this.setAuthorizationHeader();
    return super.get(url, options);
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    this.setAuthorizationHeader();
    return super.post(url, body, options);
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    this.setAuthorizationHeader();
    return super.put(url, body, options);
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    this.setAuthorizationHeader();
    return super.delete(url, options);
  }

  patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    this.setAuthorizationHeader();
    return super.patch(url, options);
  }

  head(url: string, options?: RequestOptionsArgs): Observable<Response> {
    this.setAuthorizationHeader();
    return super.head(url, options);
  }

  options(url: string, options?: RequestOptionsArgs): Observable<Response> {
    this.setAuthorizationHeader();
    return super.options(url, options);
  }

  private getToken(): string {
    return this.token || (this.token  = localStorage.getItem('messengerToken'));
  }

  private setAuthorizationHeader(headers: Headers = this._defaultOptions.headers) {
    headers.append('Authorization', `Bearer ${this.getToken()}`);
  }
}
