import { useSelector } from "react-redux";
import { getEntitiesById } from '../../redux/subsSlice/selectors/getEntitiesById';
import { getActiveTab } from '../../redux/topTabsSlice/selectors/getActiveTab';

const GroupsComponent = () => {

  const { id } = useSelector(getActiveTab)
  const avaibleEntities = useSelector(getEntitiesById(id))
  return (
    <select id="groups" multiple>
      {avaibleEntities.map(({ entityGuid, name }) => (
        <option value={entityGuid} key={entityGuid}>{name}</option>
      ))}
    </select>
  );
}



export default GroupsComponent