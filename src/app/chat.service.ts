import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as io from 'socket.io-client';

@Injectable()
export class ChatService {
  private socket;
  public userData;

  constructor(private router: Router) {
  }

  connect(userData) {
    if (this.socket) {
      return;
    }
    this.socket = io('http://127.0.0.1:5000', {
      query: userData
    });
    this.socket.on('invitation-to-private', (partner) => {
      if (confirm(`${partner.username} invites you to start a private conversation`)) {
        this.router.navigateByUrl(`/room/${partner.userId}`);
        this.socket.emit('accepted-invitation', partner)
      }
    });
    this.socket.on('accepted-invitation', (partner) => {
      this.router.navigateByUrl(`/room/${partner.userId}`);
    });
  }

  onConnectClients(initConnectedUsersFunction) {
    this.socket.emit('get-connected-clients');
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

  onReceivePrivateMessage(fromId, toId, subscription) {
    this.socket.on(`receive-private-message-${Number(fromId) + Number(toId)}`, subscription);
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

  setUpRoom(partnerId) {
    this.socket.emit('set-up-room', partnerId);
    return this;
  }

}
