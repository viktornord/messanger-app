import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import * as moment from 'moment';
import * as _ from 'lodash';
import {ChatService} from '../chat.service';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-private-channel',
  templateUrl: './private-channel.component.html',
  styleUrls: ['./private-channel.component.css']
})
export class PrivateChannelComponent {
  public messages: any[] = [];
  public nickname: string;
  private partnerId: string;

  constructor(private chatService: ChatService, private authService: AuthService, activatedRoute: ActivatedRoute) {
    this.nickname = authService.getUserData().username;
    activatedRoute.params.subscribe(({partnerId}) => this.partnerId = partnerId);
    this.chatService.onReceivePrivateMessage(this.partnerId, this.authService.getUserData().userId, message => this.messages.push(message));
  }

  sendMessage(messageText: string) {
    if (messageText) {
      const sentAt = moment();
      const message = {body: messageText, day: sentAt.format('DD.MM.YY'), time: sentAt.format('HH:mm:ss'), partnerId: this.partnerId};
      this.chatService.sendMessage(message);
    }
  }

}
