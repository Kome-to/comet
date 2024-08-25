export interface WorkspaceAttributes {
  id: string;
  name: string;
  userId: string;
}

export type WorkspaceCreation = Omit<WorkspaceAttributes, 'id'>;
