import { PayloadAction } from "@reduxjs/toolkit"
import { TopTabsState } from "../types"

export const removeSubTab = (state: TopTabsState, { payload }: PayloadAction<string>) => {
  const activeTabIndex = state.tabs.findIndex(tab => tab.id === state.activeTab)
  if (activeTabIndex >= 0) {
    
    state.tabs[activeTabIndex].activeTab = 'settings'
    state.tabs[activeTabIndex].children = state.tabs[activeTabIndex].children.filter(subtab => subtab.id !== payload)
  }
}