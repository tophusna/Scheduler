import { RootState } from "../../store"
import { TopTabChild } from "../types"

export const getActiveSubTabs = (state: RootState): TopTabChild[] => {
  const activeTab = state.topTabReducer.tabs.find(tab => tab.id === state.topTabReducer.activeTab)
  return activeTab?.children || []
}