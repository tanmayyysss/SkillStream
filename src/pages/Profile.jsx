import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentShell from '../components/StudentShell';
import { inr } from '../data/content';
import { useAppState } from '../context/AppState';

const fields = [
  { key: 'name', label: 'Full Name' },
  { key: 'email', label: 'Email Address' },
  { key: 'phone', label: 'Phone Number' },
  { key: 'password', label: 'Password', secret: true },
];

export default function Profile() {
  const { user, payments, updateProfile, signOut } = useAppState();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(null);
  const [draft, setDraft] = useState('');
  const [manageOpen, setManageOpen] = useState(false);

  const startEdit = (key) => {
    setEditing(key);
    setDraft(user[key] || '');
  };

  const save = () => {
    if (!draft.trim()) return;
    updateProfile({ [editing]: draft.trim() });
    setEditing(null);
  };

  const logOut = () => {
    signOut();
    navigate('/', { replace: true });
  };

  return (
    <StudentShell>
      <div className="profile">
        <header className="profile-id">
          <span className="avatar lg">{(user?.name || 'X').slice(0, 1)}</span>
          <div>
            <h1>{user?.name}</h1>
            <p>{user?.email}</p>
            {user?.plan === 'Pro' && <span className="plan-pill">Pro Plan: Active</span>}
          </div>
        </header>

        <section className="panel">
          <h2>Personal Information</h2>
          {fields.map((field) => (
            <div key={field.key} className="info-row">
              <div>
                <small>{field.label}</small>
                {editing === field.key ? (
                  <input
                    type={field.secret ? 'password' : 'text'}
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    autoFocus
                  />
                ) : (
                  <strong>{field.secret ? '•'.repeat(10) : user?.[field.key] || '—'}</strong>
                )}
              </div>
              {editing === field.key ? (
                <button type="button" onClick={save}>Save</button>
              ) : (
                <button type="button" onClick={() => startEdit(field.key)}>
                  {field.key === 'name' ? 'Edit' : 'Change'}
                </button>
              )}
            </div>
          ))}
        </section>

        <section className="panel plan-panel">
          <div className="plan-top">
            <div>
              <h2>Pro Plan</h2>
              <p>{inr(1459)} / month{user?.planRenews ? ` · Renews ${user.planRenews}` : ''}</p>
            </div>
            <button type="button" className="manage" onClick={() => setManageOpen(true)}>Manage</button>
          </div>
          <ul>
            <li>Unlimited course access</li>
            <li>Downloaded lessons for offline</li>
            <li>Priority support</li>
            <li>AI-powered notes summary</li>
          </ul>
          {manageOpen && (
            <p className="notice">Plan changes are preview-only. Your Pro access stays active in this demo.</p>
          )}
        </section>

        <section className="panel">
          <h2>Payment History</h2>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((row) => (
                <tr key={row.id}>
                  <td>{row.date}</td>
                  <td>{row.description}</td>
                  <td>{inr(row.amount)}</td>
                  <td><span className="paid">{row.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="logout-bar">
          <div>
            <strong>Log out</strong>
            <p>Sign out of SkillStream on this browser.</p>
          </div>
          <button type="button" onClick={logOut}>Log out</button>
        </section>
      </div>
    </StudentShell>
  );
}
