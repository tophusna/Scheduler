import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Online } from "../../assets/icons";
import ProjectTreeHeader from "../ProjectTree/ProjectTreeHeader";
import SubsTree from "../ProjectTree/Tree";
import { getActiveTab } from "../../redux/topTabsSlice/selectors/getActiveTab";
import { topTabActions } from "../../redux/topTabsSlice";
import { Button, Modal } from "antd";
import useWsConnection from "../../hooks/useWsConnection";
import { subsActions } from "../../redux/subsSlice";
import { getHubSettings } from "../../redux/subsSlice/selectors/getHubSettings";
import { getHubByKey } from "../../redux/subsSlice/selectors/getHubByKey";
import { getActiveTabId } from "../../redux/topTabsSlice/selectors/getActiveTabId";
import uuid from "react-uuid";
import TreeEditModal from "../ProjectTree/TreeEditModal";
import { getScribeByKey } from '../../redux/subsSlice/selectors/getScribeByKey'

const SettingsTab = ({ selectedNode, setSelectedNode, setActive }) => {
  const [selectedSub, setSelectedSub] = useState();
  const dispatch = useDispatch();
  const { id } = useSelector(getActiveTab);
  const { title, key, subscribes } = useSelector(getHubByKey(id));
  const settings = useSelector(getHubSettings(id));
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("add");
  const [localSettings, setLocalSettings] = useState(settings);
  const [localName, setLocalName] = useState(title);
  const activeHubKey = useSelector(getActiveTabId);
  const subscribe = useSelector(getScribeByKey(selectedSub?.key || ''));

  useEffect(() => {
    setLocalName(title);
    setLocalSettings(settings);
    // if (!connected) {
    //   connectToWs();
    // } else {
    //   disconnectWs();
    // }
    // setSelectedNode({key: key, type: 'hub', children: subscribes})
  }, [id, title, settings]);

  const [modalMode, setModalMode] = useState("");
  const { connectToWs, disconnectWs, connected } = useWsConnection();
  

  const isHub = selectedSub?.type === "folder";
  const isScript = selectedSub?.type === "script";
  const buttonRules = {

    add: isHub || selectedNode,
    delete: isHub || isScript,
    edit: isHub || isScript,
  };

  
  const buttonMethods = {
    add: () => {
      const sid = uuid()
      dispatch(topTabActions.addSubscribesTab({ subId: sid, subName: '' }))
      dispatch(topTabActions.setActiveSubTab(sid))
    },
    // delete: () => dispatch(topTabActions.setActiveSubTab(setSelectedNode.key)),
    delete: () => {
      setModalMode("delete")
      // dispatch(subsActions.removeSubscribe({subKey: selectedSub.key, activeHub: activeHubKey, subName: selectedSub.name}))
      // dispatch(topTabActions.removeSubTab({id: '', subName: subscribe.name}));
    },
    // edit: () => setModalMode("edit"),
    edit: () => {
      dispatch(topTabActions.addSubscribesTab({ subId: selectedSub.key, subName: subscribe.name }))
      dispatch(topTabActions.setActiveSubTab(selectedSub?.key))
      
    }
  };

  const selectNode = (node) => {
    setSelectedSub(node);
  };

  

  const setFormField = (event) => {
    const { name, value } = event.target;
    setLocalSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveHubSettings = () => {
    dispatch(
      subsActions.changeHubSettings({
        settings: localSettings,
        hubId: id,
        title: localName,
      })
    );
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const onConnectClick = () => {
    if (!connected) {
      connectToWs();
    } else {
      disconnectWs();
    }
  };

  const closeModal = () => {
    setModalMode("");
    setSelectedSub(undefined);
  };

  // const onImportClick = () => {
  //   setMode("import");
  //   setOpen(true);
  // };

  const onAddClick = (e) => {
    setOpen(false);
    dispatch(topTabActions.addImportedTab(JSON.parse(files))); //dispatch addTopTab action
    dispatch(topTabActions.setActiveTab(JSON.parse(files).key)); //dispatch setActiveTab action
  };

  const [files, setFiles] = useState("");

  const handleChange = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      setFiles(e.target.result);
    };
  };

  const handleRenameHub = (e) => {
    setLocalName(e.target.value);
  };

  return (
    <div className="hubSettings">
      <div className="leftHub">
        <table>
          <tbody>
            <tr>
              <td>Имя хаба</td>
              <td colspan="2" className="tdlong">
                <input
                  value={localName}
                  onChange={handleRenameHub}
                  disabled={connected}
                />
              </td>
            </tr>

            <tr>
              <td>URL</td>
              <td colspan="2" className="tdlong">
                <input
                  value={localSettings["url"]}
                  placeholder=""
                  onChange={setFormField}
                  name="url"
                  disabled={connected}
                />
              </td>
            </tr>
            <tr>
              <td>Порт</td>
              <td colspan="2" className="tdlong">
                <input
                  value={Number(localSettings["port"])}
                  placeholder=""
                  onChange={setFormField}
                  name="port"
                  type="number"
                  disabled={connected}
                />
              </td>
            </tr>
            <tr>
              <td>Комментарий</td>
              <td>
                <input
                  value={localSettings["comment"]}
                  placeholder=""
                  onChange={setFormField}
                  name="comment"
                  disabled={connected}
                />
              </td>
            </tr>
            {/* <tr>
              <td>Тайминг</td>
              <td>
                <input
                  value={localSettings["timing"]}
                  placeholder=""
                  type="number"
                  onChange={setFormField}
                  name="timing"
                  disabled={connected}
                />
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>

      {mode === "import" && (
        <Modal
          open={open}
          title=""
          onCancel={handleCancel}
          footer={(_, { OkBtn, CancelBtn }) => (
            <>
              <Button onClick={onAddClick}>Add</Button>
            </>
          )}
        >
          <h1>Upload Json file</h1>
          <input type="file" onChange={handleChange} />
        </Modal>
      )}
      <div className="rightHub">
        <div className="title">Доступно к подписке</div>
        <ProjectTreeHeader methods={buttonMethods} rules={buttonRules} />
        <SubsTree
          selectNode={selectNode}
          treeMode="rightSideTree"
          selectedNode={selectedNode}
        />
      </div>

      <div className="panel">
        <button onClick={onConnectClick}>
          {!connected ? "Подключится" : "Отключиться"}
        </button>
        <button onClick={saveHubSettings} disabled={connected}>
          Сохранить
        </button>
      </div>
      <div className="statusbar">
        <span className="sb_status">
          {connected && <img src={Online} className="green status" alt="" />}
          {connected ? "Подключено" : "Не подключен"}
        </span>
      </div>

      <TreeEditModal
        method={modalMode}
        onClose={closeModal}
        selectedObjType='subscribe'
        selectedObjectKey={selectedSub?.key}
      />
    </div>
  );
};

export default SettingsTab;
