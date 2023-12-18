// TreeComponent.js

import React, { useEffect } from 'react';
import { Tree } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { loadEntities, loadEntityParams } from './actions';

const { TreeNode } = Tree;

const TreeComponent = () => {
  const dispatch = useDispatch();
  const entities = useSelector((state) => state.entities);
  const entityParams = useSelector((state) => state.entityParams);

  useEffect(() => {
    // Подгружаем данные о сущностях (entities) и параметрах (entityParams)
    const entitiesData = /* Ваши данные по сущностям */;
    const entityParamsData = /* Ваши данные по параметрам сущностей */;

    // Вызываем действия для загрузки данных в Redux store с учетом связи по entity_guid
    const entitiesWithParams = entitiesData.map((entity) => ({
      ...entity,
      params: entityParamsData.filter((param) => param.entity_guid === entity.entity_guid),
    }));

    dispatch(loadEntities(entitiesWithParams));
    dispatch(loadEntityParams(entityParamsData));
  }, [dispatch]);

  const renderTreeNodes = (data) =>
    data.map((item) => {
      if (item.params && item.params.length > 0) {
        return (
          <TreeNode title={item.name} key={item.entity_guid}>
            {renderTreeNodes(item.params)}
          </TreeNode>
        );
      }
      return <TreeNode title={item.name} key={item.entity_guid} />;
    });

  return (
    <Tree showLine>
      {renderTreeNodes(entities)}
    </Tree>
  );
};

export default TreeComponent;
