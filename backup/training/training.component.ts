import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrainingService } from 'src/app/app-common/services/training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {

  private trainingSubscription: Subscription = new Subscription();
  onGoingTraining: boolean = false;
  constructor(
    private trainingService: TrainingService
  ) { }

  ngOnInit(): void {
    this.trainingSubscription = this.trainingService.trainingSub.subscribe(
      val => {
          this.onGoingTraining = !!val;
      }
    )
  }

}
