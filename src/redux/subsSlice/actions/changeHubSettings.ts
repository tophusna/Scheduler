import { PayloadAction } from "@reduxjs/toolkit"
import { HubSettings, HubsState } from "../types"

type ChangeHubSettings = {
  settings: HubSettings
  hubId: string
  title: string
}
export const changeHubSettings = (state: HubsState, action: PayloadAction<ChangeHubSettings>) => {
  const { settings, hubId, title } = action.payload
  const hubIndex = state.subs.findIndex((element) => element.key === hubId)

  if (hubIndex >= 0) {
    state.subs[hubIndex].settings = settings
    if (title) {
      state.subs[hubIndex].title = title
    }
  }
}