import { UserDTO } from '@/services/types/apiTypes';
import { AxiosInstance } from 'axios';

export class UserService {
  private apiClient: AxiosInstance;
  constructor(apiClient: AxiosInstance) {
    this.apiClient = apiClient;
  }

  public getMe = async (): Promise<UserDTO> => {
    const { data } = await this.apiClient.get('/user/me');
    return data;
  };

  public getUser = async (params: { id?: string; email?: string }): Promise<UserDTO> => {
    const { data } = await this.apiClient.get('/user', { params });
    return data;
  };
}
