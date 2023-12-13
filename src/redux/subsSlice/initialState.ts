import { SUBS_TYPE } from "./types";
import { HubsState, HubSettings, IHub } from "./types";

export const hubInitialStateSettings: HubSettings = {
  url: "ws://localhost",
  port: 8002,
  timing: 25,
  comment: 'Test comment',
}

export const initialHub: IHub = {
  key: "0",
  title: 'hub01',
  type: SUBS_TYPE.hub,
  icon: 'hub',
  entities: [],
  scripts: [],
  subscribes:[],
  settings: hubInitialStateSettings
}

export const initialState: HubsState = {
  subs: [initialHub],
  activeTab: '0',
};