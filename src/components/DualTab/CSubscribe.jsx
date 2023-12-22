import {
  CaretRightOutlined,
  CaretLeftOutlined,
  ForwardOutlined,
  BackwardOutlined,
} from "@ant-design/icons";
import SubscribeList from "./SubscribeList";
import { useState, useEffect } from "react";
import { subsActions } from "../../redux/subsSlice";
import { useDispatch, useSelector } from "react-redux";
import { topTabActions } from "../../redux/topTabsSlice";
import { subsSlice } from "../../redux/subsSlice";
import { getActiveTab } from "../../redux/topTabsSlice/selectors/getActiveTab"
import { getActiveTabId } from "../../redux/topTabsSlice/selectors/getActiveTabId";
import { getActiveSubTabId } from "../../redux/subsSlice/selectors/getActiveSubTabId";
import { getActiveSubTab } from "../../redux/topTabsSlice/selectors/getActiveSubTab";
import { getScribeByKey } from "../../redux/subsSlice/selectors/getScribeByKey"
import TreeEditModal from "../ProjectTree/TreeEditModal";
import uuid from 'react-uuid';

// Utility function to debounce any function
const debounce = (func, delay) => {
  let inDebounce;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(context, args), delay);
  };
};

export default function CSubscribe({active, setActive}) {
  const activeTab = useSelector(getActiveTab)
  const activeSubTabId = activeTab?.activeTab
  const activeSub = useSelector(getScribeByKey(activeTab?.activeTab))
  
  const [interval, setInterval] = useState(activeSub?.interval || 0)
  const [subName, setSubName] = useState(activeSub?.name)
  const [method, setMethod] = useState(activeSub?.method || 'Изменения')
  const [modalMode, setModalMode] = useState("");
  const dispatch = useDispatch();
  const activeHub = useSelector(getActiveTabId);
  const activeSubTab = useSelector(getActiveSubTab);
  
  const [activeEntityGuid, setActiveEntityGuid] = useState("");
  const activeHubKey = useSelector(getActiveTabId);

  useEffect(() => {
    setActive(true)
  }, [])


  const handleSubscribe = (subscribe, subName) => {
    setActive(false)
    dispatch(
      subsActions.changeSubscribe({
        activeHub,
        entityGuid: activeEntityGuid,
        isSubscribed: subscribe,
      })
    );
    
  };
  const handleSubscribeAll = (subscribe) => {
    dispatch(
      subsActions.changeSubscribes({
        activeHub,
        subscribeAll: subscribe,
      })
    );
  };

  const closeModal = () => {
    setModalMode("");
  };

  const onCancelClick = () => {
    setModalMode("delete")
    // dispatch(topTabActions.removeSubTab({id: activeSubTabId, subName: ''}));
    // dispatch(subsActions.removeSubscribe({subKey: activeSubTabId, activeHub: activeHubKey, subName: ''}))
  }
  
  const onSaveClick = () => {
    
    dispatch(subsActions.saveSubscribe({
        activeHub,
        entityGuid: activeEntityGuid,
        subName: subName,
        subKey: activeSubTabId,
        oldName: activeSubTab.title,
        method: method,
        interval: interval
      })
    );
        
    dispatch(topTabActions.changeSubscribesTab({ subId: activeSubTabId, subName }))
  }

  const onNameChang = (e) => {
    setSubName(e.target.value);
  }

  const onIntervalChange = (e) => {
    setInterval(e.target.value)
  }

  const onMethodChange = e => {
    setMethod(e.target.value)
  }

  return (
    <div className="subsaval">
      {/* ... (Rest of the code is the same as in the previous response) */}
      <div className="part">
        <div className="subbar">
          <div className="tpart">
            <label>Интервал</label>
            <input type="number" class="number" onChange={onIntervalChange} value={interval} />
          </div>
          <div className="tpart">
            <label>ПОДПИСАТЬСЯ ИМЯ</label>
            <input type="text" class="number" onChange={onNameChang} value={subName} autoFocus />
          </div>
        </div>
        <form>
        <part>
          <div className="col2">
            <input type="radio" id='option1' name="radiogroup" class="rswitch" value='Изменения' onChange={onMethodChange} checked={method === 'Изменения' ? true : false} />
            <label for='option1'>Изменения</label>
          </div>
          <div></div>
        </part>
        <part>
          <div className="col2">
            <input type="radio" id='option2' name="radiogroup" class="rswitch" value='История' onChange={onMethodChange} checked={method === 'История' ? true : false}/>
            <label for='option2'>История</label>
          </div>
          <div className="col2"></div>
        </part>
        </form>
        
        <div className="col-3">
          <SubscribeList
            isSubscribed={false}
            name={"Доступные"}
            subEntities={activeSub?.childrens}
            activeEntityGuid={activeEntityGuid}
            setActiveEntityGuid={setActiveEntityGuid}
            active={active}
            setActive={setActive}
          />
        </div>
        <div className="col-3">
          <button class="tool">
            <CaretRightOutlined onClick={() => handleSubscribe(true, subName, activeSubTabId)} />
          </button>
          <button class="tool">
            <CaretLeftOutlined onClick={() => handleSubscribe(false, subName, activeSubTabId)} />
          </button>
          <button class="tool">
            <ForwardOutlined onClick={() => handleSubscribeAll(true)} />
          </button>
          <button class="tool">
            <BackwardOutlined onClick={() => handleSubscribeAll(false)} />
          </button>
        </div>
        <div className="col-3">
          <SubscribeList
            isSubscribed={true}
            name={"Мои подписки"}
            subEntities={activeSub?.childrens.filter(child => child.isSubscribed)}
            // activeEntityGuid={activeEntityGuid}
            setActiveEntityGuid={setActiveEntityGuid}
            active={active}
            setActive={setActive}
          />
        </div>
        
      </div>
      {active === true && <div className="part">
        <div className="subbar">
          <div className="tpart">
        Нажатие на объект возвращает к первоначальным настройкам.
      </div></div></div>}
      
      <div className="panel">
        <button onClick={onCancelClick}>
          отмена
        </button>
        <button onClick={onSaveClick}>
          Сохранить
        </button>
      </div>
      <TreeEditModal
        method={modalMode}
        onClose={closeModal}
        selectedObjType='subscribe'
        selectedObjectKey={activeSubTabId}
      />
    </div>
  );
}

