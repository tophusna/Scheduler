const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8002 });

wss.on('connection', async (socket) => {
  socket.on('message', async (message) => {
    try {
      const parsedMessage = JSON.parse(message);

      if (parsedMessage.method === 'subscribe') {
        try {
          const entities = await queryAsync('SELECT * FROM entities');
          const entityParams = await queryAsync('SELECT * FROM entity_params');

          // Create a map for quick lookup based on entity_guid
          const entityParamsMap = entityParams.reduce((map, param) => {
            map[param.entity_guid] = param;
            return map;
          }, {});

          // Combine entities and entity_params based on entity_guid
          const combinedData = entities.map(entity => ({
            ...entity,
            entity_params: entityParamsMap[entity.entity_guid] || null,
          }));

          const response = {
            success: true,
            data: {
              entities: combinedData,
              entityParams: entityParams,
            },
          };

          socket.send(JSON.stringify(response));
        } catch (error) {
          console.error('Error fetching entities or entity_params:', error);
        }
      }
    } catch (error) {
      console.error('Error processing message:', error);
    }
  });

  // ...
});
