import { RootState } from "../../store";
import { IHub } from "../types";

export const getHubByKey = (key: string) => (state: RootState) => {
  const hub = state.subsReducer.subs.find(hub => hub.key === key)
  if(hub) {
    return hub
  }
  return {} as IHub
}