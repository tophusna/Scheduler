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

  const options = ["Option 1", "Option 2", "Option 3"];
  const [selectedEntities, setSelectedEntities] = useState([]);

  const handleSelectChange = (event) => {
    const selected = Array.from(event.target.selectedOptions, option => option.value);
    setActiveEntityGuid(selected);
  };

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
      <select multiple id="available" size="4" value={activeEntityGuid} onChange={ handleSelectChange } >
        {/* {entities.map((entity) => (

          <option
            key={entity}
            // onClick={() => { setActive(false); setActiveEntityGuid(entity.entityGuid); }}
            className={entity.entityGuid === activeEntityGuid ? 'selected' : ''}
          >
            {entity.name}
          </option>
        ))} */}
        {entities.map((entity, index) => (
          <option key={entity} value={entity.entityGuid}>{entity.name}</option>
          // <option key={index} value={entity}>{entity.name}</option>
        ))}
      </select>
      {/* <p>Selected entities: {entities.join(', ')}</p> */}
    </>
  )
}

export default SubscribeList