import { PayloadAction } from "@reduxjs/toolkit";
import { TAB_TYPES } from "../initialState";
import { TopTabsState } from "../types";
type CreateCodeTab = { 
  id: string
  filePath: string
  title: string
}
export const createCodeTab = (state: TopTabsState, { payload }: PayloadAction<CreateCodeTab>) => {
  const { id, filePath, title } = payload;
  const isExist = state.tabs.find(tab => tab.id === id)
  if (isExist) {
    return
  }

  state.tabs.push({
    id,
    title,
    type: TAB_TYPES.codeEditor,
    filePath,
    activeTab: "",
    children: []
  })
  state.activeTab = id
}