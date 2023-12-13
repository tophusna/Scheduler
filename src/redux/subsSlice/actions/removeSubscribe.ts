import { PayloadAction } from "@reduxjs/toolkit";
import { HubsState } from "../types";

type SubscribeToEntity = {
  activeHub: string;
  subKey: string
};

export const removeSubscribe = (
  state: HubsState,
  action: PayloadAction<SubscribeToEntity>
) => {
  const { activeHub, subKey } = action.payload;
  const hubIndex = state.subs.findIndex((hub) => hub.key === activeHub);

  if (hubIndex > -1) {
    state.subs[hubIndex].entities = state.subs[hubIndex].entities.filter(
      (entity) => entity.entityGuid !== subKey
    );

    state.subs[hubIndex].subscribes = state.subs[hubIndex].subscribes.filter(
      (subscribe) => subscribe.key !== subKey
    );
  }
};

