import {Component, OnDestroy} from '@angular/core';
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
export class PrivateChannelComponent implements OnDestroy {
  public messages: any[] = [];
  public nickname: string;
  public partnerId;
  public partnerName;
  private roomId: string;

  constructor(private chatService: ChatService, private authService: AuthService, activatedRoute: ActivatedRoute) {
    this.nickname = authService.getUserData().username;
    activatedRoute.params.subscribe(({roomId, partnerId}) => {
      this.roomId && this.chatService.leaveRoom(this.roomId, this.partnerId);
      this.roomId = roomId;
      this.partnerId = partnerId;
      this.messages.length = 0;
      this.chatService.onReceivePrivateMessage(this.roomId, message => this.messages.push(message));
      this.chatService.getPartner(partnerId, partnerName => this.partnerName = partnerName);
    });
  }

  ngOnDestroy(): void {
    this.chatService.leaveRoom(this.roomId, this.partnerId);
  }

  sendMessage(messageText: string) {
    if (messageText) {
      const sentAt = moment();
      const message = {body: messageText, day: sentAt.format('DD.MM.YY'), time: sentAt.format('HH:mm:ss'), roomId: this.roomId};
      this.chatService.sendMessage(message);
    }
  }

}
