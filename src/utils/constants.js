export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const SOCKET_URL   = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

export const INTERESTS = [
  { id: 'sports',  label: 'Sports',  icon: '⚽', color: 'var(--green-text)', bg: 'var(--green-dim)'  },
  { id: 'coffee',  label: 'Coffee',  icon: '☕', color: 'var(--yellow)',      bg: 'var(--yellow-dim)' },
  { id: 'gaming',  label: 'Gaming',  icon: '🎮', color: 'var(--pink)',        bg: 'var(--pink-dim)'   },
  { id: 'fitness', label: 'Fitness', icon: '💪', color: 'var(--red)',         bg: 'var(--red-dim)'    },
  { id: 'music',   label: 'Music',   icon: '🎵', color: 'var(--yellow)',      bg: 'var(--yellow-dim)' },
  { id: 'study',   label: 'Study',   icon: '📚', color: 'var(--purple)',      bg: 'var(--purple-dim)' },
  { id: 'travel',  label: 'Travel',  icon: '✈️', color: 'var(--blue)',        bg: 'var(--blue-dim)'   },
  { id: 'food',    label: 'Food',    icon: '🍕', color: 'var(--yellow)',      bg: 'var(--yellow-dim)' },
];

export const INTEREST_MAP = Object.fromEntries(INTERESTS.map(i => [i.id, i]));

export const SHOUTOUT_TIMINGS = [
  { id: 'now',       label: 'Right now', color: 'var(--red)',        bg: 'var(--red-dim)'   },
  { id: 'today',     label: 'Today',     color: 'var(--green-text)', bg: 'var(--green-dim)' },
  { id: 'tomorrow',  label: 'Tomorrow',  color: 'var(--green-text)', bg: 'var(--green-dim)' },
  { id: 'this_week', label: 'This week', color: 'var(--blue)',       bg: 'var(--blue-dim)'  },
];

export const NEARBY_RADIUS_KM    = 2;
export const CHAT_EXPIRE_HOURS   = 72;
export const SHOUTOUT_EXPIRE_HOURS = 24;