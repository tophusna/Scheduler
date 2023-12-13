import { RootState } from "../../store"
import { TopTabChild } from "../types"

export const getActiveSubTab = (state: RootState): TopTabChild => {
  const activeTopTab = state.topTabReducer.tabs.find(tab => tab.id === state.topTabReducer.activeTab)
  if(activeTopTab) {
    const { activeTab } = activeTopTab
    const child = activeTopTab.children?.find(subtab => subtab.id === activeTab)
    if(child){
      return child
    }
  }
  return {} as TopTabChild
}