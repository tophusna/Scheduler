import {
  Close,
} from "../../../SVG";

function Header(props) {
  const onCloseClick = () => {
    props.setClose(true)
  }
  // Логика компонента
  return (
    <hd>
      {/* Отображение разметки компонента */}
      {props.children}
      <div className="close" onClick={onCloseClick}>
        <img src={Close} alt="close" />
      </div>
    </hd>
  );
}

export default Header