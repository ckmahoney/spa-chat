function refreshTokenMiddleware(xhrOptions) {
  return (xhr) => {
    const { headers } = xhrOptions;

    // Check if the access token has expired
    if (xhr.status === 401 && headers && headers.Authorization) {
      const refreshToken = headers.Authorization.split(' ')[1];

      // Attempt to refresh the access token
      return refreshTokenRequest(refreshToken)
        .then((response) => {
          // Update the request headers with the new access token
          xhrOptions.headers.Authorization = `Bearer ${response.accessToken}`;

          // Retry the request
          return m.request(xhrOptions);
        })
        .catch((error) => {
          // Handle token refresh failure
          throw error;
        });
    }

    return xhr;
  };
}

function chatLog(user) {
  // ...

  function refreshTokenRequest(refreshToken) {
    return m.request({
      method: 'POST',
      url: '/api/refresh-token',
      body: { refreshToken },
    });
  }

  function sendAuthorizedRequest(options) {
    return m.request(options).catch((error) => {
      if (error.code === 401) {
        // Access token expired, attempt to refresh the token
        return refreshTokenRequest(user.refreshToken)
          .then((response) => {
            // Update the user's access token with the new one
            user.accessToken = response.accessToken;

            // Update the request headers with the new access token
            options.headers.Authorization = `Bearer ${user.accessToken}`;

            // Retry the request
            return m.request(options);
          })
          .catch(() => {
            // Token refresh failed, handle the error accordingly
            throw error;
          });
      } else {
        // Handle other errors
        throw error;
      }
    });
  }

  function loadMoreMessages() {
    isLoading = true;
    sendAuthorizedRequest({
      method: 'GET',
      url: '/api/messages',
      params: { page: 2 }, // Replace with the appropriate pagination parameters
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((response) => {
        messages = [...messages, ...response];
      })
      .finally(() => {
        isLoading = false;
        m.redraw();
      })
      .catch((error) => {
        // Handle error
      });
  }

  function createMessage(text) {
    sendAuthorizedRequest({
      method: 'POST',
      url: '/api/messages',
      body: { text },
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((response) => {
        messages.push(response);
      })
      .catch((error) => {
        // Handle error
      });
  }

  function checkForNewMessages() {
    sendAuthorizedRequest({
      method: 'GET',
      url: '/api/messages',
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((response) => {
        messages = response;
        setTimeout(checkForNewMessages, 20000);
        m.redraw();
      })
      .catch((error) => {
        // Handle error
      });
  }

  // ...
}

// ...
