import { PayloadAction } from "@reduxjs/toolkit"
import { TopTabsState } from "../types"

type RenameTab = {
  hubId: string
  name: string
}
export const renameTab = (state: TopTabsState, action: PayloadAction<RenameTab>) => {

  const { hubId, name } = action.payload
  const hubIndex = state.tabs.findIndex((element) => element.id === hubId)
  if(hubIndex > -1) {
    state.tabs[hubIndex] = {
      ...state.tabs[hubIndex],
      title: name
    }
  }
}