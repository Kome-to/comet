import { AxiosInstance } from 'axios';
import { SignInParams, SignUpParams } from '../../types/common';

export class UserService {
  private apiClient: AxiosInstance;
  constructor(apiClient: AxiosInstance) {
    this.apiClient = apiClient;
  }

  public signUp = async (params: SignUpParams) => {
    const { data } = await this.apiClient.post('/auth/sign-up', params);
    return data;
  };

  public login = async (params: SignInParams) => {
    const { data } = await this.apiClient.post('/auth/sign-in', params);
    return data;
  };
}
