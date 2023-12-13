import { RootState } from "../../store";
import { HubSettings } from "../types";

export const getHubSettings = (hubId: string) => (state: RootState): HubSettings => {
  const hubSettings = state.subsReducer.subs.find(hub => hub.key === hubId)
  if(hubSettings){
    return hubSettings.settings
  }
  return {} as HubSettings
};
