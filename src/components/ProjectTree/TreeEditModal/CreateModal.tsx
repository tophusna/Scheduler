import { Button, Modal } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { subsActions } from '../../../redux/subsSlice'
import { topTabActions } from '../../../redux/topTabsSlice'
import uuid from 'react-uuid';

type Props = {
  onClose: () => void
  selectedObjType?: string
  selectedObjectKey?: string
}

const CreateModal = ({ onClose, selectedObjType, selectedObjectKey }: Props) => {

  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const isHub = selectedObjType === 'hub'
  const title = isHub ? "скрипт" : "хаб"

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleCreateItem = () => {
    if (!isHub) {
      const key = uuid();
      dispatch(subsActions.createHub({ name, key }));
      dispatch(topTabActions.createTab({ id: key, name }));
    } else {
      selectedObjectKey && dispatch(subsActions.createScript({ name, hubKey: selectedObjectKey }))
    }
    onClose()
  }

  return (
    <Modal
      open={true}
      title={`Добавить ${title}`}
      onCancel={onClose}
      footer={() => <Button onClick={handleCreateItem}>Добавить</Button>}
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

export default CreateModal