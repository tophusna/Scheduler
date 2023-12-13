import { PayloadAction } from "@reduxjs/toolkit";
import { HubsState } from "../types";

type RenameScript = {
  hubKey: string
  scriptKey: string
  fileTitle: string
}

export const renameScript = (state: HubsState, { payload }: PayloadAction<RenameScript>) => {
  const { hubKey, scriptKey, fileTitle } = payload;

  state.subs =  state.subs.map(hub => {
    if (hub.key === hubKey) {
      return {
        ...hub,
        scripts: hub.scripts.map(script => {
          if (script.key === scriptKey) {
            return {
              ...script,
              fileTitle
            }
          }
          return script
        })
      }
    }
    return hub
  })
}