import { useSelector } from "react-redux";
import { getTopTabsSelector } from "../../redux/topTabsSlice/selectors/getTopTabsSelector";
import TopTab from "./Tab";

const TopTabs = () => {
  const tabsData = useSelector(getTopTabsSelector);
  if (tabsData.length !== 0)
    return (
      <div className="tabs">
        {tabsData.map((tab) => (
          <TopTab id={tab.id} />
        ))}
      </div>
    );
    return <></>
};
export default TopTabs;
