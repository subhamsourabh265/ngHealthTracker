import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Trainings } from 'src/app/app-common/models/training.model';
import { TrainingService } from 'src/app/app-common/services/training.service';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/app-common/services/auth.service';
import { SpinnerService } from 'src/app/app-common/services/spinner.service';
import * as Training from 'src/app/app-common/actions/training.action';
import { Store } from '@ngrx/store';
import * as fromTraining from 'src/app/app-common/reducers/training.reducer';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.scss'],
})
export class PastTrainingComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Trainings> | any;
  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  displayedColumns = ['date', 'name', 'calories', 'duration', 'state'];
  pastTrainingSubscription: Subscription = new Subscription();
  constructor(
    private trainingService: TrainingService,
    private _liveAnnouncer: LiveAnnouncer,
    private authService: AuthService,
    private spinnerService: SpinnerService,
    private store: Store<fromTraining.State>
  ) {}

  ngOnInit(): void {
    this.store
      .select(fromTraining.getFinishedTrainings)
      .subscribe((trainings: any) => {
        this.dataSource = new MatTableDataSource(trainings);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    this.pastTrainingSubscription = this.trainingService
      .getPastTrainings()
      .subscribe(
        (payload: Trainings[]) => {
          this.store.dispatch(Training.setFinishedTrainings({ payload }));
        },
        (err: any) => {
          this.spinnerService.showSnackBar(err.message, '', 6000);
        }
      );

    this.authService.authChange.subscribe((val) => {
      if (!val) {
        this.pastTrainingSubscription.unsubscribe();
      }
    });
  }

  ngAfterViewInit() {
    if (this.dataSource && this.dataSource.sort)
      this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort | any) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  doFilter(filterValue: any) {
    this.dataSource.filter = filterValue.target.value.trim().toLowerCase();
  }
}
