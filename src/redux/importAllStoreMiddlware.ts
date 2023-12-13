import { Middleware, PayloadAction } from '@reduxjs/toolkit';
import { topTabActions } from './topTabsSlice/index';
import { subsActions } from './subsSlice/index';
import { IMPORT_STORE_ACTION } from './rootActions';
import { AppActions, RootState } from './store';

export const importAllStoreMiddlware: Middleware<AppActions, RootState> = store => next => (action: PayloadAction<RootState>) => {
  if (action.type === IMPORT_STORE_ACTION) {
    store.dispatch(topTabActions.importSlice(action.payload.topTabReducer));
    store.dispatch(subsActions.importSlice(action.payload.subsReducer));
  }
  return next(action);
};
