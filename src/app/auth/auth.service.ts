import {environment} from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {ChatService} from '../chat.service';

@Injectable()
export class AuthService {
  token: string;
  private userData: {userId: number, username: string};

  constructor(private http: Http, private chatService: ChatService) {
    const savedToken = localStorage.getItem('messengerToken');
    const userData = JSON.parse(localStorage.getItem('messengerUser'));
    savedToken && (this.token = savedToken);
    userData && (this.userData = userData) && this.chatService.connect(userData);
  }

  saveUserData(userData) {
    this.userData = userData;
    localStorage.setItem('messengerUser', JSON.stringify(userData));
    this.chatService.userData = userData;
    this.chatService.connect(userData);
  }

  getUserData() {
    return this.userData;
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
    this.userData = null;
    localStorage.removeItem('messengerToken');
    localStorage.removeItem('messengerUser');
    this.chatService.disconnect();
  }

  login(userData) {

    return this.http.post(`${environment.host}/auth/login`, userData);
  }

  register(userData) {

    return this.http.post(`${environment.host}/auth/register`, userData);
  }

}
