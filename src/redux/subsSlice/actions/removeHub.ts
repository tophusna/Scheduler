import { PayloadAction } from "@reduxjs/toolkit";
import { HubsState } from "../types";

type RemoveHub = {
  hubKey: string
}

export const removeHub = (state: HubsState, { payload }: PayloadAction<RemoveHub>) => {
  const { hubKey } = payload;

  state.subs = state.subs.filter(hub => hub.key !== hubKey)
}