import { useState, useEffect } from 'react';

import Navbar from '../../Components/Navbar/Navbar';

import ShoutoutCard from '../../Components/ShoutoutCard/ShoutoutCard';

import Button from '../../Components/Buttons/Button';

import { shoutoutService } from '../../services/shoutoutService';

import { INTERESTS, SHOUTOUT_TIMINGS } from '../../utils/constants';

import { useSocket } from '../../Context/SocketContext.jsx';

import toast from 'react-hot-toast';

import styles from './Shoutouts.module.css';

export default function Shoutouts() {
  
  const { socket } = useSocket();
  const [shoutouts, setShoutouts] = useState([]);
  const [filter, setFilter]       = useState('all');
  const [loading, setLoading]     = useState(true);
  const [showForm, setShowForm]   = useState(false);
  const [form, setForm]           = useState({ message: '', interest: '', timing: 'now' });
  const [posting, setPosting]     = useState(false);

  const load = async () => {
    try {
      const { data } = await shoutoutService.getAll(filter !== 'all' ? { interest: filter } : {});
      setShoutouts(data.shoutouts || []);
    } catch { toast.error('Could not load shoutouts'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, [filter]);

  useEffect(() => {
    if (!socket) return;
    socket.on('new_shoutout', (s) => setShoutouts(prev => [s, ...prev]));
    return () => socket.off('new_shoutout');
  }, [socket]);

  const handlePost = async () => {
    if (!form.message.trim() || !form.interest) { toast.error('Fill in message and interest'); return; }
    setPosting(true);
    try {
      await shoutoutService.create(form);
      setShowForm(false);
      setForm({ message: '', interest: '', timing: 'now' });
      toast.success('Shoutout posted! 📣');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to post');
    } finally { setPosting(false); }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Shoutouts <span className={styles.liveBadge}>LIVE</span></h1>
        <p className={styles.sub}>Real-time broadcasts from people nearby</p>
      </div>
      <div className={styles.chips}>
        <button className={`${styles.chip} ${filter === 'all' ? styles.chipOn : ''}`} onClick={() => setFilter('all')}>All</button>
        {INTERESTS.map(({ id, label, icon }) => (
          <button key={id} className={`${styles.chip} ${filter === id ? styles.chipOn : ''}`} onClick={() => setFilter(id)}>{icon} {label}</button>
        ))}
      </div>
      <div className={styles.list}>
        {loading && <p className={styles.hint}>Loading shoutouts...</p>}
        {!loading && shoutouts.length === 0 && <p className={styles.hint}>No shoutouts yet. Be the first!</p>}
       {shoutouts
  .filter((s) =>
    filter === "all"
      ? true
      : s.interest === filter
  )
  .map((s) => (
    <ShoutoutCard
      key={s._id}
      shoutout={s}
    />
))}
      </div>

      {showForm && (
        <div className={styles.overlay} onClick={() => setShowForm(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>Post a Shoutout 📣</h2>
            <textarea className={styles.textarea} placeholder="What are you up to?" value={form.message}
              onChange={e => setForm(p => ({ ...p, message: e.target.value }))} rows={3} />
            <p className={styles.fieldLabel}>Interest</p>
            <div className={styles.intGrid}>
              {INTERESTS.map(({ id, label, icon, color, bg }) => (
                <button key={id}
                  className={`${styles.intBtn} ${form.interest === id ? styles.intOn : ''}`}
                  style={form.interest === id ? { background: bg, borderColor: color, color } : {}}
                  onClick={() => setForm(p => ({ ...p, interest: id }))}
                >{icon} {label}</button>
              ))}
            </div>
            <p className={styles.fieldLabel}>When?</p>
            <div className={styles.timingRow}>
              {SHOUTOUT_TIMINGS.map(({ id, label }) => (
                <button key={id} className={`${styles.timingBtn} ${form.timing === id ? styles.timingOn : ''}`}
                  onClick={() => setForm(p => ({ ...p, timing: id }))}>{label}</button>
              ))}
            </div>
            <div className={styles.modalActions}>
              <Button variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
              <Button loading={posting} onClick={handlePost}>Post!</Button>
            </div>
          </div>
        </div>
      )}
      <button className={styles.fab} onClick={() => setShowForm(true)}>+ Post Shoutout</button>
      <Navbar />
    </div>
  );
}