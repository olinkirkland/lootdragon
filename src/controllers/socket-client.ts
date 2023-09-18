import { BASE_URL, fetchGame } from './connection';

const socketUrl = BASE_URL.replace('http', 'ws').replace('3005', '3006');
let ws: WebSocket;

export function connectToWebSocket(options: any) {
  // Event listener for when the WebSocket connection is established
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
  console.log('Message received from server', event.data);
  const data = JSON.parse(event.data);
  if (data.command === 'refresh') fetchGame(data.gameId);
}

function onConnectionError(event: any) {
  console.log('Connection error', event);
}
