export interface ChatMessageSent {
  type: 'chat.message_sent';
  messageId: string;
  channelId: string;
  userId: string;
  content: string;
  timestamp: string;
}

export interface ChatMessageDeleted {
  type: 'chat.message_deleted';
  messageId: string;
  channelId: string;
  timestamp: string;
}

export type ChatEvent = ChatMessageSent | ChatMessageDeleted;
