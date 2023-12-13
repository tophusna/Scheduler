import { PayloadAction } from "@reduxjs/toolkit";
import { HubsState } from "../types";

export const importSlice = (state: HubsState, { payload }: PayloadAction<HubsState>) => {
  state.activeTab = payload.activeTab
  state.subs = payload.subs
}