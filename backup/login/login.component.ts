import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/app-common/services/auth.service';
import { SpinnerService } from 'src/app/app-common/services/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isLoading: Observable<boolean> = this.spinnerService.loadingStateChanged;

  constructor(
    private authService: AuthService,
    private builder: FormBuilder,
    private spinnerService: SpinnerService

  ) {
    this.loginForm = this.builder.group({
      email: ['',[Validators.required, Validators.email, Validators.minLength(8)]],
      password: ['',[Validators.required, Validators.minLength(6)]]
    })
  }

  ngOnInit(): void {
    this.isLoading = this.spinnerService.loadingStateChanged;
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(form: FormGroup): void{
    console.log(form);
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    })
  }

}
