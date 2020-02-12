import React, { useState } from "react";

export function LoginForm() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  function onLogin(event) {
    event.preventDefault();
    // TODO: request to server
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
            onChange={e => setPassword(e.target.value)}
          />
        </label>
      </div>

      <div>
        <button>Login</button>
      </div>
    </form>
  );
}

export default LoginForm;
