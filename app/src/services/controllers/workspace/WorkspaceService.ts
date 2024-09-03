import { AxiosInstance } from 'axios';

export class WorkspaceService {
  private apiClient: AxiosInstance;
  constructor(apiClient: AxiosInstance) {
    this.apiClient = apiClient;
  }

  public getByUser = async () => {
    const { data } = await this.apiClient.get('/workspace');
    return data;
  };
}
