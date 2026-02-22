"use client";

import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import styles from './Map.module.css';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
mapboxgl.accessToken = MAPBOX_TOKEN;

const GOMYCODE_COORDS: [number, number] = [3.0338, 36.7409]; 

const StoreMap = () => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);

    useEffect(() => {
        if (mapRef.current || !mapContainerRef.current) return;

        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/dark-v11', 
            center: GOMYCODE_COORDS,
            zoom: 14,
            pitch:60

        });

        map.on('load', () => {
            mapRef.current = map;

            const element = document.createElement('div');
            element.className = styles.customMarker;
            
            const pulse = document.createElement('div');
            pulse.className = styles.pulse;
            element.appendChild(pulse);

            new mapboxgl.Marker(element)
                .setLngLat(GOMYCODE_COORDS)
                .setPopup(
                    new mapboxgl.Popup({ offset: 35, closeButton: false })
                        .setHTML(`
                            <div class="${styles.popupContent}">
                                <h3>GoMyCode Algeria</h3>
                                <p>Villa 13, Lotissement Chemin des Crêtes, Hydra</p>
                                <a href="https://www.google.com/maps/dir/?api=1&destination=36.7409,3.0338" target="_blank">Get Directions</a>
                            </div>
                        `)
                )
                .addTo(map);
        });

        return () => map.remove();
    }, []);

    return (
  <section className="relative w-full px-4 py-12 md:px-10 lg:px-20">
    <div className="max-w-7xl mx-auto">
      <div className="relative overflow-hidden rounded-3xl shadow-2xl border border-white/10 bg-neutral-900">
        <div 
          ref={mapContainerRef} 
          className="w-full h-[400px] md:h-[600px] lg:h-[700px]" 
        />
        <div className="absolute top-4 left-4 right-4 md:right-auto md:w-80 p-6 rounded-2xl bg-black/80 backdrop-blur-md border border-white/10 text-white z-10">
          <h2 className="text-2xl font-bold text-[#fe4a49] mb-2">Find Us</h2>
          <div className="mt-6 flex flex-col gap-3">
            <button 
              onClick={() => mapRef.current?.flyTo({center: GOMYCODE_COORDS, zoom: 17, duration: 2000})}
              className="w-full py-3 bg-[#fe4a49] hover:bg-[#d63a39] transition-colors rounded-xl font-semibold text-white text-sm"
            >
              Focus on Space
            </button>
            <a 
              href={`https://www.google.com/maps/dir/?api=1&destination=${GOMYCODE_COORDS[1]},${GOMYCODE_COORDS[0]}`}
              target="_blank"
              className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors rounded-xl font-semibold text-center text-sm"
            >
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
    );
};

export default StoreMap;