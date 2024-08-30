export interface WorkspaceAttributes {
  id: string;
  name: string;
  userId: string;
}

export type WorkspaceCreation = Omit<WorkspaceAttributes, 'id'>;

export interface WorkspaceCreateParams {
  name: string;

  members: string[];

  channel: {
    name: string;
    publicKey: string;
    ePrivateKey: string;
  };
}
