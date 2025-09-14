import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileCheck, Clock, MapPin, User } from 'lucide-react';

export function SubmissionQueue() {
  const submissions = [
    {
      id: 'SUB-2024-001',
      title: 'Coastal Restoration Project',
      submitter: 'Kerala NGO Coalition',
      location: 'Kochi, Kerala',
      submittedAt: '2024-01-15T10:30:00Z',
      status: 'pending_review',
      priority: 'high'
    },
    {
      id: 'SUB-2024-002',
      title: 'Mangrove Expansion Phase 3',
      submitter: 'Sundarbans Community',
      location: 'West Bengal',
      submittedAt: '2024-01-14T15:45:00Z',
      status: 'ai_validation',
      priority: 'medium'
    },
    {
      id: 'SUB-2024-003',
      title: 'Urban Wetland Initiative',
      submitter: 'Mumbai Panchayat',
      location: 'Mumbai, Maharashtra',
      submittedAt: '2024-01-14T09:15:00Z',
      status: 'documentation_review',
      priority: 'low'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending_review': return <Badge variant="secondary" className="text-xs">Pending Review</Badge>;
      case 'ai_validation': return <Badge variant="default" className="text-xs bg-primary/10 text-primary">AI Validation</Badge>;
      case 'documentation_review': return <Badge variant="outline" className="text-xs">Doc Review</Badge>;
      default: return <Badge variant="outline" className="text-xs">{status}</Badge>;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-destructive';
      case 'medium': return 'border-l-warning';
      case 'low': return 'border-l-muted-foreground';
      default: return 'border-l-border';
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const submitted = new Date(timestamp);
    const diffHours = Math.floor((now.getTime() - submitted.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <FileCheck className="h-5 w-5 text-primary" />
            <span>Review Queue</span>
          </CardTitle>
          <Badge variant="outline" className="text-xs">
            {submissions.length} pending
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {submissions.map((submission) => (
            <div 
              key={submission.id} 
              className={`p-3 rounded-lg border-l-4 border border-border hover:bg-muted/50 transition-colors cursor-pointer ${getPriorityColor(submission.priority)}`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm truncate flex-1 mr-2">
                    {submission.title}
                  </h4>
                  {getStatusBadge(submission.status)}
                </div>
                
                <div className="space-y-1 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <User className="h-3 w-3" />
                    <span>{submission.submitter}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span>{submission.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{formatTimeAgo(submission.submittedAt)}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs font-medium text-muted-foreground">
                    {submission.id}
                  </span>
                  <div className="flex space-x-1">
                    <Button variant="outline" size="sm" className="text-xs px-2 py-1">
                      View
                    </Button>
                    <Button variant="default" size="sm" className="text-xs px-2 py-1">
                      Review
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4">
          <Button variant="outline" className="w-full" size="sm">
            View All Submissions
          </Button>
        </div>
        
        <div className="mt-3 text-center">
          <p className="text-xs text-muted-foreground">
            Average review time: 2.5 hours
          </p>
        </div>
      </CardContent>
    </Card>
  );
}