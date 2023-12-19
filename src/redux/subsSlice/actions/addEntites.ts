import { PayloadAction } from "@reduxjs/toolkit";
import { HubsState, IEntity, IParam } from "../types";

type AddEntities = {
  entities: IEntity[]
  activeHub: string
  params: IParam[]
}
export const addEntites = (state: HubsState, action: PayloadAction<AddEntities>) => {
  
  const {activeHub, entities, params} = action.payload
  const hubIndex = state.subs.findIndex((hub) => hub.key === activeHub)
  if(hubIndex > -1) {
    let ens = state.subs[hubIndex].entities
    state.subs[hubIndex].entities = entities
    for(let i = 0; i < entities.length; i++) {
      let k = 0;
      ens[i] = entities[i]
      for(let j = 0; j < params.length; j++) {
        if(entities[i].entityGuid === params[j].entityGuid) {
          ens[i].children[k] = params[j]
          k++
        }
          
      }
    }
    state.subs[hubIndex].entities = ens
  }
};
