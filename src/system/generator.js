import HubControls from '../components/HubControls';
import TopMenu from '../components/TopMenu';
import Items from '../components/Items';
import FileList from '../components/FileList';

const Component_Warp = () => {
  const method1 = () => { };
  const method2 = () => { };
  const method3 = () => { };

  return { method1, method2, method3 };
};

const cWarp = Component_Warp();

function Component({ child, id, componentName }) {
  // const [components, setComponents] = useState(componentsData);
  if ((componentName !== 'Component') && (typeof componentName != 'undefined')) {
    const Component = getComponent(componentName);
    return <Component warp={cWarp} child={child} id={id} />;
  }
  /*
    return (
      <>
        {components.map((componentData, index) => {
          const Component = getComponent(componentData.name);
  
          return <Component key={index} warp={cWarp} child={child} id={id} className={componentData.name}/>;
        })}
      </>
    );*/
}

function getComponent(name) {
  return Components[name]
}

const Components = {
  CButton,
  CLabel,
  CPanel,
  HubOpts: HubControls,
  TopMenu,
  CItems: Items,
  CFileList: FileList,
  ChildComponent
}

function ChildComponent({ id }) {
  // const { method1, method2, method3 } = warp;

  return (
    <h1>ChildComponent</h1>
  );
}
function CLabel({ id }) {
  // const { method1, method2, method3 } = warp;

  return (
    <span id={id} >Clabel </span>
  );
}

function CButton({ warp, id }) {
  const { method2 } = warp;

  return (
    <button onClick={method2} id={id} className='CButton'>CButton</button>
  );
}

function CPanel(props) {
  const { id } = props

  if (props.child) {
    return (
      <><div className='panel' id={id}>
        <h3>Component with child</h3>
        {props.child}
      </div>
      </>
    )
  }
  else {
    return (
      <><div className='panel' id={id}>
        <h3>Component without child</h3>
      </div>
      </>
    )
  }


}

function ComponentRenderer({ formFile }) {

  function makeComponents(component_arr, parentName = "") {
    const parsedComponents = Object.keys(component_arr).map(key => component_arr[key]);
    const components = [];

    parsedComponents.forEach((instance, index) => {
      //const componentName = `${parentName}.${Object.keys(component_arr)[index]}`;
      const componentName = instance.comp;

      if (instance.child) {
        const childComponents = makeComponents(instance.child, instance.comp);
        components.push(<Component {...cWarp} instance={instance} key={instance.id} id={instance.id} child={childComponents} componentName={componentName} />)
      }
      else {
        components.push(<Component {...cWarp} instance={instance} key={instance.id} id={instance.id} componentName={componentName} />);
      }
    });

    return components;
  }


  const components = makeComponents(formFile)

  return <>{components}</>;
}
export default ComponentRenderer;