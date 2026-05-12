import { useEffect, useRef } from 'react';
import styles from './Map.module.css';




export default function Map({ users = [], center = [28.6139, 77.2090], radius = 2 }) {
  const mapRef = useRef(null);
  const instanceRef = useRef(null);
  const markersRef  = useRef([]);
  let L;

  useEffect(() => {
    const init = async () => {
      L = (await import('leaflet')).default;
      if (instanceRef.current) instanceRef.current.remove();

      const map = L.map(mapRef.current, { zoomControl: false, attributionControl: false })
        .setView(center, 14);
      instanceRef.current = map;

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { maxZoom: 19 }).addTo(map);
      L.circle(center, { radius: radius * 1000, color: '#E24B4A', fillColor: '#E24B4A', fillOpacity: 0.06, weight: 1 }).addTo(map);

      const selfIcon = L.divIcon({
        html: `<div style="width:14px;height:14px;background:#E24B4A;border-radius:50%;border:2px solid #fff;box-shadow:0 0 0 3px rgba(226,75,74,0.35);"></div>`,
        className: '', iconSize: [14, 14], iconAnchor: [7, 7],
      });
      L.marker(center, { icon: selfIcon }).addTo(map);

      markersRef.current.forEach(m => m.remove());
      markersRef.current = [];

      users.forEach(u => {
        if (!u.location?.coordinates) return;
        const [lng, lat] = u.location.coordinates;
        const userIcon = L.divIcon({
          html: `<div style="width:10px;height:10px;background:#378ADD;border-radius:50%;border:2px solid rgba(55,138,221,0.4);"></div>`,
          className: '', iconSize: [10, 10], iconAnchor: [5, 5],
        });
        const marker = L.marker([lat, lng], { icon: userIcon }).addTo(map).bindPopup(`<b>${u.name}</b>`);
        markersRef.current.push(marker);
      });
    };
    init();
    return () => { instanceRef.current?.remove(); instanceRef.current = null; };
  }, [center, users, radius]);

  return <div ref={mapRef} className={styles.map} />;
}