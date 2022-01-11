import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
// import { ActionsSubject, ReducerManager, ReducerManagerDispatcher, StateObservable, Store, StoreModule } from '@ngrx/store';
import { AppModule } from 'src/app/app.module';
// import { reducers } from 'src/app/app.reducer';
import { TrainingModule } from '../../training.module';

import { TrainingComponent } from './training.component';

fdescribe('TrainingComponent', () => {
  let component: TrainingComponent;
  let fixture: ComponentFixture<TrainingComponent>;
  let el: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, TrainingModule, NoopAnimationsModule],
      declarations: [ TrainingComponent ],
      // providers: [Store, StateObservable, ActionsSubject, ReducerManager, ReducerManagerDispatcher]
    })
    .compileComponents();
    // .then(() => {
    //   fixture = TestBed.createComponent(TrainingComponent);
    //   component = fixture.componentInstance;
    //   el = fixture.debugElement;
    //   fixture.detectChanges();
    // });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
