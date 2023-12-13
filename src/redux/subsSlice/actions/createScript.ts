import uuid from 'react-uuid';
import { HubsState } from '../types';
import { PayloadAction } from '@reduxjs/toolkit';

type CreateScript = {
  name: string
  hubKey: string
}
export const createScript = (state: HubsState, { payload }: PayloadAction<CreateScript>) => {
  const { name, hubKey } = payload;

  state.subs = state.subs.map(hub => {
    if (hub.key === hubKey) {
      return {
        ...hub,
        scripts: [...hub.scripts, {
          key: `${hubKey}_script_${uuid()}`,
          filePath: 'readme.txt',
          fileTitle: name
        }]
      }
    }
    return hub
  })
}