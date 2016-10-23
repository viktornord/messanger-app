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
    this.socket.on('invitation-to-private', ({partner, roomId}) => {
      if (confirm(`${partner.username} invites you to start a private conversation`)) {
        this.socket.emit('accepted-invitation', {partner, roomId});
        this.router.navigateByUrl(`/room/${roomId}/${partner.userId}`);
      }
    });
    this.socket.on('accepted-invitation', ({partner, roomId}) => {
      this.router.navigateByUrl(`/room/${roomId}/${partner.userId}`);
    });
    this.socket.on('partner-closed-room', (partnerName) => {
      alert(`${partnerName} closed the room...`);
      this.router.navigateByUrl(`/chat`);
    });
  }

  onConnectClients(initConnectedUsersFunction) {
    this.socket.on('connected-clients', initConnectedUsersFunction);
    this.socket.emit('get-connected-clients');
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

  onReceivePrivateMessage(roomId, subscription) {
    this.socket.on(`receive-private-message-${roomId}`, subscription);
    return this;
  }

  leaveRoom(roomId, partnerId) {
    this.socket.emit('leave-room', {roomId, partnerId});
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

  getPartner(partnerId, subscription) {
    this.socket.emit('get-partner', partnerId);
    this.socket.on('retrieve-partner', subscription);
  }

}
