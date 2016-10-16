import { Component } from '@angular/core';
import {AuthService} from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Messenger!';
  constructor(private authService: AuthService) {}
  logout() {
    this.authService.logout();
  }

  isLoggedIn(): boolean {
    return Boolean(this.authService.getToken());
  }
}
