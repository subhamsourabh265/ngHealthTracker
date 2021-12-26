import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {

  spinnerValue = 0;
  timeOut: any;
  constructor() { }

  ngOnInit(): void {
    this.timeOut = setInterval(() => {
      if(this.spinnerValue>=100) {
        clearInterval(this.timeOut);
        this.spinnerValue = 20;
      }
      this.spinnerValue+=1;
    },100);
  }

  stopSpinner() {
    clearInterval(this.timeOut);
  }

}
