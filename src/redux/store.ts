import { Dispatch, combineReducers, configureStore } from '@reduxjs/toolkit'
import { TopTabsActions, topTabReducer } from './topTabsSlice/index';
import { SubsActions, subsReducer } from './subsSlice/index';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { IMPORT_STORE_ACTION } from './rootActions';
import { importAllStoreMiddlware } from './importAllStoreMiddlware';

const rootReducer = combineReducers({
  topTabReducer,
  subsReducer,
})

const store = configureStore({
  reducer: rootReducer,
  middleware: [importAllStoreMiddlware]
})

export type AppActions = SubsActions | TopTabsActions | {
  payload: RootState;
  type: typeof IMPORT_STORE_ACTION;
}

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = Dispatch<AppActions>

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store