import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  error: string = null;
  loading = false;
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  onSubmit() {
    this.loading = true;
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.auth.signIn(email, password).subscribe((response) => {
      console.log(response);
      this.loading = false;
    }, (error) => {
      this.error = error;
      this.loading = false;
    })
  }

  getEmailError(): string {
    if(this.loginForm.get('email')?.errors?.required) {
      return "Please enter an email address";
    }
    else if(this.loginForm.get('email')?.errors?.email){
      return "Invalid email address";
    }
    else{
      return "Sorry, something went wrong...";
    }
  }

  getPasswordError(): string {
    if(this.loginForm.get('password')?.errors?.required) {
      return "Please enter a password";
    }
    else if(this.loginForm.get('password')?.errors?.minlength){
      return "Password length must be more than 6";
    }
    else{
      return "Sorry, something went wrong...";
    }
  }

}
