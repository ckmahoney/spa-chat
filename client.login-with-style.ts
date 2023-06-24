import m from 'mithril';

interface LoginAttrs {
  onLogin: (username: string, password: string) => Promise<void>;
}

const styles = {
  container: {
    textAlign: 'center',
  },
  form: {
    margin: '20px auto',
    maxWidth: '300px',
  },
  label: {
    display: 'block',
    marginBottom: '10px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
  },
};

const Login: m.Component<LoginAttrs> = {
  view: (vnode) => {
    const { onLogin } = vnode.attrs;

    const handleLogin = async () => {
      const username = (document.getElementById('username') as HTMLInputElement).value;
      const password = (document.getElementById('password') as HTMLInputElement).value;
      await onLogin(username, password);
    };

    return m('.login-container', { style: styles.container }, [
      m('h1', 'Login'),
      m('.form', { style: styles.form }, [
        m('label', { style: styles.label }, 'Username'),
        m('input', { id: 'username', type: 'text', style: styles.input }),

        m('label', { style: styles.label }, 'Password'),
        m('input', { id: 'password', type: 'password', style: styles.input }),

        m('button', { onclick: handleLogin, style: styles.button }, 'Login'),
      ]),
    ]);
  },
};

export default Login;