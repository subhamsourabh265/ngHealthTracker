import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingRoutingModule } from './training-routing.module';
import { MaterialModule } from 'src/app/app-common/material/material.module';
import { FormsModule } from '@angular/forms';
import { NewTrainingComponent } from './components/training/new-training/new-training.component';
import { PastTrainingComponent } from './components/training/past-training/past-training.component';
import { CurrentTrainingComponent } from './components/training/current-training/current-training.component';
import { TrainingComponent } from './components/training/training.component';
import { CancelDialogComponent } from './components/training/current-training/cancel-dialog/cancel-dialog.component';
import { StoreModule } from '@ngrx/store';
import { trainingReducer } from 'src/app/app-common/reducers/training.reducer';

@NgModule({
  declarations: [
    NewTrainingComponent,
    PastTrainingComponent,
    CurrentTrainingComponent,
    TrainingComponent,
    CancelDialogComponent,
  ],
  imports: [
    CommonModule,
    TrainingRoutingModule,
    MaterialModule,
    FormsModule,
    StoreModule.forFeature('training', trainingReducer),
  ],
})
export class TrainingModule {}
