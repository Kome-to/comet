export interface ChannelAttributes {
  id: string;
  workspaceId: string;
  name: string;
  isPrivate: boolean;
  publicKey: string;
}

export type ChannelCreation = Omit<ChannelAttributes, 'id'>;
