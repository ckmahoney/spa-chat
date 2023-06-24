const MessageComponent = {
  view: (vnode) => {
    const { message } = vnode.attrs;
    return m('div', { class: 'message' }, [
      m('span', { class: 'user' }, message.user),
      m('span', { class: 'text' }, message.text),
      m('span', { class: 'timestamp' }, message.timestamp),
    ]);
  },
};

function chatLog(user) {
  let messages = [];
  let isLoading = false;

  function loadMoreMessages() {
    isLoading = true;
    m.request({
      method: 'GET',
      url: '/messages',
      params: { page: 2 }, // Replace with the appropriate pagination parameters
    })
      .then((response) => {
        messages = [...messages, ...response.messages];
      })
      .finally(() => {
        isLoading = false;
        m.redraw();
      });
  }

  function createMessage(text) {
    m.request({
      method: 'POST',
      url: '/messages',
      body: { text },
    })
      .then((response) => {
        messages.push(response.message);
      })
      .catch((error) => {
        // Handle any error that occurred during the request
      });
  }

  function checkForNewMessages() {
    m.request({
      method: 'GET',
      url: '/messages',
    })
      .then((response) => {
        messages = response.messages;
        setTimeout(checkForNewMessages, 20000);
        m.redraw();
      })
      .catch((error) => {
        // Handle any error that occurred during the request
      });
  }

  // Schedule the first check for new messages
  setTimeout(checkForNewMessages, 0);

  return {
    view: () => {
      return m('main', [
        m('div#chat-box', [
          m('div#chat-log', [
            m(
              'button',
              {
                id: 'load-more',
                onclick: () => {
                  loadMoreMessages();
                },
                disabled: isLoading,
              },
              'Load More'
            ),
            messages.map((message) => m(MessageComponent, { message })),
          ]),
          m('div#chat-draft', [
            m(
              'form',
              {
                onsubmit: (e) => {
                  e.preventDefault();
                  const text = e.target.elements.message.value;
                  createMessage(text);
                  e.target.elements.message.value = '';
                },
              },
              [
                m('input', { type: 'text', name: 'message' }),
                m('input', { type: 'submit', value: 'Send' }),
              ]
            ),
          ]),
        ]),
      ]);
    },
  };
}

// Mount the app
m.mount(document.body, chatLog(user));
