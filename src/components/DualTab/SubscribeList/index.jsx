import React from 'react'
import { useSelector } from "react-redux";

function SubscribeList({ isSubscribed, name, activeEntityGuid, setActiveEntityGuid }) {

  const subs = useSelector((state) => state.subsReducer);
  const parent_id = subs.activeTab.split('-')[0] ?? '';

  const ents = subs.subs[parent_id].entities;
  const enti = Object.values(ents);


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
            onClick={() => { setActiveEntityGuid(entity.entityGuid) }}
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