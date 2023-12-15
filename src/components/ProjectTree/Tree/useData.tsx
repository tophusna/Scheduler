import { useSelector } from "react-redux";
import Icon from "../../Icon";
import { DataNode } from "antd/es/tree";

interface ExtendedNode extends DataNode {
  type: string
}

export function useData(): DataNode[] {
  const hubs = useSelector((state: any) => state.subsReducer.subs)

  const makeSubscribes = (hub: any) => hub.subscribes.map((subscribe: any) => ({
    title: subscribe.name + '(И: ' + subscribe.interval + ', ' + subscribe.method.slice(0,3) + ')',
    key: subscribe.key,
    icon: <Icon icon='star' />,
    type: 'subscribe',
    children: makeEntities(subscribe.childrens)
  }))

  const makeEntities = (children: any) => children.map((child: any) => ({
    title: child.name,
    key: child.entityGuid,
    icon: <Icon icon={"json"} />,
    type: "json",
  }))

  // const makeSubscribes = (hub: any) => {
  //   const subscribedEntities = Object.values(hub.entities || {}).filter((entity: any) => entity.isSubscribed)
  //   return subscribedEntities.map((entity: any) => ({
  //     title: entity.name,
  //     key: entity.entityGuid,
  //     icon: <Icon icon={'json'} />,
  //     type: 'json'
  //   }))
  // }

  const makeScripts = (hub: any) => hub.scripts.map((script: any) => ({
    title: <span data-key={String(script.key)} data-type='script' className="projectTreeTitle">{script.fileTitle}</span>,
    key: script.key,
    icon: <Icon icon={'script'} />,
    type: 'script'
  }))

  const formated = hubs.map((hub: any) => {
    let hubForTree: ExtendedNode = {
      title: <span data-key={String(hub.key)} data-type={hub.type} className="projectTreeTitle">{hub.title}</span>,
      key: hub.key,
      icon: <Icon icon={hub.type} />,
      type: hub.type,
      children: [],
    }
    
    // const subscribes: ExtendedNode = {
    //   // title: <span data-key={`${hub.key}_subscribes`} data-type='star' className="projectTreeTitle">{hub.subscribes[0] ? hub.subscribes[0].name : `new`}</span>,
    //   title: <span data-key={`${hub.key}_subscribes`} data-type='star' className="projectTreeTitle">ПОДПИСАТЬСЯ</span>,
    //   key: `${hub.key}_subscribes`,
    //   icon: <Icon icon='star' />,
    //   type: 'folder',
    //   children: makeSubscribes(hub)
    // }

    const subscribes = makeSubscribes(hub)
    const scripts = makeScripts(hub)

    hubForTree.children = [...subscribes, ...scripts]
    
    return hubForTree
  })
  
  return formated
}