import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bell, CheckCircle, AlertTriangle, Info, Star, Filter, Search, Check } from 'lucide-react';

export default function Notifications() {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [preferences, setPreferences] = useState({
    submissions: true,
    achievements: true,
    announcements: true,
    digest: true
  });
  const [viewedNotification, setViewedNotification] = useState<any | null>(null);

  const togglePreference = (key: keyof typeof preferences) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const notifications = [
    {
      id: '1',
      type: 'success',
      title: 'Submission Verified!',
      message: 'Your "Sundarbans Restoration Phase 2" project has been successfully verified. You earned 450 carbon credits and 225 tokens!',
      time: '2 hours ago',
      isRead: false,
      actionUrl: '/contributions',
      metadata: {
        projectId: 'SUB-2024-001',
        credits: 450,
        tokens: 225
      }
    },
    {
      id: '2',
      type: 'info',
      title: 'AI Analysis Complete',
      message: 'The AI validation for your latest submission has been completed with a 95% confidence score. Your project is now ready for admin review.',
      time: '5 hours ago',
      isRead: false,
      actionUrl: '/contributions',
      metadata: {
        projectId: 'SUB-2024-002',
        aiScore: 95
      }
    },
    {
      id: '3',
      type: 'achievement',
      title: 'New Badge Earned!',
      message: 'Congratulations! You have earned the "Verified Expert" badge for having 10 successful verifications.',
      time: '1 day ago',
      isRead: true,
      actionUrl: '/achievements',
      metadata: {
        badgeName: 'Verified Expert',
        badgeIcon: '✅'
      }
    },
    {
      id: '4',
      type: 'warning',
      title: 'Additional Documentation Required',
      message: 'Your "Kerala Backwater Initiative" submission needs additional documentation. Please upload more geo-tagged images.',
      time: '2 days ago',
      isRead: false,
      actionUrl: '/contributions',
      metadata: {
        projectId: 'SUB-2024-003',
        requirement: 'geo-tagged images'
      }
    },
    {
      id: '5',
      type: 'info',
      title: 'Monthly Report Available',
      message: 'Your contribution report for January 2024 is now available for download. You planted 3,250 trees across 4 projects.',
      time: '3 days ago',
      isRead: true,
      actionUrl: '/analytics',
      metadata: {
        reportMonth: 'January 2024',
        treesPlanted: 3250,
        projectCount: 4
      }
    },
    {
      id: '6',
      type: 'success',
      title: 'Level Up!',
      message: 'You have reached Level 7! Keep up the excellent work contributing to blue carbon restoration.',
      time: '5 days ago',
      isRead: true,
      actionUrl: '/achievements',
      metadata: {
        newLevel: 7,
        xpEarned: 500
      }
    },
    {
      id: '7',
      type: 'info',
      title: 'System Maintenance Scheduled',
      message: 'The platform will undergo maintenance on January 28th, 2024 from 2:00 AM to 4:00 AM IST. No submissions will be processed during this time.',
      time: '1 week ago',
      isRead: true,
      actionUrl: null,
      metadata: {
        maintenanceDate: 'January 28th, 2024',
        duration: '2 hours'
      }
    },
    {
      id: '8',
      type: 'achievement',
      title: 'Leaderboard Position Update',
      message: 'Great job! You have moved up to position #4 on the community leaderboard.',
      time: '1 week ago',
      isRead: true,
      actionUrl: '/achievements',
      metadata: {
        newRank: 4,
        previousRank: 6
      }
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-success" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-warning" />;
      case 'info':
        return <Info className="h-5 w-5 text-primary" />;
      case 'achievement':
        return <Star className="h-5 w-5 text-accent" />;
      default:
        return <Bell className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getNotificationBg = (type: string, isRead: boolean) => {
    const baseClasses = isRead ? 'opacity-75' : '';
    switch (type) {
      case 'success':
        return `bg-success/10 border-success/20 ${baseClasses}`;
      case 'warning':
        return `bg-warning/10 border-warning/20 ${baseClasses}`;
      case 'info':
        return `bg-primary/10 border-primary/20 ${baseClasses}`;
      case 'achievement':
        return `bg-accent/10 border-accent/20 ${baseClasses}`;
      default:
        return `bg-muted/50 border-border ${baseClasses}`;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'success':
        return <Badge className="bg-success/10 text-success border-success/20">Success</Badge>;
      case 'warning':
        return <Badge className="bg-warning/10 text-warning border-warning/20">Action Required</Badge>;
      case 'info':
        return <Badge className="bg-primary/10 text-primary border-primary/20">Info</Badge>;
      case 'achievement':
        return <Badge className="bg-accent/10 text-accent border-accent/20">Achievement</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = filter === 'all' || 
                         (filter === 'unread' && !notification.isRead) ||
                         (filter === 'read' && notification.isRead) ||
                         notification.type === filter;
    
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAllAsRead = () => {
    // In real implementation, this would update the backend
    console.log('Marking all notifications as read');
  };

  const markAsRead = (id: string) => {
    // In real implementation, this would update the backend
    console.log('Marking notification as read:', id);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <h1 className="text-3xl font-bold">Notifications</h1>
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="text-xs">
                    {unreadCount} new
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground">
                Stay updated with your submission status and achievements
              </p>
            </div>
            {unreadCount > 0 && (
              <Button onClick={markAllAsRead} variant="outline" size="sm">
                <Check className="h-4 w-4 mr-2" />
                Mark All Read
              </Button>
            )}
          </div>

          {/* Filters and Search */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search notifications..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter notifications" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Notifications</SelectItem>
                    <SelectItem value="unread">Unread</SelectItem>
                    <SelectItem value="read">Read</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                    <SelectItem value="warning">Warnings</SelectItem>
                    <SelectItem value="info">Information</SelectItem>
                    <SelectItem value="achievement">Achievements</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Notifications List */}
          <div className="space-y-3">
            {filteredNotifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={`transition-all hover:shadow-md ${
                  getNotificationBg(notification.type, notification.isRead)
                }`}
              >
                <CardContent className="pt-4">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <h3 className={`font-semibold ${!notification.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {notification.title}
                            </h3>
                            {!notification.isRead && (
                              <div className="w-2 h-2 rounded-full bg-primary"></div>
                            )}
                          </div>
                          {getTypeBadge(notification.type)}
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {notification.time}
                        </span>
                      </div>
                      
                      <p className={`text-sm leading-relaxed ${!notification.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {notification.message}
                      </p>
                      
                      {/* Metadata */}
                      {notification.metadata && (
                        <div className="flex flex-wrap gap-2 pt-2">
                          {notification.metadata.projectId && (
                            <Badge variant="outline" className="text-xs">
                              {notification.metadata.projectId}
                            </Badge>
                          )}
                          {notification.metadata.credits && (
                            <Badge variant="outline" className="text-xs text-success">
                              +{notification.metadata.credits} credits
                            </Badge>
                          )}
                          {notification.metadata.tokens && (
                            <Badge variant="outline" className="text-xs text-primary">
                              +{notification.metadata.tokens} tokens
                            </Badge>
                          )}
                          {notification.metadata.newLevel && (
                            <Badge variant="outline" className="text-xs text-accent">
                              Level {notification.metadata.newLevel}
                            </Badge>
                          )}
                          {notification.metadata.aiScore && (
                            <Badge variant="outline" className="text-xs">
                              AI Score: {notification.metadata.aiScore}%
                            </Badge>
                          )}
                        </div>
                      )}
                      
                      {notification.actionUrl && (
                        <div className="pt-2">
                          <Button variant="outline" size="sm" onClick={() => setViewedNotification(notification)}>
                            View Details
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredNotifications.length === 0 && (
            <Card>
              <CardContent className="pt-6 text-center py-12">
                <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No notifications found</h3>
                <p className="text-muted-foreground">
                  {searchQuery || filter !== 'all' 
                    ? 'Try adjusting your search or filter criteria' 
                    : 'You\'re all caught up! New notifications will appear here.'}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Notification Details Modal */}
          {viewedNotification && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
              <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
                <button
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                  onClick={() => setViewedNotification(null)}
                  aria-label="Close"
                >
                  ×
                </button>
                <div className="flex items-center gap-2 mb-2">
                  {getNotificationIcon(viewedNotification.type)}
                  <h2 className="text-xl font-bold">{viewedNotification.title}</h2>
                </div>
                <div className="mb-2 text-sm text-muted-foreground">{getTypeBadge(viewedNotification.type)}</div>
                <div className="mb-2 text-xs text-muted-foreground">{viewedNotification.time}</div>
                <div className="mb-4">{viewedNotification.message}</div>
                {viewedNotification.metadata && (
                  <div className="mb-4 space-y-1">
                    {Object.entries(viewedNotification.metadata).map(([key, value]) => (
                      <div key={key} className="text-sm">
                        <span className="font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1')}: </span>
                        <span>{String(value)}</span>
                      </div>
                    ))}
                  </div>
                )}
                {viewedNotification.actionUrl && (
                  <a
                    href={viewedNotification.actionUrl}
                    className="inline-block px-3 py-1 bg-primary text-white rounded text-sm hover:bg-primary/90 mb-2"
                  >
                    Go to Related Page
                  </a>
                )}
                <div>
                  <Button variant="outline" size="sm" onClick={() => setViewedNotification(null)}>
                    Close
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Submission Updates</p>
                    <p className="text-sm text-muted-foreground">Get notified about verification status changes</p>
                  </div>
                  <Button 
                    variant={preferences.submissions ? "default" : "outline"} 
                    size="sm" 
                    onClick={() => setPreferences(prev => ({ ...prev, submissions: !prev.submissions }))}
                  >
                    {preferences.submissions ? 'Enabled' : 'Disabled'}
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Achievement Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive updates about badges and level ups</p>
                  </div>
                  <Button 
                    variant={preferences.achievements ? "default" : "outline"} 
                    size="sm" 
                    onClick={() => setPreferences(prev => ({ ...prev, achievements: !prev.achievements }))}
                  >
                    {preferences.achievements ? 'Enabled' : 'Disabled'}
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">System Announcements</p>
                    <p className="text-sm text-muted-foreground">Important platform updates and maintenance notices</p>
                  </div>
                  <Button 
                    variant={preferences.announcements ? "default" : "outline"} 
                    size="sm" 
                    onClick={() => setPreferences(prev => ({ ...prev, announcements: !prev.announcements }))}
                  >
                    {preferences.announcements ? 'Enabled' : 'Disabled'}
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Weekly Digest</p>
                    <p className="text-sm text-muted-foreground">Summary of your activity and progress</p>
                  </div>
                  <Button 
                    variant={preferences.digest ? "default" : "outline"} 
                    size="sm" 
                    onClick={() => setPreferences(prev => ({ ...prev, digest: !prev.digest }))}
                  >
                    {preferences.digest ? 'Enabled' : 'Disabled'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}