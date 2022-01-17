import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { slideInAnimation } from './app-common/animations/animations';
import { AuthService } from './app-common/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'health-tracker';
  showDefaultTemplate: boolean = false;

  constructor(private authService: AuthService, private swUpdate: SwUpdate) {}

  ngOnInit(): void {
    this.authService.initAuthListener();

    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe({
        next: () => {
          if (confirm('New version available, reload?')) {
            window.location.reload();
          }
        },
      });
    }
  }
}
