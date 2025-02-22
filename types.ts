export interface Message { // Message format stored in the database
  id: string;
  content: { text?: string, files?: string[] };
  isUser?: boolean;
  isError?: boolean;
}

export interface Conversation { // Conversation format stored in the database
  id: string;
  title: { updated: boolean, text: string };
  timestamp: string;
  messages: Message[];
  userId: string;
}

export interface ConversationMetadata { // Contains only conversation metadata
  id: string;
  title: { updated: boolean, text: string };
  timestamp: string;
  userId: string;
}

export interface SSEChunk { // SSE chunk format
  success: boolean,
  id: string,
  data: string,
}