import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/FakeAuthContext.jsx';
import PageNav from '../../components/PageNav/PageNav.jsx';
import Button from '../../components/Button/Button.jsx';

import styles from './Login.module.css';

export default function Login() {
  // Pre-filled for dev purposes
  const [email, setEmail] = useState('jack@heyworld.com');
  const [password, setPassword] = useState('qwerty');

  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(evt) {
    evt.preventDefault();

    if (email && password) login(email, password);
  }

  useEffect(() => {
    if (isAuthenticated) navigate('/app', { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={e => setEmail(e.target.value)}
            value={email}
            autoComplete="off"
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}
