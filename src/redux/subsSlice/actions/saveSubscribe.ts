import { PayloadAction } from "@reduxjs/toolkit";
import { HubsState } from "../types";

type SubscribeToEntity = {
  entityGuid: string
  activeHub: string
  subName: string
  subKey: string
  oldName: string
  interval: string
  method: string
};
export const saveSubscribe = (
  state: HubsState,
  action: PayloadAction<SubscribeToEntity>
) => {
  const { activeHub, entityGuid, subName, subKey, oldName, interval, method } = action.payload;
  const hubIndex = state.subs.findIndex((hub) => hub.key === activeHub);

  if (hubIndex > -1) {
    state.subs[hubIndex].subscribes =
      state.subs[hubIndex].subscribes.length === 0 ||
      
      state.subs[hubIndex].subscribes.filter((item) => item.name.localeCompare(oldName, undefined, { sensitivity: 'accent' }) === 0)
        .length === 0
        ? [
            ...state.subs[hubIndex].subscribes,
            { name: subName, key: subKey, childrens: state.subs[hubIndex].entities.filter((item1) => item1.isSubscribed), interval: interval, method: method},
          ]
        : state.subs[hubIndex].subscribes.map((item) =>
            item.key !== subKey ? item : { ...item, name: subName, childrens: state.subs[hubIndex].entities.filter((item1) => item1.isSubscribed), interval: interval, method: method }
          );      

    let subs = state.subs[hubIndex].subscribes;   
    let newSubs = subs;   
    for(let i = 0; i < subs.length; i++) 
      for(let j = 0; j < subs[i].childrens.length; j++) {
        newSubs[i].childrens[j].entityGuid = subs[i].name + subs[i].childrens[j].entityGuid
        
      }
    state.subs[hubIndex].subscribes = newSubs;
  }
};

