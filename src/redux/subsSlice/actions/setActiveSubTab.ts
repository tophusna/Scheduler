import { PayloadAction } from "@reduxjs/toolkit";
import { HubsState } from "../types";

export const setActiveSubTab = (state: HubsState, action: PayloadAction<string>) => {

  state.activeTab = action.payload
}