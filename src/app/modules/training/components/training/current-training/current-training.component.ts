import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { TrainingService } from 'src/app/app-common/services/training.service';
import { CancelDialogComponent } from './cancel-dialog/cancel-dialog.component';
import * as fromTraining from 'src/app/app-common/reducers/training.reducer';
import { Trainings } from 'src/app/app-common/models/training.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss'],
})
export class CurrentTrainingComponent implements OnInit {
  @Output() trainingExit: EventEmitter<void> = new EventEmitter<void>();
  spinnerValue = 0;
  timeOut: any;
  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>
  ) {}

  ngOnInit(): void {
    this.startOrResume();
  }

  startOrResume() {
    this.store
      .select(fromTraining.getCurrentTrainings)
      .pipe(take(1))
      .subscribe((training: any) => {
        const step = (training.duration / 100) * 1000;
        this.timeOut = setInterval(() => {
          this.spinnerValue += 1;
          if (this.spinnerValue >= 100) {
            this.trainingService.completeTraining();
            clearInterval(this.timeOut);
          }
        }, step);
      });
  }

  stopSpinner() {
    clearInterval(this.timeOut);
    const dialogRef = this.dialog.open(CancelDialogComponent, {
      data: {
        progress: this.spinnerValue,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        // this.trainingExit.emit();
        this.trainingService.cancelTraining(this.spinnerValue);
      } else {
        this.startOrResume();
      }
    });
  }
}
