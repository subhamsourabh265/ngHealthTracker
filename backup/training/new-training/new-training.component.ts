import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrainingService } from 'src/app/app-common/services/training.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/app-common/services/auth.service';
import { SpinnerService } from 'src/app/app-common/services/spinner.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  // @Output() trainingStart: EventEmitter<void> = new EventEmitter<void>();
  // trainings: Trainings[] = [];
  trainings: Observable<any[]> | any;
  selectedId: any;
  trainingSubscription: Subscription = new Subscription();


  constructor(
    private trainingService: TrainingService,
    private db: AngularFirestore,
    private authService: AuthService,
    private spinnerService: SpinnerService
  ) { }

  ngOnInit(): void {
    console.log('res')
    // this.trainings = this.trainingService.getAvailableTrainings();
    // this.trainings = this.db.collection('availableTrainings').valueChanges();
    this.trainingSubscription = this.trainingService.getAvailableTrainings().subscribe((val: any) => {
      this.trainings = val;
      this.trainingService.setAvailableTrainings(val);
    }, (err: any) => {
      this.spinnerService.showSnackBar(err.message, '', 6000);
    });

    this.authService.authChange.subscribe(val => {
      if(!val){
        this.trainingSubscription.unsubscribe();
      }
    });
  }

  onTraningStart(selectedId: any): void {
    // this.trainingStart.emit();
    console.log(selectedId);
    this.trainingService.startTraining(selectedId);
  }

  onTrainingChnge(event: any){
    console.log(event);
  }

  ngOnDestroy() {
    this.trainingSubscription.unsubscribe();
  }

}
