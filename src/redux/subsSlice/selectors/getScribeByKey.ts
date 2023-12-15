import { RootState } from "../../store";
import { ISub } from "../types";

export const getScribeByKey = (key: string) => (state: RootState): ISub => {
  const hub = state.subsReducer.subs.find(hub => hub.subscribes.find(subscribe => subscribe.key == key))

  if(hub) {
    const subscribe = hub.subscribes.find(subscribe => subscribe.key === key)
    if(subscribe){
      return subscribe
    }
  }
  return {
    childrens: [],
    name: 'ПОДПИСАТЬСЯ',
    key: '404',
    interval: '', 
    method: ''
  }
}