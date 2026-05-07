export interface ViewerJoined {
  type: 'viewer.joined';
  channelId: string;
  userId: string | null;
  sessionId: string;
  timestamp: string;
}

export interface ViewerLeft {
  type: 'viewer.left';
  channelId: string;
  sessionId: string;
  timestamp: string;
}

export type ViewerEvent = ViewerJoined | ViewerLeft;
