import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FScript, Folder } from '../../assets/icons';
import { topTabActions } from '../../redux/topTabsSlice';
import Header from '../Header';
import { Tree } from 'antd';
import {
  CaretDownOutlined
} from "@ant-design/icons";

function FileList() {
  const dispatch = useDispatch();
  const [fileList, setFileList] = useState([]);
  const [currentFolder, setCurrentFolder] = useState('');
  const [isClose, setClose] = useState(false)

  useEffect(() => {
    axios
      .get(`http://localhost:3001/projects/?folder`)
      .then((response) => {
        const getObject = (data, prev) => {
          return Object.keys(data).map((item, index) =>
            data[item] === true
              ? {
                key: `${prev}` + '%5C' + `${item}`,
                title: item,
                type: false,
                icon: <img src={FScript} alt="" />,
              }
              : {
                key: `${prev}` + '%5C' + `${item}`,
                title: item,
                type: true,
                icon: <img src={Folder} alt="Folder Icon" class='Folder' />,
                children: getObject(data[item], `${prev}` + '%5C' + `${item}`),
              }
          );
        };

        // Сортировка: сначала папки, затем файлы
        const sortedList = getObject(response.data, "")
          .slice()
          .sort((a, b) => {
            if (a.type && !b.type) return -1;
            if (!a.type && b.isDirectory) return 1;
            return 0;
          });

        setFileList(sortedList);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const loadFilesForFolder = (filePath, fileTitle) => {

    dispatch(topTabActions.createCodeTab({
      id: filePath,
      filePath,
      title: fileTitle,
    }))

  };

  const handleFolderClick = (keys, info) => {
    !info.node.children && loadFilesForFolder(info.node.key, info.node.title);
  };

  const onExpand = (keys, info) => {
    setCurrentFolder(currentFolder + '%5C' + info.node.title);
  }

  if (currentFolder) {
    var prevFolder = fileList[0].prevFolder;
    if (prevFolder === ".") {
      prevFolder = "..";
    }
  }
  return (
    <>
      {!isClose && <div className="fileman subsman">
        <Header setClose={setClose} canClose>Ресурсы</Header>
        <Tree
          showIcon
          defaultExpandAll
          onSelect={handleFolderClick}
          onExpand={onExpand}
          switcherIcon={<CaretDownOutlined />}
          treeData={fileList}
        />
      </div>}
    </>
  );
}

export default FileList