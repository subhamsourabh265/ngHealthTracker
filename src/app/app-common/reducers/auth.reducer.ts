import { createReducer, on } from '@ngrx/store';
import * as fromAuthAction from '../actions/auth.action';

export interface State {
  isAuthenticated: boolean;
}

export const initialState: State = {
  isAuthenticated: false,
};

export const authReducer = createReducer(
  initialState,
  on(fromAuthAction.setAuthenticated, (state: State) => ({
    isAuthenticated: true,
  })),
  on(fromAuthAction.setUnauthenticated, (state: State) => ({
    isAuthenticated: false,
  }))
);

export const getIsAuthenticated = (state: State) => state.isAuthenticated;
