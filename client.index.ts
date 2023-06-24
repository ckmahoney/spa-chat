import m from 'mithril';
import { AppState, AuthState, AppUser } from './client.types';
import { loadStateFromLocalStorage, saveStateToLocalStorage } from './client.utils';
import { login } from './client.login';
import { view } from './client.view';

// Define typings for the index module
type IndexModule = {
  oninit: () => Promise<void>;
  view: () => m.Children;
};

// Initialize the index module
const index: IndexModule = {
  async oninit() {
    // Load existing application state from localStorage
    let appState: AppState | null = loadStateFromLocalStorage();

    // If no previous state is found, create a default empty state for a new session
    if (!appState) {
      appState = {
        auth: {
          isAuthenticated: false,
          user: null,
          accessToken: '',
          refreshToken: '',
        },
      };
    }

    // If the appState has user data, verify user authentication
    if (appState.auth.isAuthenticated && appState.auth.user) {
      try {
        // Call the server to verify authentication using the access token
        const response = await m.request<AuthState>({
          method: 'GET',
          url: '/api/auth/verify',
          headers: {
            Authorization: `Bearer ${appState.auth.accessToken}`,
          },
        });

        // If authentication is successful, update the appState with the refreshed token
        appState.auth.accessToken = response.accessToken;
        saveStateToLocalStorage(appState);
      } catch (error) {
        // If authentication fails, clear the appState and show the login screen
        appState.auth.isAuthenticated = false;
        appState.auth.user = null;
        appState.auth.accessToken = '';
        appState.auth.refreshToken = '';
        saveStateToLocalStorage(appState);
      }
    }

    // If unauthenticated, show the login screen
    if (!appState.auth.isAuthenticated || !appState.auth.user) {
      m.route.set('/login');
    }
  },

  view() {
    // If authenticated, show the chatLog view
    if (appState.auth.isAuthenticated && appState.auth.user) {
      return m(view, { appState });
    }

    // If unauthenticated, show the login view
    return m(login, { appState });
  },
};

export default index;