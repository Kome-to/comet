import { Request, Response } from 'express';

import WorkspaceRepository from '../repositories/Workspace';
import WorkspaceServices from '../services/Workspace';

import BadRequestError from '../common/errors/types/BadRequestError';
import response from '../common/helpers/response';
import withTransaction from '../common/hooks/withTransaction';
import messages from '../common/messages';

class WorkspaceController extends WorkspaceServices {
  public create = async (req: Request<{}, {}, { name: string }>, res: Response) => {
    const { name } = req.body;

    const existWorkspace = await WorkspaceRepository.getByUser(req.user.id, name);

    if (existWorkspace) {
      throw new BadRequestError(messages.workspace.exist);
    }

    await withTransaction(async (trans) => {
      await this.createWorkspace({ name, userId: req.user.id }, trans);
    });

    return response.success(res);
  };
}

export default new WorkspaceController();
