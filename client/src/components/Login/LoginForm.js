import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { http, httpHelper } from '../../http';
import { useSetUnset } from '../../hooks/useSetUnset';
import { UserContext } from '../User/UserContext';

let LoginForm = ({ history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const load = useSetUnset(
    (loading = true) => setLoading(loading),
    () => {}
  );

  const { setUser } = useContext(UserContext);

  function onLogin(event) {
    event.preventDefault();

    load.current();
    http
      .post('auth/login', { username, password })
      .then(res => res.data)
      .then(user => {
        // TODO: temporary role
        user.roles = [1, 2];
        setUser(user);
        history.push('/');
      })
      .catch(error => {
        setErrorMsg(httpHelper.getHttpErrorMessage(error));
      })
      .then(() => {
        load.current(false);
      });
  }

  return (
    <form onSubmit={onLogin}>
      <div>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={username}
            disabled={loading}
            onChange={e => setUsername(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            disabled={loading}
            onChange={e => setPassword(e.target.value)}
          />
        </label>
      </div>

      {loading && <div>Authenticating...</div>}
      {errorMsg && !loading && <div style={{ color: 'red' }}>{errorMsg}</div>}

      <div>
        <button disabled={loading}>Login</button>
      </div>
    </form>
  );
};

LoginForm = withRouter(LoginForm);
export { LoginForm };
export default LoginForm;
