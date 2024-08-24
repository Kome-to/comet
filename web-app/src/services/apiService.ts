import ApiClient from './apiClient';
import { UserService } from './controllers/user/UserService';

class ApiService {
  public user: UserService;

  constructor() {
    this.user = new UserService(ApiClient);
  }
}

const api = new ApiService();
export default api;
