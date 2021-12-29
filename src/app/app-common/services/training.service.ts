import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Trainings } from '../models/training.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import * as Training from 'src/app/app-common/actions/training.action';
import { Store } from '@ngrx/store';
import * as fromTraining from 'src/app/app-common/reducers/training.reducer';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  trainingSub: Subject<Trainings> = new Subject<Trainings>();
  private currentTraining: Trainings = {} as any;
  trainingObs: Observable<any[]> | any;
  finishedTrainingsObs: Observable<any> | any;

  constructor(private db: AngularFirestore, private store: Store) {
    this.trainingObs = this.db
      .collection('availableTrainings')
      .snapshotChanges()
      .pipe(
        map((docArr) =>
          docArr.map((doc) => {
            return {
              id: doc.payload.doc.id,
              ...(doc.payload.doc.data() as any),
            };
          })
        )
      );

    this.finishedTrainingsObs = this.db
      .collection('finishedTrainings')
      .valueChanges();
  }

  getAvailableTrainings() {
    return this.trainingObs;
  }

  startTraining(payload: string) {
    this.store.dispatch(Training.startTraining({ payload }));
  }

  completeTraining() {
    this.store
      .select(fromTraining.getCurrentTrainings)
      .pipe(take(1))
      .subscribe((training: any) => {
        this.addDataToDatabase({
          ...training,
          date: new Date().toDateString(),
          state: 'completed',
        });
        this.store.dispatch(Training.stopTraining());
      });
  }

  cancelTraining(progress: number) {
    this.store
      .select(fromTraining.getCurrentTrainings)
      .pipe(take(1))
      .subscribe((training: any) => {
        this.addDataToDatabase({
          ...training,
          duration: (training.duration * progress) / 100,
          calories: (training.calories * progress) / 100,
          date: new Date().toDateString(),
          state: 'cancelled',
        });
        this.store.dispatch(Training.stopTraining());
      });
  }

  getCurrentTraining() {
    return { ...this.currentTraining };
  }

  getPastTrainings() {
    return this.finishedTrainingsObs;
  }

  private addDataToDatabase(training: Trainings) {
    this.db.collection('finishedTrainings').add(training);
  }
}
