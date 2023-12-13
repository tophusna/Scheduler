import { useState } from "react";
import Header from "../Header";
import HubsTree from "./Tree";
import { ButtonMethods, ButtonRules, NodeForSelect } from "./types";
import ProjectTreeHeader from "./ProjectTreeHeader";
import TreeEditModal from "./TreeEditModal";

type Props = {
  selectedNode: NodeForSelect;
  setSelectedNode: React.Dispatch<React.SetStateAction<NodeForSelect>>;
};

const ProjectTree = ({ selectedNode, setSelectedNode }: Props) => {
  const [modalMode, setModalMode] = useState("");
  const closeModal = () => {
    setModalMode("");
    setSelectedNode(undefined);
  };
  const selectNode = (node: NodeForSelect) => {
    if(node?.type === 'hub')
      setSelectedNode(node);
  };

  const isHub = selectedNode?.type === "hub";
  const isScript = selectedNode?.type === "script";

  const buttonRules: ButtonRules = {
    add: isHub || !selectedNode,
    delete: isHub || isScript,
    edit: isHub || isScript,
  };

  const buttonMethods: ButtonMethods = {
    add: () => setModalMode("add"),
    delete: () => setModalMode("delete"),
    edit: () => setModalMode("edit"),
  };

  return (
    <div className="subsman">
      <Header setClose={() => {}}>Дерево</Header>
      <ProjectTreeHeader methods={buttonMethods} rules={buttonRules} />
      <HubsTree
        selectNode={selectNode}
        treeMode="leftSideTree"
        selectedNode={selectedNode}
      />
      <TreeEditModal
        method={modalMode}
        onClose={closeModal}
        selectedObjType={selectedNode?.type}
        selectedObjectKey={selectedNode?.key}
      />
    </div>
  );
};

export default ProjectTree;
