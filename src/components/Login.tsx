import { useState, type FormEvent } from 'react';

interface LoginProps {
  onLogin: (username: string) => void;
}

function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.');
      return;
    }

    if (password.length < 4) {
      setError('Password must be at least 4 characters.');
      return;
    }

    setError('');
    onLogin(username.trim());
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <p className="app__eyebrow">HireBoard</p>
        <h1 className="login-card__title">Welcome back</h1>
        <p className="login-card__subtitle">Sign in to browse open roles</p>

        <form onSubmit={handleSubmit} className="login-form">
          <label className="login-form__label" htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            className="login-form__input"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label className="login-form__label" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="login-form__input"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="login-form__error">{error}</p>}

          <button type="submit" className="login-form__submit">Sign In</button>
        </form>

        <p className="login-card__note">
          Demo only — any username/password (4+ characters) will work.
        </p>
      </div>
    </div>
  );
}

export default Login;
