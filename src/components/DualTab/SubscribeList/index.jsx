import {React, useEffect, useState} from 'react'
import { useSelector } from "react-redux";
import { getActiveTab } from "../../../redux/topTabsSlice/selectors/getActiveTab";
import { getHubByKey } from "../../../redux/subsSlice/selectors/getHubByKey"

function SubscribeList({ isSubscribed, name, activeEntityGuid, setActiveEntityGuid, subEntities, active, setActive }) {

  const subs = useSelector((state) => state.subsReducer);

  // const parent_id = subs.activeTab.split('-')[0] ?? '';

  const activeTab = useSelector(getActiveTab);
  const activeHub = useSelector(getHubByKey(activeTab?.id))

  
  // const ents = subs.subs[parent_id]?.entities;

  const ents = activeHub?.entities;
  const enti = Object.values(ents);

  // const [entities, setEntities] = useState([])
  
  // useEffect(() => {
  //   setEntity()
  // }, [])

  if(active === true) {
    for(let i = 0; i < enti.length; i++) {
      for(let j = 0; j < subEntities.length; j++) {
        if (enti[i].name === subEntities[j].name) 
          enti[i] = {...enti[i], isSubscribed: true}
      }
    }
  }

  // const setEntity = () => {
  //   setEntities(enti.filter(entity => {
  //     if (isSubscribed) {
  //       return entity.isSubscribed
  //     }
  //     return !entity.isSubscribed
  //   }))
  // }

  const entities = enti.filter(entity => {
        if (isSubscribed) {
          return entity.isSubscribed
        }
        return !entity.isSubscribed
      })
      
  return (
    <>
      <label>{name}</label>
      <select multiple id="available" size="4">
        {entities.map((entity) => (

          <option
            key={entity}
            onClick={() => { setActive(false); setActiveEntityGuid(entity.entityGuid); }}
            className={entity.entityGuid === activeEntityGuid ? 'selected' : ''}
          >
            {entity.name}
          </option>
        ))}
      </select>
    </>
  )
}

export default SubscribeList