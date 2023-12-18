import { Button, Modal } from 'antd'
import { getHubByKey } from '../../../redux/subsSlice/selectors/getHubByKey'
import { useDispatch, useSelector } from 'react-redux'
import { subsActions } from '../../../redux/subsSlice'
import { topTabActions } from '../../../redux/topTabsSlice';
import { getActiveTabId } from "../../../redux/topTabsSlice/selectors/getActiveTabId";

type Props = {
  onClose: () => void
  selectedObjType?: string
  selectedObjectKey?: string
}

const RemoveModal = ({ onClose, selectedObjType, selectedObjectKey }: Props) => {
  const hubKey = selectedObjectKey?.split('_')[0] || '';
  const subKey = selectedObjectKey || '';
  const hub = useSelector(getHubByKey(hubKey));
  const dispatch = useDispatch();
  const activeHubKey = useSelector(getActiveTabId);

  const isHub = selectedObjType === 'hub'
  const isScript = selectedObjType === 'script'
  const title = !isHub ? "скрипт" : "хаб"
  const isSubscribe = selectedObjType === 'subscribe'

  // const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setName(e.target.value)
  // }

  // const handleRenameItem = () => {
  //   if (isHub) {
  //     dispatch(subsActions.renameHub({ hubId: hubKey, name } as any))
  //   } else if(isScript){
  //     dispatch(subsActions.renameScript({ hubKey, scriptKey: selectedObjectKey, fileTitle: name } as any))
  //   } else {
  //     dispatch(subsActions.renameSubscribe({ subscribeKey: selectedObjectKey, name: name } as any))
  //     dispatch(topTabActions.changeSubscribesTab({ subId: '', subName: name, oldName: initialName }))
  //   }
  //   onClose()
  // }

  const handleRemoveItem = () => {
    if (isHub) {
      hubKey && dispatch(subsActions.removeHub({ hubKey }));
    } else if(isScript) {
      (hubKey && selectedObjectKey) && dispatch(subsActions.removeScript({ hubKey, scriptKey: selectedObjectKey }))
    } else {
      dispatch(topTabActions.removeSubTab({id: subKey, subName: ''}))
      dispatch(subsActions.removeSubscribe({subKey: subKey, activeHub: activeHubKey, subName: ''}))
    }
    onClose()
  }

  return (
    <Modal
      open={true}
      // title={`Удалить ${title}: ${hub.title}`}
      title='Are you sure you want to delete it?'
      onCancel={onClose}
      footer={() => <Button onClick={handleRemoveItem}>Удалить</Button>}
    />
  )
}

export default RemoveModal