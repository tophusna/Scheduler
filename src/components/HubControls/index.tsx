import { useState } from "react";
import TopTabs from "../TopTabs";
import SubTabs from "../SubTabs";
import DualTab from "../DualTab";
import Header from "../Header";
import { NodeForSelect } from "../ProjectTree/types";

type Props = {
  selectedNode: NodeForSelect
  setSelectedNode: React.Dispatch<React.SetStateAction<NodeForSelect>>
}

function HubControls({selectedNode, setSelectedNode}: Props) {
  const [isClose, setClose] = useState(false)

  return (
    <>
      {!isClose && <div className="hubopts window">
        <TopTabs />
        <Header setClose={setClose}>Сессии</Header>
        <SubTabs />
        <DualTab selectedNode={selectedNode} setSelectedNode={setSelectedNode}/>
      </div>}
    </>
  );
}

export default HubControls;
