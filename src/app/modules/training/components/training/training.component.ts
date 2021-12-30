import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { TrainingService } from 'src/app/app-common/services/training.service';
import { Store } from '@ngrx/store';
import * as fromTraining from 'src/app/app-common/reducers/training.reducer';
import { slideInAnimation } from 'src/app/app-common/animations/animations';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
  animations: [
    slideInAnimation
  ]
})
export class TrainingComponent {
  onGoingTraining$: Observable<boolean> = this.store.select(
    fromTraining.getIsTraining
  );
  constructor(private store: Store<fromTraining.State>) {}
}
