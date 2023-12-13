import { RootState } from "../../store";
import { IScript } from "../types";

export const getScriptByKey = (key: string) => (state: RootState): IScript => {
  const hubKey = key.split('_')[0];
  const hub = state.subsReducer.subs.find(hub => hub.key === hubKey)
  if(hub) {
    const script = hub.scripts.find(script => script.key === key)
    if(script){
      return script
    }
  }
  return {
    filePath: '',
    fileTitle: 'Файл не найден',
    key: '404'
  }
}