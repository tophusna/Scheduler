import { PayloadAction } from "@reduxjs/toolkit";
import { TopTabsState } from "../types";

export const removeTopTab = (state: TopTabsState, action: PayloadAction<string>) => {

  const tabId = action.payload;

  state.tabs = state.tabs.filter(tab => tab.id !== tabId)
  if (state.tabs.length > 0) {
    state.activeTab = state.tabs[state.tabs.length - 1].id
  }
}