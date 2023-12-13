import { useDispatch, useSelector } from 'react-redux'
import { topTabActions } from '../../redux/topTabsSlice/index'
import { TAB_TYPES } from '../../redux/topTabsSlice/initialState'
import { Close, Hub } from '../../assets/icons'
import { getHubByKey } from '../../redux/subsSlice/selectors/getHubByKey'
import { getTabById } from '../../redux/topTabsSlice/selectors/getTabById'
import { getActiveTabId } from '../../redux/topTabsSlice/selectors/getActiveTabId'

const TopTab = ({ id }) => {
  const dispatch = useDispatch();
  const currentTab = useSelector(getTabById(id))
  const activeTabId = useSelector(getActiveTabId);
  const hub = useSelector(getHubByKey(id))

  const title = currentTab.type === TAB_TYPES.codeEditor ? currentTab.title : hub.title

  const handleSetActiveTab = () => {
    dispatch(topTabActions.setActiveTab(id))
  }

  const handleCloseTab = () => {
    dispatch(topTabActions.removeTopTab(id))
  }

  const className = (id === activeTabId) && 'active'

  return (
    <div className={className + ' tab'} >
      <span style={{ width: "100%" }} onClick={handleSetActiveTab}>
        <img alt="hub" src={Hub} />
        {title}
      </span>
      <CloseIcon onClose={handleCloseTab} />
    </div>
  )
}

const CloseIcon = ({ onClose }) => {
  return <img alt="" src={Close} className='WClose' onClick={onClose} />
}

export default TopTab