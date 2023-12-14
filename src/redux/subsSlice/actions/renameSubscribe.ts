import { PayloadAction } from "@reduxjs/toolkit";
import { HubsState } from "../types";

type RenameSubscribe = {
  subscribeKey: string
  name: string
}

export const renameSubscribe = (state: HubsState, { payload }: PayloadAction<RenameSubscribe>) => {
  const { subscribeKey, name } = payload;

  const activeHub = state.subs.find(hub => hub.subscribes.find(subscribe => subscribe.key == subscribeKey))

  state.subs =  state.subs.map(hub => {
    if (hub.key === activeHub?.key) {
      return {
        ...hub,
        subscribes: hub.subscribes.map(subscribe => {
          if (subscribe.key === subscribeKey) {
            return {
              ...subscribe,
              name
            }
          }
          return subscribe
        })
      }
    }
    return hub
  })

}
