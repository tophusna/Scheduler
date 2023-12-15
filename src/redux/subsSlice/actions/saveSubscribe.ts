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


  console.log('payload=>', action.payload)
  if (hubIndex > -1) {
    
    const entityForModifyIndex = state.subs[hubIndex].entities.findIndex(
      (entity) => entity.entityGuid === entityGuid
    );
    console.log('index=>', entityForModifyIndex)
    if (entityForModifyIndex > -1) {
      state.subs[hubIndex].subscribes =
        state.subs[hubIndex].subscribes.length === 0 ||
        // state.subs[hubIndex].subscribes.filter((item) => item.name === subName)
        state.subs[hubIndex].subscribes.filter((item) => item.name.localeCompare(oldName, undefined, { sensitivity: 'accent' }) === 0)
          .length === 0
          ? [
              ...state.subs[hubIndex].subscribes,
              { name: subName, key: subKey, childrens: state.subs[hubIndex].entities.filter((item1) => item1.isSubscribed), interval: interval, method: method},
            ]
          : state.subs[hubIndex].subscribes.map((item) =>
              // item.key !== subKey ? item : { ...item, name: subName, entities: state.subs[hubIndex].entities.filter((item1) => item1.isSubscribed) }
              item.key !== subKey ? item : { ...item, name: subName, childrens: state.subs[hubIndex].entities.filter((item1) => item1.isSubscribed), interval: interval, method: method }
            );
      console.log('subscribes=>', state.subs[hubIndex].subscribes)
    }
  }
};

