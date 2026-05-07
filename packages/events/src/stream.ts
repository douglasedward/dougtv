export interface StreamStarted {
  type: 'stream.started';
  streamId: string;
  channelId: string;
  timestamp: string;
}

export interface StreamEnded {
  type: 'stream.ended';
  streamId: string;
  channelId: string;
  timestamp: string;
}

export interface StreamKeyValidated {
  type: 'stream.key_validated';
  streamId: string;
  channelId: string;
  timestamp: string;
}

export type StreamEvent = StreamStarted | StreamEnded | StreamKeyValidated;
