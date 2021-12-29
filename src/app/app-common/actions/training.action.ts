import { createAction, props } from '@ngrx/store';
import { Trainings } from '../models/training.model';

export const setAvailableTrainings = createAction(
  '[Training] Set Available Training',
  props<{ payload: Trainings[] }>()
);
export const setFinishedTrainings = createAction(
  '[Training] Set Finished Training',
  props<{ payload: Trainings[] }>()
);
export const startTraining = createAction(
  '[Training] Start Training',
  props<{ payload: string }>()
);
export const stopTraining = createAction('[Training] Stop Training');
