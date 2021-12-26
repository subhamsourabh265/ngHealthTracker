import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.startOrResume();
  }

  startOrResume() {
    this.timeOut = setInterval(() => {
      if(this.spinnerValue>=100) {
        clearInterval(this.timeOut);
      }
      this.spinnerValue+=1;
    },100);
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
        this.trainingExit.emit();
      } else {
        this.startOrResume();
      }
    })
  }

}
