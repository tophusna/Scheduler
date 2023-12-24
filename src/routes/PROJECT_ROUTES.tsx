import ComponentRenderer from "../system/generator";
import menu from "../assets/json/TopMenu.json";
import IndexPage from "../pages/IndexPage";

interface Routes {
  path: string
  component: JSX.Element
}
const PROJECT_ROUTES: Routes[] = [
  {
    path: "/",
    component: <IndexPage />,
  },
  {
    path: "/test",
    component: <ComponentRenderer formFile={menu} />,

  }
]
export default PROJECT_ROUTES;