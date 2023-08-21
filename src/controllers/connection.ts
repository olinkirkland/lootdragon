import axios from 'axios';
import StatusCode from 'status-code-enum';

const BASE_URL = 'http://localhost:3005/';

const server = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: true
});

export default server;

console.log('axiosInstance', server);
export async function login(username: string, password: string) {
  console.log('login', username, password);
  try {
    const response = await server.post('login', { username, password });
    console.log('response', response);
  } catch (error) {
    throw error;
  }
}

export async function register(username: string, password: string) {
  console.log('register', username, password);
  try {
    const response = await server.post('register', {
      username,
      password
    });
    if (response.status === StatusCode.SuccessOK) login(username, password);
    else throw response;
  } catch (error) {
    throw error;
  }
}

export async function fetchAccountDetails() {
  try {
    const response = await server.get('account');
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function logout() {
  try {
    const response = await server.post('logout');
    return response.data;
  } catch (error) {
    throw error;
  }
}
