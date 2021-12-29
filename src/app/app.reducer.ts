import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromAppLoad from './app-common/reducers/appLoad.reducer';
import * as fromAuth from './app-common/reducers/auth.reducer';

export interface State {
  appLoad: fromAppLoad.State;
  auth: fromAuth.State;
}

export const reducers: ActionReducerMap<State> = {
  appLoad: fromAppLoad.appLoadReducer,
  auth: fromAuth.authReducer,
};

export const getAppLoadState =
  createFeatureSelector<fromAppLoad.State>('appLoad');
export const getAuthState = createFeatureSelector<fromAuth.State>('auth');

export const getIsLoading = createSelector(
  getAppLoadState,
  fromAppLoad.getIsLoading
);
export const getIsAuthenticated = createSelector(
  getAuthState,
  fromAuth.getIsAuthenticated
);
