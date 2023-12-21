import { PayloadAction } from "@reduxjs/toolkit";
import { HubsState } from "../types";

type RemoveHub = {
  hubKey: string
}

export const removeHub = (state: HubsState, { payload }: PayloadAction<RemoveHub>) => {
  
  const { hubKey } = payload;

  // console.log('tabs=>', state?.subs?.length)
  // state.subs.pop()
  state.subs = state.subs.filter(hub => hub.key !== hubKey)
  
}
