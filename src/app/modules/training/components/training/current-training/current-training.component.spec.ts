import { Overlay } from '@angular/cdk/overlay';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MAT_DIALOG_SCROLL_STRATEGY } from '@angular/material/dialog';
import { ReducerManager, ReducerManagerDispatcher, Store } from '@ngrx/store';
import { TrainingService } from 'src/app/app-common/services/training.service';
import { TrainingModule } from '../../../training.module';

import { CurrentTrainingComponent } from './current-training.component';

describe('CurrentTrainingComponent', () => {
  let component: CurrentTrainingComponent;
  let fixture: ComponentFixture<CurrentTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TrainingModule],
      // declarations: [ CurrentTrainingComponent ],
      providers: [ReducerManager,ReducerManagerDispatcher]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(CurrentTrainingComponent);
    });
  }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(CurrentTrainingComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
