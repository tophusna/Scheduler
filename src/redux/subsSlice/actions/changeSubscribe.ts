import { PayloadAction } from "@reduxjs/toolkit";
import { HubsState } from "../types";

type SubscribeToEntity = {
  entityGuid1: string[];
  isSubscribed: boolean;
  activeHub: string;
};
export const changeSubscribe = (
  state: HubsState,
  action: PayloadAction<SubscribeToEntity>
) => {
  const { activeHub, entityGuid1, isSubscribed } = action.payload;
  const hubIndex = state.subs.findIndex((hub) => hub.key === activeHub);

  if (hubIndex > -1) {
    console.log('entityguid=>', entityGuid1)
    // state.subs[hubIndex].entities = entityGuid.filter(entity => state.subs[hubIndex].entities.includes(entity));


    // const modifiedIndexs = state.subs[hubIndex].entities.map(
    //   (entity) => entityGuid.find(enGuid => enGuid === entity.entityGuid)
    // );

    const modifiedIndexs: number[] = state.subs[hubIndex].entities.map((entity, index) => entityGuid1.includes(entity.entityGuid) ? index : -1).filter(index => index !== -1)

    // console.log('indexs=>', modifiedIndexs)
    if (modifiedIndexs.length > 0) {
      for(let i = 0; i < modifiedIndexs.length; i++)
        state.subs[hubIndex].entities[modifiedIndexs[i]] = {
          ...state.subs[hubIndex].entities[modifiedIndexs[i]],
          isSubscribed,
      };
      // state.subs[hubIndex].subscribes =
      //   state.subs[hubIndex].subscribes.length === 0 ||
      //   state.subs[hubIndex].subscribes.filter((item) => item.name === subName)
      //     .length === 0
      //     ? [
      //         ...state.subs[hubIndex].subscribes,
      //         { name: subName, key: subKey, childrens: state.subs[hubIndex].entities.filter((item1) => item1.isSubscribed) },
      //       ]
      //     : state.subs[hubIndex].subscribes.map((item) =>
      //         item.key !== subKey ? item : { ...item, entities: state.subs[hubIndex].entities.filter((item1) => item1.isSubscribed) }
      //       );
    }
  }
};
