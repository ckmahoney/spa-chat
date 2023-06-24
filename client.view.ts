import m, { Vnode } from 'mithril';
import { AppState, Message } from './client.types';

interface ChatLogAttrs {
  state: AppState;
  sendMessage: (text: string) => Promise<void>;
}

const styles = {
  chatLogContainer: {
    height: '400px',
    overflow: 'auto',
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '10px',
  },
  messageBubble: {
    marginBottom: '10px',
    padding: '5px',
    backgroundColor: '#f1f1f1',
    borderRadius: '4px',
  },
  sender: {
    fontWeight: 'bold',
  },
  timestamp: {
    fontSize: '12px',
    color: '#999',
  },
  inputContainer: {
    marginTop: '10px',
  },
  input: {
    width: '100%',
    padding: '5px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  sendButton: {
    marginTop: '5px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '5px',
    cursor: 'pointer',
  },
};

const ChatLog: m.Component<ChatLogAttrs> = {
  view: (vnode: Vnode<ChatLogAttrs>) => {
    const { state, sendMessage } = vnode.attrs;

    const handleSendMessage = async (e: Event) => {
      e.preventDefault();
      const input = e.target as HTMLInputElement;
      await sendMessage(input.value);
      input.value = '';
    };

    return m('div', [
      m('div', { style: styles.chatLogContainer }, [
        m('ul', state.messages.map((message: Message) =>
          m('li', { style: styles.messageBubble }, [
            m('div', { style: styles.sender }, message.sender),
            m('div', message.text),
            m('div', { style: styles.timestamp }, message.timestamp.toLocaleString())
          ])
        ))
      ]),
      m('div', { style: styles.inputContainer }, [
        m('form', { onsubmit: handleSendMessage }, [
          m('input', { style: styles.input, type: 'text', placeholder: 'Type a message...' }),
          m('button', { style: styles.sendButton, type: 'submit' }, 'Send')
        ])
      ])
    ]);
  }
};

export default ChatLog;
