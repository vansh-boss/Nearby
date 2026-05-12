import { INTEREST_MAP, SHOUTOUT_TIMINGS } from './constants';

export function distanceKm(lat1, lng1, lat2, lng2) {

  const R = 6371;

  const dLat =
    ((lat2 - lat1) * Math.PI) / 180;

  const dLng =
    ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLng / 2) ** 2;

  return (
    R *
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    )
  );
}

export function formatDistance(km) {

  if (
    km === undefined ||
    km === null ||
    isNaN(km)
  ) {
    return "Nearby";
  }

  if (km < 1) {

    return `${Math.round(km * 1000)} m`;

  }

  return `${Number(km).toFixed(1)} km`;
}

export function timeAgo(date) {

  const diff =
    (
      Date.now() -
      new Date(date).getTime()
    ) / 1000;

  if (diff < 60)
    return `${Math.floor(diff)}s`;

  if (diff < 3600)
    return `${Math.floor(diff / 60)}m`;

  if (diff < 86400)
    return `${Math.floor(diff / 3600)}h`;

  return `${Math.floor(diff / 86400)}d`;
}

export function getInterest(id) {

  return (
    INTEREST_MAP[id] || {
      label: id,
      icon: '•',
      color: 'var(--text3)',
      bg: 'var(--bg3)'
    }
  );
}

export function getTiming(id) {

  return (
    SHOUTOUT_TIMINGS.find(
      t => t.id === id
    ) || {
      label: id,
      color: 'var(--text3)',
      bg: 'var(--bg3)'
    }
  );
}

export function truncate(
  str = '',
  maxLen = 80
) {

  return str.length > maxLen
    ? str.slice(0, maxLen) + '…'
    : str;
}

export function initials(name = '') {

  return name
    .split(' ')
    .slice(0, 2)
    .map(n => n[0])
    .join('')
    .toUpperCase();
}

const BG_COLORS = [
  { bg: '#0a1830', color: '#378ADD' },
  { bg: '#1a1200', color: '#EF9F27' },
  { bg: '#2a0808', color: '#E24B4A' },
  { bg: '#0d1f00', color: '#639922' },
  { bg: '#131028', color: '#7F77DD' },
  { bg: '#1a0812', color: '#D4537E' },
];

export function avatarColor(name = '') {

  const idx =
    name.charCodeAt(0) %
    BG_COLORS.length;

  return BG_COLORS[idx];
}

export const getToken = () =>
  localStorage.getItem('cn_token');

export const setToken = (t) =>
  localStorage.setItem('cn_token', t);

export const removeToken = () =>
  localStorage.removeItem('cn_token');