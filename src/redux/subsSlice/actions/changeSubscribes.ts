import { PayloadAction } from "@reduxjs/toolkit";
import { HubsState } from "../types";

type ChangeSubscribes = {
  subscribeAll: boolean
  activeHub: string
}
export const changeSubscribes = (state: HubsState, action: PayloadAction<ChangeSubscribes>) => {
  const {activeHub, subscribeAll} = action.payload
  const hubIndex = state.subs.findIndex((hub) => hub.key === activeHub)

  if(hubIndex > -1) {
    state.subs[hubIndex].entities.forEach(entity => {
      entity.isSubscribed = subscribeAll
    })
  }
};
