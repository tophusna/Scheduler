import React from "react";
import { useSelector } from "react-redux";
import { CaretDownOutlined } from "@ant-design/icons";
import { Tree } from "antd";
import Icon from "../../Icon";
import { DataNode } from "antd/lib/tree";
import { useData } from "./useData";
import { NodeForSelect } from "../types";
import { useDispatch } from "react-redux";
import { topTabActions } from "../../../redux/topTabsSlice";

interface Props {
  selectNode: (node: NodeForSelect) => void;
  treeMode: String;
  selectedNode: NodeForSelect;
}
const HubsTree: React.FC<Props> = ({ selectNode, treeMode, selectedNode }) => {
  const hubs = useSelector((state: any) => state.subsReducer.subs);
  const dispatch = useDispatch();
  const handleNodeSelect = (selected: React.Key[], info: any) => {
    selectNode(
      selected[0]
        ? {
            key: String(selected[0]),
            type: info.node.type,
            children: info.node.children,
          }
        : undefined
    );
    // dispatch(topTabActions.setActiveSubTab(String(selected[0])))
  };

  const handleDoubleClick = ({ key = "", type = "" }) => {
    //#TODO: доделать открытие даблкликом

    switch (type) {
      case "hub":
        dispatch(topTabActions.setActiveTab(key));
        break;
      case "script":
        break;
      case "folder":
        break;
      default:
        break;
    }
  };
  const formated = useData();

  const makeParams = (entity: any) => {
    return entity.map((param: any) => ({
      title: param.name,
      key: param.key,
      type: "param",
      icon: <Icon icon={"param"} />,
    }));
  };
  
  const makeSubscribes = (hub: any) => {
    return hub.map((entity: any) => ({
      title: entity.name,
      key: entity.entityGuid,
      icon: <Icon icon={"json"} />,
      type: "json",
      children: makeParams(entity.children)
    }));
  };


  if (treeMode === "leftSideTree") {

    const treeData = formated;
    return (
      <Tree
        showIcon
        switcherIcon={<CaretDownOutlined />}
        onSelect={handleNodeSelect}
        onDoubleClick={(e) => {
          const target = e.currentTarget.querySelector(".projectTreeTitle");
          handleDoubleClick({
            key: target?.getAttribute("data-key") || "",
            type: target?.getAttribute("data-type") || "",
          });
        }}
        treeData={treeData}
      />
    );
  } else {
    if (selectedNode && selectedNode.children.length) {
      const treeData = hubs
        .filter((item: any) => item.key === selectedNode?.key)[0]
        .subscribes.map((item: any) => ({
          title: (
            <span
              data-key={`${item.key}`}
              data-type="star"
              className="projectTreeTitle"
            >
              {item.name} (ИНТЕРВАЛ: {item.interval}, {item.method})
            </span>
          ),
          key: `${item.key}`,
          icon: <Icon icon="star" />,
          type: "folder",
          children: makeSubscribes(item.childrens),
        }));

      return (
        <Tree
          showIcon
          switcherIcon={<CaretDownOutlined />}
          onSelect={handleNodeSelect}
          onDoubleClick={(e) => {
            const target = e.currentTarget.querySelector(".projectTreeTitle");
            handleDoubleClick({
              key: target?.getAttribute("data-key") || "",
              type: target?.getAttribute("data-type") || "",
            });
          }}
          treeData={treeData}
        />
      );
    } else {
      const treeData: DataNode[] = [];
      return (
        <Tree
          showIcon
          switcherIcon={<CaretDownOutlined />}
          onSelect={handleNodeSelect}
          onDoubleClick={(e) => {
            const target = e.currentTarget.querySelector(".projectTreeTitle");
            handleDoubleClick({
              key: target?.getAttribute("data-key") || "",
              type: target?.getAttribute("data-type") || "",
            });
          }}
          treeData={treeData}
        />
      );
    }
  }
};

export default HubsTree;
