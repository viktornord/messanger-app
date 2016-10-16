import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class AuthService {
  token: string;
  username: string;

  constructor(private http: Http) {
    const savedToken = localStorage.getItem('messengerToken');
    const username = localStorage.getItem('messengerUsername');
    savedToken && (this.token = savedToken);
    username && (this.username = username);
  }

  setUserName(username) {
    this.username = username;
    localStorage.setItem('messengerUsername', username);
  }

  getUserName() {
    return this.username;
  }

  saveToken(token) {
    this.token = token;
    localStorage.setItem('messengerToken', token);
  }

  getToken() {
    return this.token;
  }

  logout() {
    this.token = null;
    this.username = null;
    localStorage.removeItem('messengerToken');
    localStorage.removeItem('messengerUsername');
  }

  login(userData) {

    return this.http.post(`http://127.0.0.1:3000/auth/login`, userData);
  }

  register(userData) {

    return this.http.post(`http://127.0.0.1:3000/auth/register`, userData);
  }

}
