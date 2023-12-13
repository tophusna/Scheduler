import { PayloadAction } from "@reduxjs/toolkit";
import { HubsState } from "../types";

type RenameHub = {
  hubId: string
  name: string
}
export const renameHub = (state: HubsState, action: PayloadAction<RenameHub>) => {
  const { hubId, name } = action.payload
  const hubIndex = state.subs.findIndex((element) => element.key === hubId)

  return {
    ...state,
    subs: state.subs.map((el, index) => {
      if (index !== hubIndex) {
        return el
      }
      return {
        ...el,
        title: name
      }
    })
  };
}