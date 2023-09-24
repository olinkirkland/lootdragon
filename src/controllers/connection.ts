import { useUserStore } from '@/stores/userStore';
import { GameState } from '@/types';
import axios, { AxiosError } from 'axios';
import StatusCode from 'status-code-enum';

export const DEV_BASE_URL = 'http://localhost:3005/';
export const PROD_BASE_URL = 'https://stash-server-production.up.railway.app/';
export const BASE_URL = localStorage.getItem('baseUrl') || PROD_BASE_URL;

const server = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: true
});

export let refreshToken: String | null = localStorage.getItem('refreshToken');
export let accessToken: String | null;

// Add an interceptor to inject the access token to requests
server.interceptors.request.use((config) => {
  if (!accessToken) return config;
  // @ts-ignore
  if (!config) config = {};
  config!.headers!.Authorization = `Bearer ${accessToken}`;
  return config;
});

// Add an interceptor to refresh the access token if it expired
server.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    if (error.response?.status === 403 || error.response?.status === 401) {
      // Ignore for token route
      if (['token', 'login'].includes(error.config.url))
        return Promise.reject(error);
      if (!refreshToken) {
        return Promise.reject(
          error.response?.data?.message || 'No refresh token found'
        );
      }

      if (!(await fetchAccessToken())) {
        return Promise.reject(
          error.response?.data?.message || 'Failed to fetch access token'
        );
      }

      const config = error.config;
      config.headers['Authorization'] = `Bearer ${accessToken}`;
      return server(config);
    }

    return Promise.reject(error);
  }
);

export async function fetchAccessToken(): Promise<boolean> {
  let didFetch = false;

  try {
    console.log('Authenticating ...');
    const response = await server.put('token', {
      refreshToken
    });
    accessToken = response.data.accessToken;
    console.log('Authenticated successfully');
    didFetch = true;
  } catch (error) {
    console.log(
      'Authentication failed; Refresh token is invalid, removing it from the local storage'
    );
    refreshToken = accessToken = null;
    localStorage.removeItem('refreshToken');
    didFetch = false;
  }

  return didFetch;
}

export default server;

export async function login(
  username: string,
  password: string
): Promise<string | null> {
  console.log('login', username, password);
  try {
    const response = await server.post('login', { username, password });
    if (response.status !== StatusCode.SuccessOK)
      return response.data!.toString() || response.status.toString();
    refreshToken = response.data.refreshToken;
    accessToken = response.data.accessToken;
    localStorage.setItem('refreshToken', refreshToken as string);
    const didFetch = await fetchMe();
    if (!didFetch) return 'Failed to fetch user data';
    if (localStorage.getItem('baseUrl') !== PROD_BASE_URL)
      localStorage.setItem('login', JSON.stringify({ username, password }));
    return null; // Return null if success
  } catch (error) {
    const response = (error as AxiosError).response!;
    return response.data!.toString() || response.status.toString();
  }
}

export async function register(
  username: string,
  password: string
): Promise<string | null> {
  console.log('register', username, password);
  try {
    const response = await server.post('register', {
      username,
      password
    });

    if (response.status === StatusCode.SuccessOK) {
      return await login(username, password);
    } else return response.data!.toString() || response.status.toString();
  } catch (error) {
    const errorResponse = (error as AxiosError).response!;
    return errorResponse.data!.toString() || errorResponse.status.toString();
  }
}

export async function logout() {
  console.log('Logout');
  refreshToken = accessToken = null;
  localStorage.removeItem('refreshToken');
  useUserStore().user = null;

  try {
    const response = await server.delete('logout');
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchMe() {
  let didFetch = false;

  console.log('Fetching my user data ...');

  try {
    const response = await server.get('me');
    useUserStore().user = response.data;
    didFetch = true;
  } catch (error) {
    didFetch = false;
  }

  console.log(
    didFetch ? '✔️ User data fetched' : '❌ Failed to fetch user data'
  );
  return didFetch;
}

export async function deleteAccount(password: string) {
  console.log('Delete Account');
  try {
    const response = await server.delete('me', {
      data: {
        password: password
      }
    });
    return response.status === StatusCode.SuccessOK ? null : response.status;
  } catch (error) {
    return (error as AxiosError).response!.status;
  }
}

export async function resetPassword(password: string, newPassword: string) {
  console.log('Reset Password');
  try {
    const response = await server.put('password', {
      password: password,
      newPassword: newPassword
    });
    return response.status === StatusCode.SuccessOK ? null : response.status;
  } catch (error) {
    return (error as AxiosError).response!.status;
  }
}

export async function favoriteItem(id: string) {
  console.log('Favorite Item');
  try {
    const response = await server.put(`favorite/${id}`);
    const newFavorites = response.data;
    useUserStore().user!.favorites = newFavorites;
    return response.status === StatusCode.SuccessOK ? null : response.status;
  } catch (error) {
    return (error as AxiosError).response!.status;
  }
}

export async function clearFavorites() {
  console.log('Clear Favorites');
  try {
    const response = await server.delete(`favorite`);
    const newFavorites = response.data;
    useUserStore().user!.favorites = newFavorites;
    return response.status === StatusCode.SuccessOK ? null : response.status;
  } catch (error) {
    return (error as AxiosError).response!.status;
  }
}

export async function createCollection() {
  console.log('Create Collection');
  try {
    const response = await server.post(`collection`);
    const newCollections = response.data;
    useUserStore().user!.collections = newCollections;
    return response.status === StatusCode.SuccessOK ? null : response.status;
  } catch (error) {
    return (error as AxiosError).response!.status;
  }
}

export async function deleteCollection(id: string) {
  console.log('Delete Collection');
  try {
    const response = await server.delete(`collection/${id}`);
    const newCollections = response.data;
    useUserStore().user!.collections = newCollections;
    return response.status === StatusCode.SuccessOK ? null : response.status;
  } catch (error) {
    return (error as AxiosError).response!.status;
  }
}

export async function cloneCollection(id: string) {
  console.log('Clone Collection');
  try {
    const response = await server.post(`collection/${id}/clone`);
    const newCollections = response.data;
    useUserStore().user!.collections = newCollections;
    return response.status === StatusCode.SuccessOK ? null : response.status;
  } catch (error) {
    return (error as AxiosError).response!.status;
  }
}

export async function addItemToCollection(
  collectionId: string,
  itemId: string
) {
  console.log(`Add Item ${itemId} to Collection ${collectionId}`);
  try {
    const response = await server.post(
      `collection/${collectionId}/item/${itemId}`
    );
    // TODO update collections > collectionId store

    return response.status === StatusCode.SuccessOK ? null : response.status;
  } catch (error) {
    return (error as AxiosError).response!.status;
  }
}

export async function createGame() {
  console.log('Create Game');
  // Try post request to /game
  try {
    const response = await server.post('game');
    return response.status === StatusCode.SuccessOK ? null : response.status;
  } catch (error) {
    return (error as AxiosError).response!.status;
  }
}

export async function deleteGame(id: string) {
  console.log('Delete Game');
  // Try delete request to /game
  try {
    const response = await server.delete(`game/${id}`);
    return response.status === StatusCode.SuccessOK ? null : response.status;
  } catch (error) {
    return (error as AxiosError).response!.status;
  }
}

export async function fetchGame(id: string): Promise<GameState | null> {
  // Try get request to /game
  try {
    const response = await server.get(`game/${id}`);
    if (response.status === StatusCode.SuccessOK) {
      const game = response.data as GameState;
      return game;
    }

    return null;
  } catch (error) {
    return null;
  }
}

// export async function addPlayer(gameId: string) {
//   console.log('Add Player');
//   try {
//     const response = await server.post(`game/${gameId}/player`);
//     return response.status === StatusCode.SuccessOK ? null : response.status;
//   } catch (error) {
//     return (error as AxiosError).response!.status;
//   }
// }
