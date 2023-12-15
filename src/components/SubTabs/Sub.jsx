import { useDispatch, useSelector } from 'react-redux'
import { TAB_TYPES } from '../../redux/topTabsSlice/initialState'
import { topTabActions } from '../../redux/topTabsSlice/index'
import { Close, FScript, Star, Opts } from '../../assets/icons'
import { getActiveTab } from '../../redux/topTabsSlice/selectors/getActiveTab'

const SubTab = ({ id, title, type }) => {
  const dispatch = useDispatch();
  const { activeTab } = useSelector(getActiveTab)

  const handleSetActiveTab = () => {
    id !== activeTab && dispatch(topTabActions.setActiveSubTab(id))
  }
  const handleCloseTab = () => {
    dispatch(topTabActions.removeSubTab({id, subName: ''}));
  }
  const className = (id === activeTab) && 'active'
  return (
    <div className={className + ' tab'}>
      <span onClick={handleSetActiveTab}>
        <SubIcon type={type} />
        {title} 
      </span>
      {TAB_TYPES.settings !== type && <CloseIcon onClose={handleCloseTab} />}
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