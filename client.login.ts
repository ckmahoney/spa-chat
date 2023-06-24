import m, { Vnode } from 'mithril';

interface LoginState {
  username: string;
  password: string;
  error: string;
}

function Login(): m.Component<{}> {
  function handleUsernameInput(e: Event): void {
    state.username = (e.target as HTMLInputElement).value;
  }

  function handlePasswordInput(e: Event): void {
    state.password = (e.target as HTMLInputElement).value;
  }

  async function handleLogin(): Promise<void> {
    try {
      // Perform login request to the server using the entered username and password
      // If successful, update the application state and navigate to the chat page
      // If unsuccessful, display an error message
    } catch (error) {
      state.error = 'Login failed. Please try again.';
    }
  }

  function renderLoginForm(): Vnode {
    return m('form', [
      m('label', 'Username'),
      m('input[type=text]', {
        value: state.username,
        oninput: handleUsernameInput,
      }),
      m('label', 'Password'),
      m('input[type=password]', {
        value: state.password,
        oninput: handlePasswordInput,
      }),
      m('button[type=button]', { onclick: handleLogin }, 'Login'),
    ]);
  }

  function renderErrorMessage(): Vnode {
    return state.error && m('p', { style: 'color: red;' }, state.error);
  }

  const state: LoginState = {
    username: '',
    password: '',
    error: '',
  };

  return {
    view: () => m('div', [
      m('h2', 'Login'),
      renderLoginForm(),
      renderErrorMessage(),
    ]),
  };
}

export default Login;