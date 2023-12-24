/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import { Button, Modal } from "antd";
import Logo from "../Logo";
import store, { useAppDispatch } from "../../redux/store";
import {importStateFromJson} from '../../redux/rootActions';
import axios from "axios";

function TopMenu() {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState("");
  const onAddClick = () => {
    setOpen(false);
    dispatch(importStateFromJson(file))
  };


  const handleChange = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      setFile(e.target.result);
    };
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const onExportClick = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(store.getState(1))
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "Project_name.json";

    link.click();
  };

  const onSaveSubsClick = () => {
    axios.post("http://localhost:3001/saveFile", {
       filepath: 'sadf', fileName: 'sdf', hub: 'sdf' }
    )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
    // const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
    //   JSON.stringify(store.getState(1))
    // )}`;
    // const link = document.createElement("a");
    // link.href = jsonString;
    // link.download = "Project_name.json";

    // link.click();
  };

  const onImportClick = () => {
    setOpen(true)
  };

  const onNewClick = (e) => {
    dispatch({
      type: 'importStore'
    })
    setOpen(false);
  };

  return (
    <div className="TopMenu">
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
      <nav>
        <Logo />
        <ul>
          <li>
            <a href="#">Проект</a>
            <ul className="sub">
              <li onClick={onNewClick}>Новый</li>
              <li onClick={onImportClick}>Импорт</li>
              <li onClick={onExportClick}>Экспорт</li>
              <li onClick={onSaveSubsClick}><a href="/">SAVE SUBS</a></li>
              <li>Закрыть</li>
            </ul>
          </li>
          <li>
            <a href="#">Настройки</a>
            <ul className="sub">
              <li>Проекта</li>
              <li>Сетевые настройки</li>
              <li>Параметры среды</li>
              <li>Глобальные переменные</li>
            </ul>
          </li>
          <li>
            <a href="#">Запуск</a>
            <ul className="sub">
              <li>Выполнить</li>
              <li>Отладка</li>
              <li>Прервать</li>
            </ul>
          </li>

          <li>
            <a href="#">Просмотр</a>
            <ul className="sub">
              <li>
                <a href="/test">test</a>
              </li>             
              <li>Дерево</li>
              <li>Ресурсы</li>
              <li>сессия</li>
            </ul>
          </li>
          <li>
            <a href="#">Поддержка</a>
            <ul className="sub">
              <li>
                <a href="#">Авторизация</a>
              </li>
              <li>
                <a href="#">Документация</a>
              </li>
              <li>
                <a href="#">Голосовая справка</a>
              </li>
              <li>
                <a href="#">Связаться со специалистом</a>
              </li>
              <li>
                <a href="#">О продукте</a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default TopMenu;
