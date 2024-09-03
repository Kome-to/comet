export interface WorkspaceDTO {
  id: string;
  name: string;
  userId: string;
}

export interface UserDTO {
  id: string;
  email: string;
  firstName: string;
  lastName: string;

  publicKey: string;
  ePrivateKey: string;
}

export interface ChannelCreateParams {
  id?: string;
  workspaceId?: string;
  name: string;
  publicKey: string;
  isPrivate: boolean;
}

export interface MemberCreateParams {
  userId: string;
  channelId: string;
  eChannelKey: string;
  role: string;
}
