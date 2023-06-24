import m from 'mithril';

interface User {
  name: string;
  email: string;
  // Other user-related properties
}

interface Message {
  id: number;
  text: string;
  sender: string;
  timestamp: Date;
  // Other message-related properties
}

interface ChatLogAttrs {
  user: User;
  messages: Message[];
}

type ChatLogComponent = m.Component<ChatLogAttrs>;

export {
  User,
  Message,
  ChatLogAttrs,
  ChatLogComponent,
};