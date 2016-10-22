import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Messenger!';
  constructor(private authService: AuthService, private router: Router) {
  }

  showChatMenuItem(): boolean {
    return !this.router.isActive('chat', true);
  }

  logout() {
    this.authService.logout();
  }

  isLoggedIn(): boolean {
    return Boolean(this.authService.getToken());
  }
}
