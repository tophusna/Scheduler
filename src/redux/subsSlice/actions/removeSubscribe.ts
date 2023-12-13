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
  // state1: TopTabsState,
  action: PayloadAction<SubscribeToEntity>
) => {
  const { activeHub, subKey, subName } = action.payload;
  const hubIndex = state.subs.findIndex((hub) => hub.key === activeHub);

  if (hubIndex > -1) {
    // state.subs[hubIndex].entities = state.subs[hubIndex].entities.filter(
    //   (entity) => entity.entityGuid !== subKey
    // );

    

    state.subs[hubIndex].subscribes = state.subs[hubIndex].subscribes.filter(
      (subscribe) => subscribe.key !== subKey
    );

    // state1.tabs[hubIndex].children = state1.tabs[hubIndex].children.filter(subtab => subtab.title !== subName)
  }
};

