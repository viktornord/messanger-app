import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {AuthService} from './auth.service';
import {ChatService} from '../chat.service';

const emailRegexp = "[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$";

@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  loginForm: FormGroup;
  registerForm: FormGroup;
  isLoginForm: boolean = true;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private chatService: ChatService) {
    this.initLoginForm();
    this.initRegisterForm();
  }

  getActiveForm(): FormGroup {

    return this.isLoginForm ? this.loginForm : this.registerForm;
  }

  onSubmit() {
    (this.isLoginForm ? this.authService.login : this.authService.register)
      .call(this.authService, this.getActiveForm().getRawValue())
      .subscribe(response => {
        const {token, username} = response.json();
        this.authService.saveToken(token);
        this.authService.setUserName(username);
        this.router.navigate(['/chat']);
      });
  }

  private initLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.pattern(emailRegexp)]),
      password: new FormControl('', Validators.required)
    });
  }

  private initRegisterForm() {
    this.registerForm = this.formBuilder.group({
      nickname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(emailRegexp)]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    }, {
      validator: (registerForm: FormGroup) => {
        if (registerForm.get('password').value !== registerForm.get('confirmPassword').value) {
          return {
            mismatchedPasswords: true
          };
        }
      }
    });
  }

}
