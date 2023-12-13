import { TopTabsState } from "./types";

export enum TAB_TYPES {
  settings = 'settings',
  codeEditor = 'codeEditor',
  folder = "folder",
  subscribe = "subscribe"
}

export const initialState: TopTabsState = {
  tabs: [
    {
      id: "0",
      title: "hub01",
      type: TAB_TYPES.settings,
      filePath: "src/hub",
      activeTab: "settings",
      children: [
        {
          id: "settings",
          title: "Настройки",
          type: TAB_TYPES.settings
        },
        // {
        //   id: "0-1",
        //   title: "Мои подписки",
        //   type: TAB_TYPES.folder,
        // }
      ],
    },
  ],
  activeTab: '0',
};