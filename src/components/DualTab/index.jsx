import { useState } from 'react'
import { useSelector } from "react-redux"
import { TAB_TYPES } from "../../redux/topTabsSlice/initialState";
import SettingsTab from './SettingsTab';
import CSubscribe from './CSubscribe';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import { getActiveSubTab } from "../../redux/topTabsSlice/selectors/getActiveSubTab";
import { getActiveTab } from "../../redux/topTabsSlice/selectors/getActiveTab";
import CodeEditor from "../CodeEditor";

const DualTab = ({selectedNode, setSelectedNode}) => {
  const subtab = useSelector(getActiveSubTab);
  const activeTab = useSelector(getActiveTab);
  const [active, setActive] = useState(true);

  if (activeTab.type === TAB_TYPES.codeEditor) {
    return (
      <CodeEditor filePath={activeTab.filePath} />
    )
  }

  if (Object.keys(subtab).length === 0) {
    return null
  }


  switch (subtab.type) {
    case TAB_TYPES.codeEditor:
      return (
        <>
          <CodeMirror
            value={subtab.fileContent}
            height="63vh"
            theme={okaidia}
            extensions={[javascript({ jsx: true })]}
          />
          {subtab.filePath}
        </>
      )
    case TAB_TYPES.settings:
      return <SettingsTab selectedNode={selectedNode} setSelectedNode={setSelectedNode} setActive={setActive} />
    default:
      return <CSubscribe active={active} setActive={setActive} />
  }
}

export default DualTab