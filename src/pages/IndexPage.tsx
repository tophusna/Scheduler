import {useState} from "react"
import HubControls from '../components/HubControls'
import TopMenu from '../components/TopMenu'
import FileList from '../components/FileList'
import ProjectTree from '../components/ProjectTree'
import {NodeForSelect} from '../components/ProjectTree/types'

const IndexPage = () => {
  const [selectedNode, setSelectedNode] = useState<NodeForSelect>()
  return (
    <>
      <TopMenu />
      <HubControls selectedNode={selectedNode} setSelectedNode={setSelectedNode} />
      <FileList />
      <ProjectTree selectedNode={selectedNode} setSelectedNode={setSelectedNode}/>
    </>
  )
}

export default IndexPage