import ApiClient from './apiClient';
import { UserService } from './controllers/user/UserService';
import { WorkspaceService } from './controllers/workspace/WorkspaceService';

class ApiService {
  public user: UserService;
  public workspace: WorkspaceService;

  constructor() {
    this.user = new UserService(ApiClient);
    this.workspace = new WorkspaceService(ApiClient);
  }
}

const api = new ApiService();
export default api;
