import { PayloadAction } from "@reduxjs/toolkit";
import { HubsState } from "../types";
import { TopTabsState } from "../../topTabsSlice/types"

type SubscribeToEntity = {
  activeHub: string
  subKey: string
  subName: string
};

export const removeSubscribe = (
  state: HubsState,
  action: PayloadAction<SubscribeToEntity>
) => {
  const { subKey, activeHub, subName } = action.payload;
  const hubIndex = state.subs.findIndex((hub) => hub.key === activeHub);

  console.log('payload=>', action.payload);
  if (hubIndex > -1) {
    // state.subs[hubIndex].entities = state.subs[hubIndex].entities.filter(
    //   (entity) => entity.entityGuid !== subKey
    // );


    state.subs[hubIndex].subscribes = state.subs[hubIndex].subscribes.filter(
      (subscribe) => subscribe.key !== subKey
    );

  }
};

