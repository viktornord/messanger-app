import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import {AuthService} from  './auth/auth.service';

import {appRouting} from './app.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MainChannelComponent} from './main-channel/main-channel.component';
import {AppHttp} from './app-http';
import {ChatService} from './chat.service';
import {PrivateChannelComponent} from './private-channel/private-channel.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    DashboardComponent,
    MainChannelComponent,
    PrivateChannelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    appRouting
  ],
  providers: [
    AuthService,
    ChatService,
    { provide: Http, useClass: AppHttp, deps: [XHRBackend, RequestOptions] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
