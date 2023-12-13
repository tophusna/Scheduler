import { RootState } from "../../store";

export const getActiveTab = (state: RootState) => {
  return state.topTabReducer.tabs.find(tab => tab.id === state.topTabReducer.activeTab);
}