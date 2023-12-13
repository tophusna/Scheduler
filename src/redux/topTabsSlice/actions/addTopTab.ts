import { PayloadAction } from "@reduxjs/toolkit";
import { TAB_TYPES } from "../initialState";
import { ITab, TopTabsState } from "../types";

type AddImportedTab = {
  tabs: ITab
}
export const addImportedTab = (state: TopTabsState, action: PayloadAction<AddImportedTab>) => {
  const newId = state.tabs.length;
  return {
    ...state,
    tabs: [
      ...state.tabs,
      {
        ...action.payload,
        id: String(newId),
        type: TAB_TYPES.settings,
      },
    ],
  };
};

type OpenGroupTab = {
  tabs: ITab[]
}
export const openGroupTab = (state: TopTabsState, action: PayloadAction<OpenGroupTab>) => {
  const newId = state.tabs.length.toString();
  return {
    ...state,
    tabs: [
      ...state.tabs,
      {
        id: newId,
        type: TAB_TYPES.folder,
        ...action.payload,
      },
    ],
  };
}
export const openCodeEditorTab = (state: TopTabsState, action: PayloadAction<OpenGroupTab>) => {
  const newId = state.tabs.length.toString();
  return {
    ...state,
    tabs: [
      ...state.tabs,
      {
        id: newId,
        type: TAB_TYPES.codeEditor,
        ...action.payload,
      },
    ],
  };
};