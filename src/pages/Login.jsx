import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogoMark } from '../components/Icons';
import { useAppState } from '../context/AppState';

export default function Login() {
  const { signIn, signInDemo } = useAppState();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [showForgot, setShowForgot] = useState(false);

  const finish = (result) => {
    if (!result.ok) {
      setError(result.error);
      return;
    }
    navigate(location.state?.from || result.to, { replace: true });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setNotice('');
    finish(signIn({ username, password }));
  };

  return (
    <div className="auth-screen">
      <div className="wave" aria-hidden="true" />
      <Link to="/" className="brand auth-brand">
        <LogoMark />
        <span>SkillStream</span>
      </Link>
      <form className="auth-card" onSubmit={onSubmit}>
        <label>
          username
          <input value={username} onChange={(event) => setUsername(event.target.value)} autoComplete="username" />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" />
        </label>
        <button type="button" className="forgot" onClick={() => setShowForgot((open) => !open)}>
          Forgot Password?
        </button>
        {showForgot && (
          <p className="notice">
            Use the demo account <strong>xyz</strong> / <strong>skillstream</strong>, or create a new account. This preview does not send reset email.
          </p>
        )}
        {error && <p className="form-error">{error}</p>}
        {notice && <p className="notice">{notice}</p>}
        <button type="submit" className="btn auth-btn">Sign in</button>
        <p className="or">or continue with</p>
        <div className="socials">
          <button type="button" onClick={() => finish(signInDemo())}>
            <span className="g">G</span> Google
          </button>
          <button type="button" onClick={() => finish(signInDemo())}>
            <span className="m">M</span> Microsoft
          </button>
        </div>
        <p className="or">Don’t have an account?</p>
        <Link to="/signup" className="btn auth-btn center">Create an account</Link>
        <button type="button" className="demo-link" onClick={() => finish(signInDemo())}>
          Continue as XYZ (demo dashboard)
        </button>
      </form>
    </div>
  );
}
