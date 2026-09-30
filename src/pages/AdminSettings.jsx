import { useState } from 'react';
import AdminShell from '../components/AdminShell';
import { useAppState } from '../context/AppState';

export default function AdminSettings() {
  const { user, updateProfile } = useAppState();
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    site: 'SkillStream',
    support: 'help@skillstream.com',
  });
  const [alerts, setAlerts] = useState(true);
  const [saved, setSaved] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    updateProfile({ name: form.name.trim() || user.name, email: form.email.trim() || user.email });
    setSaved(true);
  };

  return (
    <AdminShell>
      <div className="dash">
        <h1>Settings</h1>
        <form className="panel settings-form" onSubmit={onSubmit}>
          <label>Admin name<input value={form.name} onChange={(e) => { setSaved(false); setForm({ ...form, name: e.target.value }); }} /></label>
          <label>Admin email<input type="email" value={form.email} onChange={(e) => { setSaved(false); setForm({ ...form, email: e.target.value }); }} /></label>
          <label>Site name<input value={form.site} onChange={(e) => { setSaved(false); setForm({ ...form, site: e.target.value }); }} /></label>
          <label>Support email<input type="email" value={form.support} onChange={(e) => { setSaved(false); setForm({ ...form, support: e.target.value }); }} /></label>
          <label className="check">
            <input type="checkbox" checked={alerts} onChange={(e) => setAlerts(e.target.checked)} />
            Email alerts for new enrollments
          </label>
          <button type="submit" className="btn primary">Save settings</button>
          {saved && <p className="notice">Settings saved in this browser.</p>}
        </form>
      </div>
    </AdminShell>
  );
}
