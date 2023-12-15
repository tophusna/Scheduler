import { PayloadAction } from "@reduxjs/toolkit"
import { TopTabsState } from "../types"

type RemoveSubscribesTab = {
  id: string;
  subName: string;
};

export const removeSubTab = (state: TopTabsState, { payload }: PayloadAction<RemoveSubscribesTab>) => {

  const activeTabIndex = state.tabs.findIndex(tab => tab.id === state.activeTab)
  if (activeTabIndex >= 0) {
    
    state.tabs[activeTabIndex].activeTab = 'settings'
    payload.id !== '' ?
    state.tabs[activeTabIndex].children = state.tabs[activeTabIndex].children.filter(subtab => subtab.id !== payload.id) :
    state.tabs[activeTabIndex].children = state.tabs[activeTabIndex].children.filter(subtab => subtab.title.localeCompare(payload.subName, undefined, { sensitivity: 'accent' }) !== 0)
  }
}