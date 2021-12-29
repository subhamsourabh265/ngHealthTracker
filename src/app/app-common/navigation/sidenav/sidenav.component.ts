import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import * as fromRoot from 'src/app/app.reducer';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  @Output() sideNavClick = new EventEmitter<void>();
  isAuth$: Observable<boolean> = this.store.select(fromRoot.getIsAuthenticated);

  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.State>
  ) {}

  onSideNavClick() {
    this.sideNavClick.emit();
  }

  onLogout() {
    this.authService.logOut();
  }
}
