import {
  CaretRightOutlined,
  CaretLeftOutlined,
  ForwardOutlined,
  BackwardOutlined,
} from "@ant-design/icons";
import SubscribeList from "./SubscribeList";
import { useState } from "react";
import { subsActions } from "../../redux/subsSlice";
import { useDispatch, useSelector } from "react-redux";
import { topTabActions } from "../../redux/topTabsSlice";
import { getActiveTabId } from "../../redux/topTabsSlice/selectors/getActiveTabId";
import { getActiveSubTabId } from "../../redux/subsSlice/selectors/getActiveSubTabId";
import { getActiveSubTab } from "../../redux/topTabsSlice/selectors/getActiveSubTab";
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

export default function CSubscribe() {
  const [subName, setSubName] = useState('New Subscribe')
  const [interval, setInterval] = useState('')
  const [method, setMethod] = useState('')
  const dispatch = useDispatch();
  const activeHub = useSelector(getActiveTabId);
  const activeSubTab = useSelector(getActiveSubTab);
  const activeSubTabId = useSelector(getActiveSubTabId);
  const [activeEntityGuid, setActiveEntityGuid] = useState("");

  const handleSubscribe = (subscribe, subName) => {
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

  // Debounced function
  const updateSubName = debounce((newValue) => {
    setSubName(newValue);
  }, 1000); // Delay in ms

  const onCancelClick = () => {

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
    updateSubName(e.target.value);
  }

  const onIntervalChange = (e) => {
    setInterval(e.target.value)
  }

  const onMethodChange = e => {
    setMethod(e.target.name)
  }

  return (
    <div className="subsaval">
      {/* ... (Rest of the code is the same as in the previous response) */}
      <div className="part">
        <div className="subbar">
          <div className="tpart">
            <label>Интервал</label>
            <input type="number" class="number" onChange={onIntervalChange}/>
          </div>
          <div className="tpart">
            <label>ПОДПИСАТЬСЯ ИМЯ</label>
            <input type="text" class="number" onChange={(e) => onNameChang(e)} />
          </div>
        </div>
        <part>
          <div className="col2">
            <input type="radio" name="Изменения" class="rswitch" onChange={onMethodChange}/>
            <label>Изменения</label>
          </div>
          <div></div>
        </part>
        <part>
          <div className="col2">
            <input type="radio" name="История" class="rswitch" onChange={onMethodChange}/>
            <label>История</label>
          </div>
          <div className="col2"></div>
        </part>
        <div className="col-3">
          <SubscribeList
            isSubscribed={false}
            name={"Доступные"}
            activeEntityGuid={activeEntityGuid}
            setActiveEntityGuid={setActiveEntityGuid}
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
            // activeEntityGuid={activeEntityGuid}
            setActiveEntityGuid={setActiveEntityGuid}
          />
        </div>
      </div>
        <div className="panel">
          <button onClick={onCancelClick}>
            отмена
          </button>
          <button onClick={onSaveClick}>
            Сохранить
          </button>
        </div>
    </div>
  );
}

