import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { TAB_TYPES } from '../../redux/topTabsSlice/initialState'
import { topTabActions } from '../../redux/topTabsSlice/index'
import { subsActions } from "../../redux/subsSlice";
import { Close, FScript, Star, Opts } from '../../assets/icons'
import { getActiveTab } from '../../redux/topTabsSlice/selectors/getActiveTab'
import { getActiveSubTabId } from '../../redux/subsSlice/selectors/getActiveSubTabId';
import { getActiveTabId } from "../../redux/topTabsSlice/selectors/getActiveTabId";
import TreeEditModal from "../ProjectTree/TreeEditModal";

import useWsConnection from "../../hooks/useWsConnection";

const SubTab = ({ id, title, type }) => {
  const dispatch = useDispatch();
  const { activeTab } = useSelector(getActiveTab)
  const subKey = useSelector(getActiveSubTabId)
  const activeHubKey = useSelector(getActiveTabId);
  const [modalMode, setModalMode] = useState("");
  
  const { connectToWs, disconnectWs, connected } = useWsConnection();

  const onConnectClick = () => {
    if (!connected) {
      connectToWs();
    } else {
      disconnectWs();
    }
  };

  const handleSetActiveTab = () => {
    id !== activeTab && dispatch(topTabActions.setActiveSubTab(id))
    id === 'settings' && onConnectClick()
  }
  const handleCloseTab = () => {
    // setModalMode("delete")
    dispatch(topTabActions.removeSubTab({id, subName: ''}));
    // dispatch(subsActions.removeSubscribe({subKey: id, activeHub: activeHubKey, subName: ''}))
  }
  const closeModal = () => {
    setModalMode("");
  };
  const className = (id === activeTab) && 'active'
  return (
    <div className={className + ' tab'}>
      <span onClick={handleSetActiveTab}>
        <SubIcon type={type} />
        {title} 
      </span>
      {TAB_TYPES.settings !== type && <CloseIcon onClose={handleCloseTab} />}
      <TreeEditModal
        method={modalMode}
        onClose={closeModal}
        selectedObjType='subscribe'
        selectedObjectKey={id}
      />
    </div>
  )
}

const SubIcon = ({ type }) => {
  switch (type) {
    case TAB_TYPES.codeEditor:
      return <img alt="" src={FScript} />
    case TAB_TYPES.settings:
      return <img alt="" src={Opts} class='Opts' />
    default:
      return <img alt="" src={Star} class='Star' />
  }
}

const CloseIcon = ({ onClose }) => {
  return <img alt="" src={Close} className='WClose' onClick={onClose} />
}

export default SubTab