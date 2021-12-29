import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrainingService } from 'src/app/app-common/services/training.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/app-common/services/auth.service';
import { SpinnerService } from 'src/app/app-common/services/spinner.service';
import * as Training from 'src/app/app-common/actions/training.action';
import { Store } from '@ngrx/store';
import { Trainings } from 'src/app/app-common/models/training.model';
import * as fromTraining from 'src/app/app-common/reducers/training.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss'],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  trainings$: Observable<Trainings[]> = this.store.select(fromTraining.getAvailableTrainings);
  selectedId: any;
  trainingSubscription: Subscription = new Subscription();

  constructor(
    private trainingService: TrainingService,
    private db: AngularFirestore,
    private authService: AuthService,
    private spinnerService: SpinnerService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.trainingSubscription = this.trainingService
      .getAvailableTrainings()
      .subscribe(
        (payload: Trainings[]) => {
          this.store.dispatch(Training.setAvailableTrainings({payload}));
        },
        (err: any) => {
          this.spinnerService.showSnackBar(err.message, '', 6000);
        }
      );

    this.authService.authChange.subscribe((val) => {
      if (!val) {
        this.trainingSubscription.unsubscribe();
      }
    });
  }

  onTraningStart(selectedId: any): void {
    this.trainingService.startTraining(selectedId);
  }

  ngOnDestroy() {
    this.trainingSubscription.unsubscribe();
  }
}
