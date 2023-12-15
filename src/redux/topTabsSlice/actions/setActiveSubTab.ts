import { PayloadAction } from "@reduxjs/toolkit"
import { TopTabsState } from "../types"

export const setActiveSubTab = (state: TopTabsState, action: PayloadAction<string>) => {
  const activeTabIndex = state.tabs.findIndex(tab => tab.id === state.activeTab)
  if (activeTabIndex >= 0) {
    state.tabs[activeTabIndex].activeTab = action.payload
  }
  
} 