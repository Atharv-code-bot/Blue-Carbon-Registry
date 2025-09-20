import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { MapPin, Satellite, Filter, FullscreenIcon, Layers, Eye } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export function MonitoringMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [ndviLayer, setNdviLayer] = useState(true);
  const [selectedPlantation, setSelectedPlantation] = useState<any>(null);

  // Mock plantation data with enhanced NDVI values
  const plantations = [
    { 
      id: 1, 
      name: 'Sundarbans Phase 2', 
      lat: 21.9497, 
      lng: 88.9468, 
      status: 'verified', 
      health: 95,
      ndvi: 0.8,
      area: 245,
      trees: 12500
    },
    { 
      id: 2, 
      name: 'Kerala Backwaters', 
      lat: 9.4981, 
      lng: 76.3388, 
      status: 'under_review', 
      health: 87,
      ndvi: 0.7,
      area: 189,
      trees: 9450
    },
    { 
      id: 3, 
      name: 'Odisha Coast', 
      lat: 20.9517, 
      lng: 85.0985, 
      status: 'pending', 
      health: 78,
      ndvi: 0.6,
      area: 156,
      trees: 7800
    },
    { 
      id: 4, 
      name: 'Tamil Nadu Project', 
      lat: 11.1271, 
      lng: 78.6569, 
      status: 'verified', 
      health: 92,
      ndvi: 0.75,
      area: 203,
      trees: 10150
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return '#22c55e';
      case 'under_review': return '#eab308';
      case 'pending': return '#64748b';
      default: return '#64748b';
    }
  };

  const getNdviColor = (ndvi: number) => {
    if (ndvi > 0.7) return '#22c55e'; // High vegetation - green
    if (ndvi > 0.5) return '#eab308'; // Medium vegetation - yellow
    if (ndvi > 0.3) return '#f97316'; // Low vegetation - orange
    return '#ef4444'; // Very low/no vegetation - red
  };

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken.trim()) return;

    // Initialize Mapbox map
    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [78.9629, 20.5937], // Center of India
      zoom: 5,
      pitch: 45
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.current.on('load', () => {
      // Add NDVI heatmap layer
      if (ndviLayer) {
        addNdviHeatmap();
      }
      
      // Add plantation markers
      addPlantationMarkers();
    });

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken, ndviLayer]);

  const addNdviHeatmap = () => {
    if (!map.current) return;

    // Generate mock NDVI data points around plantations
    const ndviData = plantations.flatMap(plantation => {
      const points = [];
      const radius = 0.1; // degrees
      for (let i = 0; i < 20; i++) {
        const angle = (i / 20) * 2 * Math.PI;
        const distance = Math.random() * radius;
        points.push({
          type: 'Feature',
          properties: {
            ndvi: plantation.ndvi + (Math.random() - 0.5) * 0.3
          },
          geometry: {
            type: 'Point',
            coordinates: [
              plantation.lng + Math.cos(angle) * distance,
              plantation.lat + Math.sin(angle) * distance
            ]
          }
        });
      }
      return points;
    });

    map.current.addSource('ndvi-data', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: ndviData
      }
    });

    map.current.addLayer({
      id: 'ndvi-heatmap',
      type: 'heatmap',
      source: 'ndvi-data',
      paint: {
        'heatmap-weight': ['get', 'ndvi'],
        'heatmap-intensity': 1,
        'heatmap-color': [
          'interpolate',
          ['linear'],
          ['heatmap-density'],
          0, 'rgba(239, 68, 68, 0)',
          0.2, 'rgba(239, 68, 68, 0.6)',
          0.4, 'rgba(249, 115, 22, 0.6)',
          0.6, 'rgba(234, 179, 8, 0.6)',
          0.8, 'rgba(34, 197, 94, 0.6)',
          1, 'rgba(34, 197, 94, 0.8)'
        ],
        'heatmap-radius': 30,
        'heatmap-opacity': 0.7
      }
    });
  };

  const addPlantationMarkers = () => {
    if (!map.current) return;

    plantations.forEach(plantation => {
      // Create marker element
      const el = document.createElement('div');
      el.className = 'plantation-marker';
      el.style.cssText = `
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: ${getStatusColor(plantation.status)};
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        cursor: pointer;
        transition: transform 0.2s;
      `;
      
      el.addEventListener('mouseenter', () => {
        el.style.transform = 'scale(1.2)';
      });
      
      el.addEventListener('mouseleave', () => {
        el.style.transform = 'scale(1)';
      });

      el.addEventListener('click', () => {
        setSelectedPlantation(plantation);
      });

      // Add marker to map
      new mapboxgl.Marker(el)
        .setLngLat([plantation.lng, plantation.lat])
        .addTo(map.current!);

      // Add popup
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`
          <div class="p-2">
            <h3 class="font-semibold text-sm">${plantation.name}</h3>
            <p class="text-xs text-gray-600">Status: ${plantation.status}</p>
            <p class="text-xs text-gray-600">NDVI: ${plantation.ndvi.toFixed(2)}</p>
            <p class="text-xs text-gray-600">Health: ${plantation.health}%</p>
          </div>
        `);

      el.addEventListener('click', () => {
        popup.setLngLat([plantation.lng, plantation.lat]).addTo(map.current!);
      });
    });
  };

  const toggleNdviLayer = () => {
    setNdviLayer(!ndviLayer);
    if (map.current) {
      if (!ndviLayer) {
        addNdviHeatmap();
      } else {
        map.current.removeLayer('ndvi-heatmap');
        map.current.removeSource('ndvi-data');
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Satellite className="h-5 w-5 text-primary" />
            <span>Plantation Monitoring - NDVI Live Data</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={toggleNdviLayer}
              className={ndviLayer ? 'bg-primary text-primary-foreground' : ''}
            >
              <Layers className="h-4 w-4 mr-2" />
              NDVI Layer
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline" size="sm">
              <FullscreenIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {!mapboxToken ? (
          <div className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <h3 className="font-semibold mb-2">Mapbox Token Required</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Please enter your Mapbox public token to view the interactive NDVI map. 
                Get your token from <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline">mapbox.com</a>
              </p>
              <div className="flex gap-2">
                <Input
                  placeholder="pk.eyJ1Ijoi..."
                  value={mapboxToken}
                  onChange={(e) => setMapboxToken(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={() => setMapboxToken(mapboxToken)}>
                  Load Map
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative">
            {/* Interactive Mapbox Map */}
            <div 
              ref={mapContainer} 
              className="w-full h-96 rounded-lg border border-border relative overflow-hidden"
            />
            
            {/* NDVI Legend */}
            <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm p-3 rounded-lg border border-border">
              <h4 className="font-semibold text-sm mb-2">NDVI Scale</h4>
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-success"></div>
                  <span>High (0.7-1.0)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-warning"></div>
                  <span>Medium (0.5-0.7)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{backgroundColor: '#f97316'}}></div>
                  <span>Low (0.3-0.5)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive"></div>
                  <span>Very Low (0-0.3)</span>
                </div>
              </div>
            </div>

            {/* Selected Plantation Info */}
            {selectedPlantation && (
              <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm p-4 rounded-lg border border-border max-w-sm">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{selectedPlantation.name}</h4>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setSelectedPlantation(null)}
                  >
                    ×
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">NDVI:</span>
                    <div className="font-semibold" style={{color: getNdviColor(selectedPlantation.ndvi)}}>
                      {selectedPlantation.ndvi.toFixed(2)}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Health:</span>
                    <div className="font-semibold">{selectedPlantation.health}%</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Area:</span>
                    <div className="font-semibold">{selectedPlantation.area} ha</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Trees:</span>
                    <div className="font-semibold">{selectedPlantation.trees.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Quick stats */}
        <div className="mt-4 grid grid-cols-4 gap-4">
          <div className="text-center p-2 bg-muted/50 rounded">
            <div className="text-lg font-semibold text-success">{plantations.filter(p => p.status === 'verified').length}</div>
            <div className="text-xs text-muted-foreground">Verified</div>
          </div>
          <div className="text-center p-2 bg-muted/50 rounded">
            <div className="text-lg font-semibold text-warning">{plantations.filter(p => p.status === 'under_review').length}</div>
            <div className="text-xs text-muted-foreground">Reviewing</div>
          </div>
          <div className="text-center p-2 bg-muted/50 rounded">
            <div className="text-lg font-semibold text-muted-foreground">{plantations.filter(p => p.status === 'pending').length}</div>
            <div className="text-xs text-muted-foreground">Pending</div>
          </div>
          <div className="text-center p-2 bg-muted/50 rounded">
            <div className="text-lg font-semibold text-primary">
              {Math.round(plantations.reduce((acc, p) => acc + p.health, 0) / plantations.length)}%
            </div>
            <div className="text-xs text-muted-foreground">Avg Health</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}