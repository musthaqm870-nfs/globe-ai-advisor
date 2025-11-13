import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface MapProps {
  destinations?: Array<{ name: string; coordinates: [number, number] }>;
  safetyZones?: Array<{ coordinates: [number, number]; level: string }>;
}

const Map = ({ destinations = [], safetyZones = [] }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [isTokenSet, setIsTokenSet] = useState(false);

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    try {
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        zoom: 2,
        center: [0, 20],
      });

      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      setIsTokenSet(true);
      toast.success('Map initialized successfully!');
    } catch (error) {
      toast.error('Invalid Mapbox token. Please check and try again.');
      console.error('Map initialization error:', error);
    }
  };

  useEffect(() => {
    if (!map.current || !isTokenSet) return;

    // Clear existing markers
    const markers = document.querySelectorAll('.mapbox-marker');
    markers.forEach(marker => marker.remove());

    // Add destination markers
    destinations.forEach((dest) => {
      const el = document.createElement('div');
      el.className = 'mapbox-marker';
      el.style.backgroundColor = 'hsl(var(--primary))';
      el.style.width = '20px';
      el.style.height = '20px';
      el.style.borderRadius = '50%';
      el.style.border = '2px solid white';
      el.style.cursor = 'pointer';

      new mapboxgl.Marker(el)
        .setLngLat(dest.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<div style="color: black; font-weight: 600;">${dest.name}</div>`)
        )
        .addTo(map.current!);
    });

    // Add safety zone markers
    safetyZones.forEach((zone) => {
      const color = zone.level === 'safe' ? '#22c55e' : 
                    zone.level === 'moderate' ? '#eab308' : '#ef4444';
      
      const el = document.createElement('div');
      el.className = 'mapbox-marker';
      el.style.backgroundColor = color;
      el.style.width = '15px';
      el.style.height = '15px';
      el.style.borderRadius = '50%';
      el.style.border = '2px solid white';
      el.style.opacity = '0.7';

      new mapboxgl.Marker(el)
        .setLngLat(zone.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<div style="color: black;">Safety Level: ${zone.level}</div>`)
        )
        .addTo(map.current!);
    });

    // Fit bounds if destinations exist
    if (destinations.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      destinations.forEach(dest => bounds.extend(dest.coordinates));
      map.current?.fitBounds(bounds, { padding: 50 });
    }
  }, [destinations, safetyZones, isTokenSet]);

  useEffect(() => {
    return () => {
      map.current?.remove();
    };
  }, []);

  if (!isTokenSet) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4 p-8">
        <div className="max-w-md w-full space-y-4">
          <h3 className="text-lg font-semibold text-center">Enter Mapbox Token</h3>
          <p className="text-sm text-muted-foreground text-center">
            Get your free public token from{' '}
            <a 
              href="https://account.mapbox.com/access-tokens/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              mapbox.com
            </a>
          </p>
          <Input
            type="text"
            placeholder="pk.eyJ1Ijoi..."
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
            className="w-full"
          />
          <Button 
            onClick={initializeMap}
            disabled={!mapboxToken}
            className="w-full"
          >
            Initialize Map
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg" />
    </div>
  );
};

export default Map;
