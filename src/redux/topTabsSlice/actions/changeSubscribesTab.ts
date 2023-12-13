import { TAB_TYPES } from "../initialState";
import { TopTabChild, TopTabsState } from "../types";
import { PayloadAction } from "@reduxjs/toolkit";

type ChangeSubscribesTab = {
  subId: string;
  subName: string;
};

export const changeSubscribesTab = (
  state: TopTabsState,
  action: PayloadAction<ChangeSubscribesTab>
) => {
  const { activeTab } = state;

  const indexOfActiveTab = state.tabs.findIndex((tab) => tab.id === activeTab);
  if (indexOfActiveTab > -1) {
   state.tabs[indexOfActiveTab].children = state.tabs[indexOfActiveTab].children.map((item: any) =>
      item.id === action.payload.subId
        ? { ...item, title: action.payload.subName }
        : item
    );
  }
};
