import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogoMark } from '../components/Icons';
import { useAppState } from '../context/AppState';

export default function AdminLogin() {
  const { signIn } = useAppState();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();
    const result = signIn({ username, password, role: 'admin' });
    if (!result.ok) {
      setError(result.error);
      return;
    }
    navigate(result.to, { replace: true });
  };

  return (
    <div className="auth-screen">
      <div className="wave" aria-hidden="true" />
      <Link to="/" className="brand auth-brand">
        <LogoMark />
        <span>SkillStream</span>
      </Link>
      <form className="auth-card" onSubmit={onSubmit}>
        <h1>Admin’s Login</h1>
        <label>
          username
          <input value={username} onChange={(event) => setUsername(event.target.value)} autoComplete="username" />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" />
        </label>
        {error && <p className="form-error">{error}</p>}
        <button type="submit" className="btn auth-btn">Sign in</button>
        <p className="or">Any username and password opens the admin preview.</p>
      </form>
    </div>
  );
}
