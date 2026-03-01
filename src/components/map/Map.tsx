'use client';
import { useEffect, useRef, memo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { t } from '@/lib/i18n';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './Map.module.css';

const LOCATION: [number, number] = [36.7409, 3.0338];

const SimpleMap = memo(function SimpleMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const lang = useSelector((state: RootState) => state.language.lang);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });

    const map = L.map(mapRef.current, {
      zoomControl: false,
      attributionControl: true,
    }).setView(LOCATION, 16);

    mapInstanceRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    L.control.zoom({ position: 'topright' }).addTo(map);

    const pulseIcon = L.divIcon({
      className: '',
      html: `
        <div class="${styles.markerOuter}">
          <div class="${styles.markerRing}"></div>
          <div class="${styles.markerCore}">
            <span class="${styles.markerPin}">📍</span>
          </div>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
      popupAnchor: [0, -24],
    });

    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${LOCATION[0]},${LOCATION[1]}`;

    L.marker(LOCATION, { icon: pulseIcon })
      .addTo(map)
      .bindPopup(
        `<div class="${styles.popup}">
          <div class="${styles.popupTitle}">GomyCODE</div>
          <div class="${styles.popupAddress}">Hydra, Algiers 🇩🇿</div>
          <a href="${googleMapsUrl}" target="_blank" class="${styles.directionsBtn}">
            Get Directions
          </a>
        </div>`,
        {
          className: styles.leafletPopup,
          offset: [0, -10],
        }
      )
      .openPopup();

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  return (
    <section className={styles.section} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className={styles.sectionBg} />

      <div className={styles.sectionInner}>
        <div className={styles.textBlock}>
          <span className={styles.sectionEyebrow}>{t(lang, 'findUs')}</span>
          <h2 className={styles.sectionTitle}>{t(lang, 'ourLocation')}</h2>
          <div className={styles.infoCards}>
            <div className={styles.infoCard}>
              <div>
                <div className={styles.infoLabel}>Hours</div>
                <div className={styles.infoValue}>Sun–Thu: 9:00–18:00</div>
              </div>
            </div>
            <div className={styles.infoCard}>
              <span className={styles.infoIcon}>📞</span>
              <div>
                <div className={styles.infoLabel}>Phone</div>
                <div className={styles.infoValue}>+213 541 75 44 33</div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.mapWrapper}>
          <div ref={mapRef} className={styles.mapContainer} />
        </div>
      </div>
    </section>
  );
});

export default SimpleMap;
