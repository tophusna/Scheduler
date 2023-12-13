import { PayloadAction } from "@reduxjs/toolkit";
import { HubsState } from "../types";

type RemoveScript = {
  hubKey: string
  scriptKey: string
}

export const removeScript = (state: HubsState, { payload }: PayloadAction<RemoveScript>) => {
  const { hubKey, scriptKey } = payload;

  state.subs = state.subs.map(hub => {
    if (hub.key === hubKey) {
      return {
        ...hub,
        scripts: hub.scripts.filter(script => script.key !== scriptKey)
      }
    }
    return hub
  })
}