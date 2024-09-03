import { MemberCreation } from './Member';

export interface WorkspaceAttributes {
  id: string;
  name: string;
  userId: string;
}

export type WorkspaceCreation = Omit<WorkspaceAttributes, 'id'>;

export interface WorkspaceCreateParams {
  id?: string;
  name: string;

  members: MemberCreation[];

  channel: {
    name: string;
    isPrivate: boolean;
    publicKey: string;
    ePrivateKey: string;
  };
}
