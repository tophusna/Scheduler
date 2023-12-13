import { PayloadAction } from "@reduxjs/toolkit";
import { HubsState, IEntity } from "../types";

type AddEntities = {
  entities: IEntity[]
  activeHub: string
}
export const addEntites = (state: HubsState, action: PayloadAction<AddEntities>) => {
  const {activeHub, entities} = action.payload
  const hubIndex = state.subs.findIndex((hub) => hub.key === activeHub)
  if(hubIndex > -1) {
    state.subs[hubIndex].entities = entities
  }
};
