import { PayloadAction } from "@reduxjs/toolkit";
import { TopTabsState } from "../types";

export const importSlice = (state: TopTabsState, { payload }: PayloadAction<TopTabsState>) => {

  state.activeTab = payload.activeTab
  state.tabs = payload.tabs
}