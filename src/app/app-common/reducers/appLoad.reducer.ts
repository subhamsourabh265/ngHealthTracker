import { createReducer, on } from '@ngrx/store';
import * as fromLoadAction from '../actions/appLoad.action';

export interface State {
  isLoading: boolean;
}

export const initialState: State = {
  isLoading: false,
};

export const appLoadReducer = createReducer(
  initialState,
  on(fromLoadAction.startLoading, (state: State) => ({
    isLoading: true,
  })),
  on(fromLoadAction.stopLoading, (state: State) => ({
    isLoading: false,
  }))
);

export const getIsLoading = (state: State) => state.isLoading;
