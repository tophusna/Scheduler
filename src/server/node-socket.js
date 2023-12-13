const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8002 });

server.on('connection', (socket) => {
  console.log('socket server on!!!');

  socket.on('message', (message) => {
    try {
      const parsedMessage = JSON.parse(message);

      if (parsedMessage.method === 'subscribe') {
        // Assuming you have a function to fetch entities from the database
        const entities = getEntitiesFromDatabase();

        const response = {
          success: true,
          data: {
            message: entities
          }
        };

        socket.send(JSON.stringify(response));
      }
    } catch (error) {
      console.error('Error processing message:', error);
    }
  });

  socket.on('close', (code, reason) => {
  });

  socket.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

function getEntitiesFromDatabase() {
  // Implement your logic to retrieve entities from the database here
  // Return an array of entities
  return [
    {
      entityGuid: '66d95c21-42c4-4491-80b7-e6c6c396144a',
      name: 'Entity 1',
      description: 'Description of Entity 1'
    },
    {
      entityGuid: '677dd6ac-1079-4822-872a-d1019ea7b8c1',
      name: 'Entity 2',
      description: 'Description of Entity 2'
    }
  ];
}

const express = require('express');
const app = express();
const port = 3003;

app.use(express.json());

// Пример эмуляции успешного ответа
const successResponse = {
  success: true,
  status_code: 200,
  message: 'OK. Everything worked as expected.',
};

// Пример эмуляции ошибки
const errorResponse = (statusCode, errorMessage) => ({
  success: false,
  status_code: statusCode,
  message: 'Bad request.',
  data: { message: errorMessage },
});

app.post('/test', (req, res) => {
  res.send('POST request to the homepage')
})

// Обработчик POST-запроса для метода add_entity
app.post('/add_entity', (req, res) => {
  const { name, key, params, parentGuid, comment } = req.body;

  if (!name || !key || !params) {
    // Эмуляция ошибки, если не все обязательные параметры предоставлены
    res.status(400).json(errorResponse(400, 'Необходимо указать все обязательные параметры.'));
  } else {
    // Эмуляция успешного ответа
    const entityGuid = '02671531-8707-4013-8fac-1fb3a95bb0c7';
    res.json({
      ...successResponse,
      data: { message: 'Объект успешно добавлен!', entityGuid },
    });
  }
});

// Обработчик POST-запроса для метода set_entity_params
app.post('set_entity_params', (req, res) => {
  const { entityGuid, key, params } = req.body;

  if (!entityGuid || !key || !params) {
    res.status(400).json(errorResponse(400, 'Необходимо указать все обязательные параметры.'));
  } else {
    // Эмуляция успешного ответа
    res.json({
      ...successResponse,
      data: { message: 'Изменения сохранены!', entityId: 53 },
    });
  }
});

// Обработчик POST-запроса для метода get_entities
app.post('get_entities', (req, res) => {
  const { key, parentGuid, limit, offset, search } = req.body;

  if (!key) {
    res.status(400).json(errorResponse(400, 'Ключ подписчика (key) не может быть пустым.'));
  } else {
    // Эмуляция успешного ответа
    const entities = [
      { entityGuid: '66d95c21-42c4-4491-80b7-e6c6c396144a', name: 'child_20230515_4', description: 'adding entity from python', childrens: false, params: true },
      { entityGuid: '677dd6ac-1079-4822-872a-d1019ea7b8c1', name: 'child_20230515_5', description: 'adding entity from python', childrens: false, params: false },
    ];
    res.json({
      ...successResponse,
      data: { message: entities, total: entities.length },
    });
  }
});

// Обработчик POST-запроса для метода get_entity
app.post('get_entity', (req, res) => {
  const { key, entityGuid } = req.body;

  if (!key || !entityGuid) {
    res.status(400).json(errorResponse(400, 'Ключ подписчика (key) и GUID объекта (entityGuid) не могут быть пустыми.'));
  } else {
    // Эмуляция успешного ответа
    const entityData = [{ id: 37, entityGuid: '1c1a4af6-e6ac-4f7b-986e-37be0bc100ab', name: 'param_parent', comment: 'test param one', val: null, updateSubscriberId: 1, active: 1, paramId: 0, createdAt: '2023-05-15T10:19:29.000Z', updatedAt: '2023-05-15T10:19:29.000Z' }];
    res.json({
      ...successResponse,
      data: { message: entityData },
    });
  }
});

// Обработчик POST-запроса для метода change_entity
app.post('change_entity', (req, res) => {
  const { key, entityGuid, name, comment, parentGuid, params } = req.body;

  if (!key || !entityGuid) {
    res.status(400).json(errorResponse(400, 'Ключ подписчика (key) и GUID объекта (entityGuid) не могут быть пустыми.'));
  } else {
    // Эмуляция успешного ответа
    res.json({
      ...successResponse,
      data: { message: 'Изменения сохранены!', entityGuid: '69717433-160d-4e59-9476-62e8bc0913c4' },
    });
  }
});

// Обработчик POST-запроса для метода get_alarms
app.post('get_alarms', (req, res) => {
  const { key } = req.body;

  if (!key) {
    res.status(400).json(errorResponse(400, 'Ключ подписчика (key) не может быть пустым.'));
  } else {
    // Эмуляция успешного ответа
    const alarms = [
      { id: 1, subscriberId: 1, createdAt: '2022-10-04T22:43:53.000Z', updatedAt: '2022-10-04T22:43:53.000Z' },
      // Добавьте здесь ещё элементы, если необходимо
    ];
    res.json({
      ...successResponse,
      data: { message: alarms },
    });
  }
});

// Обработчик POST-запроса для метода subscribers_ping
app.post('subscribers_ping', (req, res) => {
  const { key, entityGuid } = req.body;

  if (!key || !entityGuid) {
    res.status(400).json(errorResponse(400, 'Ключ подписчика (key) и GUID объекта (entityGuid) не могут быть пустыми.'));
  } else {
    // Эмуляция успешного ответа
    res.json({
      ...successResponse,
      data: { message: 'Статус подписчиков обновлён!' },
    });
  }
});



app.listen(port, () => {
});
