import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Shield, Activity, Settings } from 'lucide-react';

export function SystemAlerts() {
  const alerts = [
    {
      id: '1',
      type: 'warning' as const,
      title: 'High Processing Load',
      message: 'AI validation queue has 45 pending items',
      severity: 'medium',
      time: '5 minutes ago',
      action: 'Scale Resources'
    },
    {
      id: '2',
      type: 'info' as const,
      title: 'Satellite Data Sync',
      message: 'NDVI data updated for 12 regions',
      severity: 'low',
      time: '1 hour ago',
      action: 'View Details'
    },
    {
      id: '3',
      type: 'success' as const,
      title: 'Fraud Detection',
      message: 'No anomalies detected in last 24h',
      severity: 'low',
      time: '2 hours ago',
      action: 'Review'
    }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'info': return <Activity className="h-4 w-4 text-primary" />;
      case 'success': return <Shield className="h-4 w-4 text-success" />;
      default: return <Settings className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high': return <Badge variant="destructive" className="text-xs">High</Badge>;
      case 'medium': return <Badge variant="secondary" className="text-xs">Medium</Badge>;
      case 'low': return <Badge variant="outline" className="text-xs">Low</Badge>;
      default: return null;
    }
  };

  const getAlertBg = (type: string) => {
    switch (type) {
      case 'warning': return 'bg-warning/10 border-warning/20';
      case 'info': return 'bg-primary/10 border-primary/20';
      case 'success': return 'bg-success/10 border-success/20';
      default: return 'bg-muted/50 border-border';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5 text-warning" />
          <span>System Alerts</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div 
              key={alert.id} 
              className={`p-3 rounded-lg border transition-colors ${getAlertBg(alert.type)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="mt-0.5">
                    {getAlertIcon(alert.type)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-semibold">{alert.title}</h4>
                      {getSeverityBadge(alert.severity)}
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {alert.message}
                    </p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="ml-2">
                  {alert.action}
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <Button variant="ghost" size="sm" className="text-xs">
            View All Alerts
          </Button>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
            <span className="text-xs text-muted-foreground">System Healthy</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}