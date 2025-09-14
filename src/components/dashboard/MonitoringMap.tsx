import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Satellite, Filter, FullscreenIcon } from 'lucide-react';

export function MonitoringMap() {
  // Mock plantation data
  const plantations = [
    { id: 1, name: 'Sundarbans Phase 2', lat: 21.9497, lng: 88.9468, status: 'verified', health: 95 },
    { id: 2, name: 'Kerala Backwaters', lat: 9.4981, lng: 76.3388, status: 'under_review', health: 87 },
    { id: 3, name: 'Odisha Coast', lat: 20.9517, lng: 85.0985, status: 'pending', health: 78 },
    { id: 4, name: 'Tamil Nadu Project', lat: 11.1271, lng: 78.6569, status: 'verified', health: 92 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-success';
      case 'under_review': return 'bg-warning';
      case 'pending': return 'bg-muted-foreground';
      default: return 'bg-muted-foreground';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Satellite className="h-5 w-5 text-primary" />
            <span>Plantation Monitoring</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
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
        <div className="relative">
          {/* Map Container - placeholder for actual map */}
          <div className="w-full h-64 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border border-border relative overflow-hidden">
            {/* Mock India outline */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-40 border-2 border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground text-sm">India Map</span>
              </div>
            </div>
            
            {/* Plantation markers */}
            {plantations.map((plantation) => (
              <div
                key={plantation.id}
                className={`absolute w-3 h-3 rounded-full ${getStatusColor(plantation.status)} shadow-lg animate-pulse cursor-pointer`}
                style={{
                  left: `${20 + (plantation.id * 15)}%`,
                  top: `${30 + (plantation.id * 10)}%`
                }}
                title={plantation.name}
              />
            ))}
            
            {/* NDVI Overlay indicator */}
            <div className="absolute top-4 right-4">
              <Badge variant="secondary" className="text-xs">
                NDVI Overlay Active
              </Badge>
            </div>
          </div>
          
          {/* Legend */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded-full bg-success"></div>
                <span className="text-muted-foreground">Verified</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded-full bg-warning"></div>
                <span className="text-muted-foreground">Under Review</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded-full bg-muted-foreground"></div>
                <span className="text-muted-foreground">Pending</span>
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground">
              Last updated: 2 hours ago
            </div>
          </div>
        </div>
        
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