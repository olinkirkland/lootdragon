import { BASE_URL } from './connection';

const socketUrl = BASE_URL.replace('http', 'ws').replace('3005', '3006');
const ws = new WebSocket(socketUrl);

export function connectToWebSocket() {
  // Event listener for when the WebSocket connection is established
  ws.addEventListener('open', onConnectionOpen);
  ws.addEventListener('message', onConnectionMessage);
  ws.addEventListener('error', onConnectionError);
}

function onConnectionOpen() {
  console.log('Connection established');
}

function onConnectionMessage(event: { data: any }) {
  console.log('Message received from server', event.data);
}

function onConnectionError(event: any) {
  console.log('Connection error', event);
}
