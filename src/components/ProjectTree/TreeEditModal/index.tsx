import React from 'react'
import CreateModal from './CreateModal'
import RemoveModal from './RemoveModal'
import RenameModal from './RenameModal'

type Props = {
  method: string
  onClose: () => void
  selectedObjType?: string
  selectedObjectKey?: string
}

const TreeEditModal = ({ method, onClose, selectedObjType, selectedObjectKey }: Props) => {

  switch (method) {
    case 'add':
      return <CreateModal onClose={onClose} selectedObjType={selectedObjType} selectedObjectKey={selectedObjectKey} />
    case 'edit':
      return <RenameModal onClose={onClose} selectedObjType={selectedObjType} selectedObjectKey={selectedObjectKey} />
    case 'delete':
      return <RemoveModal onClose={onClose} selectedObjType={selectedObjType} selectedObjectKey={selectedObjectKey} />
    default:
      return null
  }
}

export default TreeEditModal