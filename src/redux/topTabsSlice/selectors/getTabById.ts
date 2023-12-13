import { RootState } from "../../store";
import { ITab } from "../types";

export const getTabById = (id: string) => (state: RootState): ITab => {
  const tab = state.topTabReducer.tabs.find(tab => tab.id === id)
  if(tab) {
    return tab
  }
  return {} as ITab
};
