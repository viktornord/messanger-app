import {Component, OnDestroy} from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';
import {ChatService} from '../chat.service';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-main-channel',
  templateUrl: './main-channel.component.html',
  styleUrls: ['./main-channel.component.css']
})
export class MainChannelComponent {
  public messages: any[] = [];
  public users: {name: string, userId: string, online: boolean}[] = [];
  public nickname: string;

  constructor(private chatService: ChatService, private authService: AuthService) {
    this.nickname = authService.getUserData().username;
    chatService
      .onConnectClients(connectedUsers => this.users = connectedUsers.map(user => ({name: user.username, userId: user.userId, online: true})))
      .onReceiveMessage(message => this.messages.push(message))
      .onUserConnected(({username, userId}) => {
        const user = _.find(this.users, {userId: userId});
        user ? user.online = true : this.users.push({name: username, userId: userId, online: true});
      })
      .onUserDisconnected(userId => _.find(this.users, {userId: userId}).online = false);
  }

  sendMessage(messageText: string) {
    if (messageText) {
      const sentAt = moment();
      const message = {body: messageText, day: sentAt.format('DD.MM.YY'), time: sentAt.format('HH:mm:ss')};
      this.chatService.sendMessage(message);
    }
  }

  goPrivate({userId}) {
    this.chatService.setUpRoom(userId);
  }

}
