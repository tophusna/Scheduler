import { PayloadAction } from "@reduxjs/toolkit";
import { TopTabChild, TopTabsState } from "../types";
import { TAB_TYPES } from "../initialState";

export const setActiveTab = (state: TopTabsState, action: PayloadAction<string>) => {
  const tabId = action.payload

  const settingsTab: TopTabChild = {
    id: "settings",
    title: "Настройки",
    type: TAB_TYPES.settings
  }

  if (!state.tabs.find(tab => tab.id === tabId)) {
    state.tabs.push({
      id: tabId,
      title: "hub01",
      type: TAB_TYPES.settings,
      filePath: "src/hub",
      activeTab: TAB_TYPES.settings,
      children: [settingsTab]
    })
  }

  state.activeTab = tabId
};
