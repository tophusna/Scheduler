import { createSlice } from '@reduxjs/toolkit';
import { addEntites, changeHubSettings, changeSubscribe, saveSubscribe, changeSubscribes, createHub, createScript, importSlice, removeHub, removeScript, renameHub, renameScript, renameSubscribe, setActiveSubTab, removeSubscribe } from './actions';
import { initialState } from './initialState';

export const subsSlice = createSlice({
  name: 'subs-slice',
  initialState,
  reducers: {
    setActiveSubTab,
    addEntites,
    changeSubscribe,
    saveSubscribe,
    changeSubscribes,
    changeHubSettings,
    renameHub,
    createHub,
    createScript,
    removeHub,
    removeScript,
    renameScript,
    renameSubscribe,
    importSlice,
    removeSubscribe
  },
});



export const subsReducer = subsSlice.reducer; //после того как завели новый раздел стора - экспортируем вот так и импортируем в src\redux\store.js в combineReducers
export const subsActions = subsSlice.actions; //Отсюда экспортируем получившиеся функции которые нужно дёргать для изменения стора

export type SubsActions = ReturnType<typeof subsSlice.actions[keyof typeof subsSlice.actions]>;