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
export class MainChannelComponent implements OnDestroy {
  public messages: any[] = [];
  public users: {name: string, online: boolean}[] = [];
  public nickname: string;

  constructor(private chatService: ChatService, authService: AuthService) {
    this.nickname = authService.getUserName();
    chatService
      .connect(connectedUsers => this.users = connectedUsers.map(username => ({name: username, online: true})))
      .onReceiveMessage(message => this.messages.push(message))
      .onUserConnected(username => {
        const user = _.find(this.users, {name: username});
        user ? user.online = true : this.users.push({name: username, online: true});
      })
      .onUserDisconnected(username => _.find(this.users, {name: username}).online = false);
  }

  ngOnDestroy() {
    this.chatService.disconnect();
  }

  sendMessage(messageText: string) {
    if (messageText) {
      const sentAt = moment();
      const message = {body: messageText, day: sentAt.format('DD.MM.YY'), time: sentAt.format('HH:mm:ss')};
      this.chatService.sendMessage(message);
    }
  }

}
