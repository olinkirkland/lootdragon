import { useGameStore } from '@/stores/gameStore';
import { BASE_URL } from './connection';

const socketUrl = BASE_URL.replace('http', 'ws').replace('3005', '3006');
let ws: WebSocket;

type WebSocketMessage = {
  type: 'refresh' | 'update';
  data?: any;
};

export function connectToWebSocket(options: any) {
  // Event listener for when the WebSocket connection is established
  if (ws) ws.close();

  ws = new WebSocket(socketUrl + '?' + new URLSearchParams(options));
  ws.addEventListener('open', onConnectionOpen);
  ws.addEventListener('message', onConnectionMessage);
  ws.addEventListener('error', onConnectionError);
}

export function disconnectFromWebSocket() {
  ws.removeEventListener('open', onConnectionOpen);
  ws.removeEventListener('message', onConnectionMessage);
  ws.removeEventListener('error', onConnectionError);
  ws.close();
}

function onConnectionOpen() {
  console.log('WebSocket connection established');
}

function onConnectionMessage(event: { data: any }) {
  const message: WebSocketMessage = JSON.parse(event.data);
  console.log('WebSocket message received', message);
  switch (message.type) {
    case 'refresh':
      // fetchGame(message.data);
      break;
    case 'update':
      useGameStore().update(message.data);
      break;
  }
}

function onConnectionError(event: any) {
  console.log('Connection error', event);
}
