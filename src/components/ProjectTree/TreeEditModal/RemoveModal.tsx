import { Button, Modal } from 'antd'
import { getHubByKey } from '../../../redux/subsSlice/selectors/getHubByKey'
import { useDispatch, useSelector } from 'react-redux'
import { subsActions } from '../../../redux/subsSlice'

type Props = {
  onClose: () => void
  selectedObjType?: string
  selectedObjectKey?: string
}

const RemoveModal = ({ onClose, selectedObjType, selectedObjectKey }: Props) => {
  const hubKey = selectedObjectKey?.split('_')[0] || '';
  const hub = useSelector(getHubByKey(hubKey));
  const dispatch = useDispatch();

  const isHub = selectedObjType === 'hub'
  const title = !isHub ? "скрипт" : "хаб"

  const handleRemoveItem = () => {
    if (isHub) {
      hubKey && dispatch(subsActions.removeHub({ hubKey }));
    } else {
      (hubKey && selectedObjectKey) && dispatch(subsActions.removeScript({ hubKey, scriptKey: selectedObjectKey }))
    }
    onClose()
  }

  return (
    <Modal
      open={true}
      title={`Удалить ${title}: ${hub.title}`}
      onCancel={onClose}
      footer={() => <Button onClick={handleRemoveItem}>Удалить</Button>}
    />
  )
}

export default RemoveModal