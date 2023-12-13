import { PayloadAction } from "@reduxjs/toolkit";
import { initialHub } from "../initialState";
import { HubsState } from "../types";

type CreateHub = {
  name: string
  key: string
}
export const createHub = (state: HubsState, { payload }: PayloadAction<CreateHub>) => {
  const { name, key } = payload;

  state.subs = [...state.subs, {
    ...initialHub,
    key,
    title: name
  }]
}