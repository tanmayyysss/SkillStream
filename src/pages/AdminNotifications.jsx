import { useState } from 'react';
import AdminShell from '../components/AdminShell';
import { useAppState } from '../context/AppState';

const types = ['Announcement', 'Promotion', 'Alert', 'Event'];

export default function AdminNotifications() {
  const { notifications, addNotification, removeNotification } = useAppState();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: '', message: '', type: 'Announcement', date: '' });
  const [error, setError] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();
    if (!form.title.trim() || !form.message.trim() || !form.date.trim()) {
      setError('Title, message, and date are required.');
      return;
    }
    addNotification({
      title: form.title.trim(),
      message: form.message.trim(),
      type: form.type,
      date: form.date.trim(),
    });
    setForm({ title: '', message: '', type: 'Announcement', date: '' });
    setError('');
    setOpen(false);
  };

  return (
    <AdminShell>
      <div className="dash">
        <header className="split-head">
          <h1>Notifications</h1>
          <button type="button" className="btn primary" onClick={() => setOpen(true)}>+ New Notification</button>
        </header>
        <section className="panel">
          <table>
            <thead>
              <tr>
                <th>Titles</th>
                <th>Message</th>
                <th>Type</th>
                <th>Date</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {notifications.map((row) => (
                <tr key={row.id}>
                  <td>{row.title}</td>
                  <td>{row.message}</td>
                  <td>{row.type}</td>
                  <td>{row.date}</td>
                  <td>
                    <button type="button" className="text-btn" onClick={() => removeNotification(row.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {notifications.length === 0 && <p>No notifications yet.</p>}
        </section>
        {open && (
          <div className="modal-back" role="dialog" aria-modal="true" aria-labelledby="note-title">
            <form className="modal" onSubmit={onSubmit}>
              <h2 id="note-title">New Notification</h2>
              <label>Title<input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></label>
              <label>Message<input value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} /></label>
              <label>
                Type
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                  {types.map((type) => <option key={type}>{type}</option>)}
                </select>
              </label>
              <label>Date<input placeholder="20th May 2026" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></label>
              {error && <p className="form-error">{error}</p>}
              <div className="row-actions">
                <button type="button" className="btn ghost" onClick={() => setOpen(false)}>Cancel</button>
                <button type="submit" className="btn primary">Publish</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
