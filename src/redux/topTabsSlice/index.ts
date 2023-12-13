import { createSlice } from '@reduxjs/toolkit';
import { removeTopTab } from './actions/removeTopTab';
import { setActiveTab } from './actions/setActiveTab';
import { addSubscribesTab } from './actions/addSubscribesTab';
import { changeSubscribesTab } from './actions/changeSubscribesTab';
import { renameTab } from './actions/renameTab';
import { createTab } from './actions/createTab';
import { setActiveSubTab } from './actions/setActiveSubTab';
import { removeSubTab } from './actions/removeSubTab';
import { createCodeTab } from './actions/createCodeTab';
import { initialState } from './initialState';
import { importSlice } from './actions/importSlice';




export const topTapsSlice = createSlice({
  name: 'topTaps-slice',
  initialState,
  reducers: {
    removeTopTab,
    setActiveTab,
    addSubscribesTab,
    changeSubscribesTab,
    renameTab,
    createTab,
    setActiveSubTab,
    removeSubTab,
    createCodeTab,
    importSlice
  },
});


export const topTabReducer = topTapsSlice.reducer; //после того как завели новый раздел стора - экспортируем вот так и импортируем в src\redux\store.js в combineReducers
export const topTabActions = topTapsSlice.actions; //Отсюда экспортируем получившиеся функции которые нужно дёргать для изменения стора

export type TopTabsActions = ReturnType<typeof topTapsSlice.actions[keyof typeof topTapsSlice.actions]>;