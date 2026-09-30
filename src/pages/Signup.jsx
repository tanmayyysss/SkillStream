import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogoMark } from '../components/Icons';
import { useAppState } from '../context/AppState';

export default function Signup() {
  const { signUp } = useAppState();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');

  const onChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const result = signUp(form);
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
        <h1>Create an account</h1>
        <label>
          username
          <input name="username" value={form.username} onChange={onChange} autoComplete="username" />
        </label>
        <label>
          Email
          <input name="email" type="email" value={form.email} onChange={onChange} autoComplete="email" />
        </label>
        <label>
          Password
          <input name="password" type="password" value={form.password} onChange={onChange} autoComplete="new-password" />
        </label>
        {error && <p className="form-error">{error}</p>}
        <button type="submit" className="btn auth-btn">Create an account</button>
        <p className="or">
          Already learning here? <Link to="/login">Sign in</Link>
        </p>
      </form>
    </div>
  );
}
