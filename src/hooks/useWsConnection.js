import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { subsActions } from "../redux/subsSlice";
import { topTabActions } from "../redux/topTabsSlice";
import { getActiveTabId } from "../redux/topTabsSlice/selectors/getActiveTabId";

const useWsConnection = () => {
  const [wsConnection, setWsConnection] = useState(null);
  const [connected, setConnected] = useState(false);
  const [subscriptionType, setSubscriptionType] = useState("interval"); // Изначально устанавливаем тип подписки как "интервал"
  const activeHub = useSelector(getActiveTabId)
  const dispatch = useDispatch();

  const connectToWs = () => {
    setWsConnection(new WebSocket('ws://localhost:8002'));
    // setWsConnection(new WebSocket('ws://10.10.20.11/connect'));
  }

  const disconnectWs = () => {
    if (wsConnection) {
      wsConnection.close();
      setConnected(false);
      setWsConnection(null);
    }
  }

  useEffect(() => {
    if (wsConnection) {
      wsConnection.onopen = () => {
        setConnected(true);

        const message = {
          method: 'subscribe',
          entityGuid: '1bd10cfb-0b77-4b6f-aaf8-be5af6542f60',
          key: 'cbAwjTyyUP3W-L3SV0jzYj2_Cwm7wlrx',
        };

        // Определяем тип подписки на основе значения subscriptionType
        if (subscriptionType === "interval") {
          message.interval = 1000; // Замените на желаемый интервал в миллисекундах
        } else if (subscriptionType === "changes") {
          message.method = 'subscribeChanges';
        } else if (subscriptionType === "history") {
          message.method = 'subscribeHistory';
        }

        wsConnection.send(JSON.stringify(message));
      };

      wsConnection.onmessage = (event) => {
        const message = JSON.parse(event.data);

        if (message.success) {
          dispatch(subsActions.addEntites({
            entities: message.data.message,
            activeHub,
          }));
          // dispatch(topTabActions.addSubscribesTab());
        } else {
          console.error('Error:', message.data.message);
        }
      };

      wsConnection.onerror = (error) => {
        console.error('WebSocket error:', error.message);
      };
    }
  }, [dispatch, wsConnection, subscriptionType, activeHub]);

  return {
    connectToWs,
    disconnectWs,
    connected,
    subscriptionType,
    setSubscriptionType, // Добавляем функцию для установки типа подписки
  };
}


export default useWsConnection