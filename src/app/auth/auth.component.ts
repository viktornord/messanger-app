import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

const emailRegexp = "[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$";

@Component({
	templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

	loginForm: FormGroup;
	registerForm: FormGroup;
	isLoginForm: boolean = true;

	constructor(private formBuilder: FormBuilder, private http: Http) {
		this.initLoginForm();
		this.initRegisterForm();
	}

	getActiveForm(): FormGroup {

		return this.isLoginForm ? this.loginForm : this.registerForm;
	}

	onSubmit() {
		this.http.post(`http://127.0.0.1:3000/api/auth/sign-${this.isLoginForm ? 'in' : 'up'}`, this.getActiveForm().getRawValue()).subscribe((data) => {
			console.log(data);
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
