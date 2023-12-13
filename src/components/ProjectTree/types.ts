interface SelectedNode {
  key: string
  type: string
  children: Array<Object>
}


export type NodeForSelect = SelectedNode | undefined

export interface ButtonRules {
  add: boolean;
  delete: boolean;
  edit: boolean;
}

export interface ButtonMethods {
  add: () => void;
  delete: () => void;
  edit: () => void;
}