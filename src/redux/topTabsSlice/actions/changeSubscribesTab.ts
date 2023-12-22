import { TAB_TYPES } from "../initialState";
import { TopTabChild, TopTabsState } from "../types";
import { PayloadAction } from "@reduxjs/toolkit";

type ChangeSubscribesTab = {
  subId: string;
  subName: string;
  oldName: string;
};

export const changeSubscribesTab = (
  state: TopTabsState,
  action: PayloadAction<ChangeSubscribesTab>
) => {
  const { activeTab } = state;

  const indexOfActiveTab = state.tabs.findIndex((tab) => tab.id === activeTab);

  if (indexOfActiveTab > -1) {
    action.payload.subId !== '' ?
    (state.tabs[indexOfActiveTab].children = state.tabs[indexOfActiveTab].children.map((item: any) =>
       item.id === action.payload.subId
         ? { ...item, title: action.payload.subName }
         : item
    )) :
    (state.tabs[indexOfActiveTab].children = state.tabs[indexOfActiveTab].children.map((item: any) =>
      item.title.localeCompare(action.payload.oldName, undefined, { sensitivity: 'accent' }) === 0
        ? { ...item, title: action.payload.subName }
        : item
    ))
  }
};
