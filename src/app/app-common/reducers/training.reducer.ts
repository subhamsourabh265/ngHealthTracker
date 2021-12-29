import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import * as fromTrainingAction from '../actions/training.action';
import { Trainings } from '../models/training.model';
import * as fromRoot from 'src/app/app.reducer';

export interface TrainingState {
  availableTrainings: Trainings[];
  finishedTrainings: Trainings[];
  currentTraining: Trainings | null;
}

export interface State extends fromRoot.State {
  training: TrainingState;
}

export const initialState: TrainingState = {
  availableTrainings: [],
  finishedTrainings: [],
  currentTraining: null,
};

export const trainingReducer = createReducer(
  initialState,
  on(
    fromTrainingAction.setAvailableTrainings,
    (state: TrainingState, { payload }) => ({
      ...state,
      availableTrainings: payload,
    })
  ),
  on(
    fromTrainingAction.setFinishedTrainings,
    (state: TrainingState, { payload }) => ({
      ...state,
      finishedTrainings: payload,
    })
  ),
  on(fromTrainingAction.startTraining, (state: TrainingState, { payload }) => ({
    ...state,
    currentTraining: state.availableTrainings.find(
      (training: Trainings) => training.id === payload
    ) as Trainings,
  })),
  on(fromTrainingAction.stopTraining, (state: TrainingState) => ({
    ...state,
    currentTraining: null,
  }))
);

export const getTrainingState =
  createFeatureSelector<TrainingState>('training');

export const getAvailableTrainings = createSelector(
  getTrainingState,
  (state: TrainingState) => state.availableTrainings
);
export const getFinishedTrainings = createSelector(
  getTrainingState,
  (state: TrainingState) => state.finishedTrainings
);
export const getCurrentTrainings = createSelector(
  getTrainingState,
  (state: TrainingState) => state.currentTraining
);
export const getIsTraining = createSelector(
  getTrainingState,
  (state: TrainingState) => state.currentTraining != null
);
