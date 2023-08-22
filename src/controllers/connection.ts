import axios, { AxiosError } from 'axios';
import StatusCode from 'status-code-enum';

const BASE_URL = 'http://localhost:3005/';

const server = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: true
});

export default server;

export async function login(
  username: string,
  password: string
): Promise<number | null> {
  try {
    await server.post('login', { username, password });
    return null; // Return null if success
  } catch (error) {
    return (error as AxiosError).response!.status;
  }
}

export async function register(
  username: string,
  password: string
): Promise<number | null> {
  console.log('register', username, password);
  try {
    const response = await server.post('register', {
      username,
      password
    });

    if (response.status === StatusCode.SuccessOK) {
      return await login(username, password);
    } else return response.status;
  } catch (error) {
    return (error as AxiosError).response!.status;
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
