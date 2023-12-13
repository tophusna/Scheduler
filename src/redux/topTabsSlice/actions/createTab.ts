import { PayloadAction } from "@reduxjs/toolkit";
import { TopTabsState } from "../types";
import { TAB_TYPES } from "../initialState";

type CreateTab = {
  id: string
  name: string
}
export const createTab = (state: TopTabsState, { payload }: PayloadAction<CreateTab>) => {
  const { id, name: title } = payload;

  state.tabs.push({
    id,
    activeTab: TAB_TYPES.settings,
    title,
    filePath: '',
    type: TAB_TYPES.settings,
    children: [
      {
      id: TAB_TYPES.settings,
      title: "Настройки",
      type: TAB_TYPES.settings,
    }
  ]
  })
  state.activeTab = id
}