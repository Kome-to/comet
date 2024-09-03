import axios from 'axios';
import { get } from 'lodash';

import { routes } from '../common/utils/routes';
import { storage } from '../common/utils/storage';

const { VITE_API_ENDPOINT } = import.meta.env;

const ApiClient = axios.create({
  baseURL: VITE_API_ENDPOINT,
  timeout: 15000,
});

ApiClient.interceptors.request.use(
  (config: any) => {
    const authorizationData = storage.getToken();
    if (authorizationData) {
      config.headers.Authorization = `Bearer ${authorizationData}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

ApiClient.interceptors.response.use(
  (response: any) => {
    return response.data;
  },
  (error: any) => {
    const message = get(error, 'response.data.message');

    if (message === 'auth.tokenInvalid') {
      storage.removeToken();
      window.location.pathname = routes.SIGN_IN;
    }

    return Promise.reject(error);
  },
);

export default ApiClient;
