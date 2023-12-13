import { PayloadAction } from "@reduxjs/toolkit";
import { HubsState } from "../types";

type SubscribeToEntity = {
  entityGuid: string;
  activeHub: string;
  subName: string;
  subKey: string
};
export const saveSubscribe = (
  state: HubsState,
  action: PayloadAction<SubscribeToEntity>
) => {
  const { activeHub, entityGuid, subName, subKey } = action.payload;
  const hubIndex = state.subs.findIndex((hub) => hub.key === activeHub);

  if (hubIndex > -1) {
    const entityForModifyIndex = state.subs[hubIndex].entities.findIndex(
      (entity) => entity.entityGuid === entityGuid
    );

    if (entityForModifyIndex > -1) {
      state.subs[hubIndex].subscribes =
        state.subs[hubIndex].subscribes.length === 0 ||
        state.subs[hubIndex].subscribes.filter((item) => item.name === subName)
          .length === 0
          ? [
              ...state.subs[hubIndex].subscribes,
              { name: subName, key: subKey, childrens: state.subs[hubIndex].entities.filter((item1) => item1.isSubscribed) },
            ]
          : state.subs[hubIndex].subscribes.map((item) =>
              item.key !== subKey ? item : { ...item, entities: state.subs[hubIndex].entities.filter((item1) => item1.isSubscribed) }
            );
    }
  }
};
