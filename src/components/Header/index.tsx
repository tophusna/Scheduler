import { ReactNode } from "react";
import {
  Close,
} from "../../assets/icons";

interface Props {
  setClose: (flag: boolean) => void,
  children: ReactNode
}
const Header: React.FC<Props> = ({ children, setClose }) => {
  const onCloseClick = () => {
    setClose(true)
  }
  // Логика компонента
  return (
    <div className='hd'>
      {/* Отображение разметки компонента */}
      {children}
      <div className="close" onClick={onCloseClick}>
        <img src={Close} alt="close" />
      </div>
    </div>
  );
}

export default Header