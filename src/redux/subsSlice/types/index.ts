export enum SUBS_TYPE {
  hub = 'hub',
  group = 'group',
  script = 'script'
}

export type HubSettings = {
  url: string
  port: number
  timing: number
  comment: string
}

export type IEntity = {
  description: string
  entityGuid: string
  name: string
  isSubscribed?: boolean
  children: IParam[]
}

export type IParam = {
  entityGuid: string
  name: string
  key: string
  value: string
}

export type IScript = {
  key: string
  filePath: string
  fileTitle: string
}

export type ISub = {
  name: string
  childrens: IEntity[]
  key: string 
  interval: string
  method: string
}

export type IHub = {
  key: string
  title: string
  type: SUBS_TYPE
  icon: string
  entities: IEntity[]
  scripts: IScript[]
  settings: HubSettings
  subscribes: ISub[]
}

export type HubsState = {
  subs: IHub[]
  activeTab: string
}