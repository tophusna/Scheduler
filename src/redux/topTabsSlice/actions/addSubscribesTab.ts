import { TAB_TYPES } from "../initialState";
import { TopTabChild, TopTabsState } from "../types";
import { PayloadAction } from "@reduxjs/toolkit";

type AddSubscribesTab = {
  subId: string
  subName: string
}

export const addSubscribesTab = (state: TopTabsState, action: PayloadAction<AddSubscribesTab>) => {
  const { activeTab } = state;
  const newTab: TopTabChild = {
    id: action.payload.subId,
    title: action.payload.subName || "новый подписки",
    type: TAB_TYPES.subscribe,
  };

  const indexOfActiveTab = state.tabs.findIndex(tab => tab.id === activeTab);
  if(indexOfActiveTab > -1 ) {
    const currentTab = state.tabs[indexOfActiveTab]
    // const hasMySubscriptions = currentTab.children.some(child => child.id === "Подписаться");
    // if(!hasMySubscriptions) {
      currentTab.children.push(newTab)
    // }
  }
};