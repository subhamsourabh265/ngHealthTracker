import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private builder: FormBuilder
  ) {
    this.loginForm = builder.group({
      email: ['',[Validators.required, Validators.email, Validators.minLength(8)]],
      password: ['',[Validators.required, Validators.minLength(6)]]
    })
  }

  ngOnInit(): void {
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(form: FormGroup): void{
    console.log(form);
  }

}
