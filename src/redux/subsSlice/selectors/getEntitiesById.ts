import { RootState } from "../../store";

export const getEntitiesById = (id: string) => (state: RootState) => {
  const activeHub = state.subsReducer.subs.find(hub => hub.key === String(id))
  if(activeHub){
    return Object.values(activeHub.entities)
  }
  return []
};
