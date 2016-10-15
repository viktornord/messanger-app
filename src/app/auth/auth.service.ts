import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class AuthService {
  token: string;

  constructor(private http: Http) {
    const savedToken = localStorage.getItem('messengerToken');
    savedToken && (this.token = savedToken);
  }

  saveToken(token) {
    this.token = token;
    localStorage.setItem('messengerToken', token);
  }

  getToken() {
    return this.token;
  }

  login(userData) {

    return this.http.post(`http://127.0.0.1:3000/auth/login`, userData);
  }

  register(userData) {

    return this.http.post(`http://127.0.0.1:3000/auth/register`, userData);
  }

}
