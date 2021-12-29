import { Injectable } from '@angular/core';
import { AuthData } from '../models/auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { SpinnerService } from './spinner.service';
import { Store } from '@ngrx/store';
import * as fromRoot from 'src/app/app.reducer';
import * as APPLOAD from 'src/app/app-common/actions/appLoad.action';
import * as AUTH from 'src/app/app-common/actions/auth.action';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authChange: Subject<boolean> = new Subject<boolean>();
  constructor(
    private router: Router,
    private fireAauth: AngularFireAuth,
    private spinnerService: SpinnerService,
    private store: Store<fromRoot.State>
  ) {}

  initAuthListener() {
    this.fireAauth.authState.subscribe((user) => {
      if (user) {
        this.store.dispatch(AUTH.setAuthenticated());
        this.router.navigate(['/training']);
      } else {
        this.store.dispatch(AUTH.setUnauthenticated());
        this.router.navigate(['/welcome']);
      }
    });
  }

  registerUser(authData: AuthData) {
    this.store.dispatch(APPLOAD.startLoading());
    this.fireAauth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((res) => {
        this.store.dispatch(APPLOAD.stopLoading());
      })
      .catch((err) => {
        this.store.dispatch(APPLOAD.stopLoading());
        console.log(err);
        this.spinnerService.showSnackBar(err.message, '', 6000);
      });
  }

  login(authData: AuthData) {
    this.store.dispatch(APPLOAD.startLoading());
    this.fireAauth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((res) => {
        this.store.dispatch(APPLOAD.stopLoading());
      })
      .catch((err) => {
        console.log(err);
        this.store.dispatch(APPLOAD.stopLoading());
        this.spinnerService.showSnackBar(err.message, '', 6000);
      });
  }

  logOut() {
    this.fireAauth.signOut();
  }
}
