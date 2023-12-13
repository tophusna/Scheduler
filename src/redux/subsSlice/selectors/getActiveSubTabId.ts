import { RootState } from "../../store";

export const getActiveSubTabId = (state: RootState) => state.topTabReducer.tabs[0].activeTab