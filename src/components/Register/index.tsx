import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { api } from '_services';
import styles from './styles.module.scss';
import { useAuth } from '_context/auth';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [name, setName] = React.useState<string>('');

  const handle_register = async (): Promise<void> => {
    await api.post('/authentication', {
      user_login: username,
      user_password: password,
      user_name: name,
    });

    navigate('/login');
  };

  const handle_navigate_to_login = (): void => {
    navigate('/login');
  };

  const handle_input_change = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const { name, value } = event.target;

    if (name === 'username') {
      setUsername(value);
    }

    if (name === 'password') {
      setPassword(value);
    }

    if (name === 'name') {
      setName(value);
    }
  };

  return (
    <div className={styles.container}>
      {token !== '' && <Navigate to="/" />}

      <div className={styles.left}></div>

      <div className={styles.right}>
        <div className={styles.login_form}>
          <h1>Create a new account</h1>

          <label>Username</label>
          <input
            type="username"
            id="username"
            onChange={handle_input_change}
            value={username}
            name="username"
            placeholder="Enter your username"
          />

          <label>Password</label>
          <input
            type="password"
            id="password"
            onChange={handle_input_change}
            value={password}
            name="password"
            placeholder="Enter your password"
          />

          <label>Name</label>
          <input
            type="name"
            id="name"
            onChange={handle_input_change}
            value={name}
            name="name"
            placeholder="Enter your name"
          />

          <button className={styles.login_button} onClick={handle_register}>
            Register
          </button>
        </div>

        <div className={styles.register}>
          <span>Already a member?</span>

          <button type="button" onClick={handle_navigate_to_login}>
            Go back to login
          </button>
        </div>
      </div>
    </div>
  );
};
