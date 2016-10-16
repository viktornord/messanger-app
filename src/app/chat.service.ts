import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {AuthService} from './auth/auth.service';

@Injectable()
export class ChatService {
  private socket;

  constructor(private authService: AuthService) { }

  connect(initConnectedUsersFunction) {
    this.socket = io('http://127.0.0.1:5000', {
      query: {
        username: this.authService.getUserName()
      }
    });
    this.socket.on('connected-clients', initConnectedUsersFunction);

    return this;
  }

  onUserConnected(listener) {
    this.socket.on('client-connected', listener);
    return this;
  }

  onUserDisconnected(listener) {
    this.socket.on('client-disconnected', listener);
    return this;
  }

  onReceiveMessage(subscription) {
    this.socket.on('receive-message', subscription);
    return this;
  }

  disconnect() {
    this.socket.disconnect();
    return this;
  }

  sendMessage(message) {
    this.socket.emit('send-message', message);
    return this;
  }

}
