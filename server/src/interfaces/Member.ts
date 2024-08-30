export interface MemberAttributes {
  id: string;
  channelId: string;
  userId: string;
  role: string;
  eChannelKey: string;
}

export type MemberCreation = Omit<MemberAttributes, 'id'>;
