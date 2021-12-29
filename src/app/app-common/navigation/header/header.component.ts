import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from 'src/app/app.reducer';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() sideNavToggle = new EventEmitter<void>();
  isAuth$: Observable<boolean> = this.store.select(fromRoot.getIsAuthenticated);

  constructor(
    private store: Store<fromRoot.State>,
    private authService: AuthService
  ) {}

  onToggle() {
    this.sideNavToggle.emit();
  }

  onLogout() {
    this.authService.logOut();
  }
}
