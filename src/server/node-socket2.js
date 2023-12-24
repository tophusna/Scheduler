const WebSocket = require('ws');
const express = require('express');
const app = express();
const port = 3003;

const server = new WebSocket.Server({ port: 8002 });

// Sample data from SQL dump
const entities = [
  { entityGuid: '1bd10cfb-0b77-4b6f-aaf8-be5af6542f60', name: 'entity1', children: [], isSubscribed: false },
  // Add other entities here
  { entityGuid: '2bd10cfb-0b77-4b6f-aaf8-be5af6542f60', name: 'entity2', children: [], isSubscribed: false },
  { entityGuid: '3bd10cfb-0b77-4b6f-aaf8-be5af6542f60', name: 'entity3', children: [], isSubscribed: false },
  // Add more entities
];

const entityParams = [
  { entityGuid: '1bd10cfb-0b77-4b6f-aaf8-be5af6542f60', paramId: 1, name: 'param1', value: 'value1', createdAt: '2023-03-09 22:16:56', updatedAt: '2023-04-20 07:48:13', deleted: 0 },
  // Add other entity_params here
  { entityGuid: '1bd10cfb-0b77-4b6f-aaf8-be5af6542f60', paramId: 2, name: 'param2', value: 'value2', createdAt: '2023-03-10 12:30:00', updatedAt: '2023-04-21 09:15:30', deleted: 0 },
  { entityGuid: '2bd10cfb-0b77-4b6f-aaf8-be5af6542f60', paramId: 3, name: 'param3', value: 'value3', createdAt: '2023-03-10 12:30:00', updatedAt: '2023-04-21 09:15:30', deleted: 0 },
  { entityGuid: '3bd10cfb-0b77-4b6f-aaf8-be5af6542f60', paramId: 4, name: 'param4', value: 'value4', createdAt: '2023-03-10 12:30:00', updatedAt: '2023-04-21 09:15:30', deleted: 0 },
  // Add more entity_params
];

// Adding more entities for demonstration
// for (let i = 3; i <= 20; i++) {
//   entities.push({
//     entityGuid: `entity-guid-${i}`,
//     name: `Entity ${i}`,
//     description: `Description of Entity ${i}`,
//     parentId: 1,
//     parentGuid: null,
//     key: '',
//     createdBy: `user-${i}`,
//     createdAt: '2023-03-10 12:30:00',
//     updatedAt: '2023-04-21 09:15:30',
//     deleted: 0,
//   });
// }

// // Adding more entity_params for demonstration
// for (let i = 3; i <= 20; i++) {
//   entityParams.push({
//     entityId: i,
//     paramId: i,
//     key: `param${i}`,
//     value: `value${i}`,
//     createdAt: '2023-03-10 12:30:00',
//     updatedAt: '2023-04-21 09:15:30',
//     deleted: 0,
//   });
// }

server.on('connection', (socket) => {
  socket.on('message', (message) => {
    try {
      const parsedMessage = JSON.parse(message);

      if (parsedMessage.method === 'subscribe') {
        const response = {
          success: true,
          data: {
            message: entities,
            entity_params: entityParams,
          },
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

app.use(express.json());

app.post('/test', (req, res) => {
  res.send('POST request to the homepage');
});

app.post('/add_entity', (req, res) => {
  // Implementation remains unchanged
});

app.post('/set_entity_params', (req, res) => {
  // Implementation remains unchanged
});

app.post('/get_entities', (req, res) => {
  // Implementation remains unchanged
});

app.post('/get_entity', (req, res) => {
  // Implementation remains unchanged
});

app.post('/change_entity', (req, res) => {
  // Implementation remains unchanged
});

app.post('/get_alarms', (req, res) => {
  // Implementation remains unchanged
});

app.post('/subscribers_ping', (req, res) => {
  // Implementation remains unchanged
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
