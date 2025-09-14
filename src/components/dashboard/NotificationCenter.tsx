import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell, CheckCircle, AlertTriangle, Info, Star } from 'lucide-react';

export function NotificationCenter() {
  const notifications = [
    {
      id: '1',
      type: 'success' as const,
      title: 'Submission Verified!',
      message: 'Your Sundarbans Phase 2 project has been verified. 450 credits earned!',
      time: '2 hours ago',
      isNew: true
    },
    {
      id: '2',
      type: 'info' as const,
      title: 'AI Analysis Complete',
      message: 'Drone footage analysis completed with 95% confidence score',
      time: '5 hours ago',
      isNew: true
    },
    {
      id: '3',
      type: 'achievement' as const,
      title: 'New Badge Earned!',
      message: 'Congratulations! You earned the "Verified Expert" badge',
      time: '1 day ago',
      isNew: false
    },
    {
      id: '4',
      type: 'warning' as const,
      title: 'Review Required',
      message: 'Please provide additional documentation for Kerala project',
      time: '2 days ago',
      isNew: false
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'info': return <Info className="h-4 w-4 text-primary" />;
      case 'achievement': return <Star className="h-4 w-4 text-accent" />;
      default: return <Bell className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getNotificationBg = (type: string) => {
    switch (type) {
      case 'success': return 'bg-success/10';
      case 'warning': return 'bg-warning/10';
      case 'info': return 'bg-primary/10';
      case 'achievement': return 'bg-accent/10';
      default: return 'bg-muted/50';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Notifications</span>
          </CardTitle>
          {notifications.some(n => n.isNew) && (
            <Badge variant="destructive" className="text-xs">
              {notifications.filter(n => n.isNew).length} new
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`p-3 rounded-lg border transition-colors hover:bg-muted/50 cursor-pointer ${
                notification.isNew ? 'border-primary/20 bg-primary/5' : 'border-border'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-1.5 rounded-full ${getNotificationBg(notification.type)}`}>
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold">{notification.title}</h4>
                    {notification.isNew && (
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {notification.message}
                  </p>
                  <p className="text-xs text-muted-foreground">{notification.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4">
          <button className="text-sm text-primary hover:underline w-full text-center">
            View all notifications
          </button>
        </div>
      </CardContent>
    </Card>
  );
}