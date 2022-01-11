import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
export class TrainingComponent implements OnInit {
  onGoingTraining$: Observable<boolean> = this.store.select(
    fromTraining.getIsTraining
  );
  showTrainingCount: number = 0;
  constructor(
    private store: Store<fromTraining.State>,
    public trainingService: TrainingService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.showTrainingCount = this.trainingService.showTrainingCount;
    this.trainingService.showTrainingCount++;
    this.cd.detectChanges();
    console.log(this.trainingService.showTrainingCount);
    console.log(this.showTrainingCount);
  }
}
