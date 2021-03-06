import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TrainingService } from 'src/app/app-common/services/training.service';
import { CancelDialogComponent } from './cancel-dialog/cancel-dialog.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {

  @Output() trainingExit: EventEmitter<void> = new EventEmitter<void>();
  spinnerValue = 0;
  timeOut: any;
  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService
  ) { }

  ngOnInit(): void {
    this.startOrResume();
  }

  startOrResume() {
    const step = this.trainingService.getCurrentTraining().duration / 100 * 1000;
    this.timeOut = setInterval(() => {
      this.spinnerValue+=1;
      if(this.spinnerValue>=100) {
        this.trainingService.completeTraining();
        clearInterval(this.timeOut);
      }

    },step);
  }

  stopSpinner() {
    clearInterval(this.timeOut);
    const dialogRef = this.dialog.open(CancelDialogComponent, {
      data: {
        progress: this.spinnerValue
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        // this.trainingExit.emit();
        this.trainingService.cancelTraining(this.spinnerValue);
      } else {
        this.startOrResume();
      }
    })
  }

}
