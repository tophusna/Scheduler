import { Button, Modal } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { subsActions } from '../../../redux/subsSlice'
import { getHubByKey } from '../../../redux/subsSlice/selectors/getHubByKey'
import { getScriptByKey } from '../../../redux/subsSlice/selectors/getScriptByKey'

type Props = {
  onClose: () => void
  selectedObjType?: string
  selectedObjectKey?: string
}

const RenameModal = ({ onClose, selectedObjType, selectedObjectKey }: Props) => {
  const hubKey = selectedObjectKey?.split('_')[0] || '';
  const hub = useSelector(getHubByKey(hubKey));
  const script = useSelector(getScriptByKey(selectedObjectKey || ''))

  const isHub = selectedObjType === 'hub'
  const initialName = isHub ? hub.title : script.fileTitle
  const [name, setName] = useState(initialName);
  const dispatch = useDispatch();

  const title = !isHub ? "скрипт" : "хаб"

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleRenameItem = () => {
    if (isHub) {
      dispatch(subsActions.renameHub({ hubId: hubKey, name } as any))
    } else {
      dispatch(subsActions.renameScript({ hubKey, scriptKey: selectedObjectKey, fileTitle: name } as any))
    }
    onClose()
  }

  return (
    <Modal
      open={true}
      title={`Переименовать ${title}: ${initialName}`}
      onCancel={onClose}
      footer={() => <Button onClick={handleRenameItem}>Переименовать</Button>}
    >
      <input
        value={name}
        placeholder="Введите имя"
        onChange={handleChangeName}
        name="comment"
        style={{ width: "97%" }}
      />
    </Modal>
  )
}

export default RenameModal