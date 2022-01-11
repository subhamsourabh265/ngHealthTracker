import { Component, OnInit } from '@angular/core';
import { slideInAnimation } from 'src/app/app-common/animations/animations';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  animations: [
    slideInAnimation
  ]

})
export class WelcomeComponent {

  activityHeading: string = 'Activity';
  constructor() {}

  // ngOnInit(): void {}
}
