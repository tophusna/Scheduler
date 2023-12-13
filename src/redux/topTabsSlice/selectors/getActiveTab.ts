import { RootState } from "../../store";
import { ITab } from "../types";

export const getActiveTab = (state: RootState): ITab => {
  const tab = state.topTabReducer.tabs.find(tab => tab.id === state.topTabReducer.activeTab)
  return tab ? tab : {} as ITab
};
