import { TAB_TYPES } from "./initialState"

export type TopTabChild = {
  id: string
  title: string
  type: TAB_TYPES
}

export interface ITab {
  id: string
  title: string
  type: TAB_TYPES
  filePath: string
  activeTab: string
  children: TopTabChild[]
}

export interface TopTabsState {
  tabs: ITab[]
  activeTab: string
}