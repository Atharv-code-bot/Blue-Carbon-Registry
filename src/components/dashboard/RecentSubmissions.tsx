import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, TreePine, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function RecentSubmissions() {
  const navigate = useNavigate();
  const submissions = [
    {
      id: '1',
      title: 'Sundarbans Restoration Phase 2',
      location: 'Sundarbans, West Bengal',
      date: '2024-01-15',
      status: 'verified' as const,
      area: 2.5,
      trees: 1250,
      credits: 450
    },
    {
      id: '2',
      title: 'Coastal Mangrove Initiative',
      location: 'Odisha Coast',
      date: '2024-01-10',
      status: 'under_review' as const,
      area: 1.8,
      trees: 900,
      credits: 0
    },
    {
      id: '3',
      title: 'Community Restoration Project',
      location: 'Kerala Backwaters',
      date: '2024-01-05',
      status: 'pending' as const,
      area: 3.2,
      trees: 1600,
      credits: 0
    }
  ];

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'verified': return 'default';
      case 'under_review': return 'secondary';
      case 'pending': return 'outline';
      default: return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'text-success';
      case 'under_review': return 'text-warning';
      case 'pending': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Submissions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {submissions.map((submission) => (
            <div 
              key={submission.id} 
              className="p-4 rounded-lg border border-border hover-lift cursor-pointer group"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm">{submission.title}</h3>
                    <Badge variant={getStatusVariant(submission.status)} className="ml-2">
                      {submission.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center text-xs text-muted-foreground space-x-4">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>{submission.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(submission.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-xs">
                    <div className="text-center p-2 bg-muted/50 rounded">
                      <div className="font-semibold">{submission.area} ha</div>
                      <div className="text-muted-foreground">Area</div>
                    </div>
                    <div className="text-center p-2 bg-muted/50 rounded">
                      <div className="font-semibold flex items-center justify-center space-x-1">
                        <TreePine className="h-3 w-3" />
                        <span>{submission.trees}</span>
                      </div>
                      <div className="text-muted-foreground">Trees</div>
                    </div>
                    <div className="text-center p-2 bg-muted/50 rounded">
                      <div className={`font-semibold ${submission.credits > 0 ? 'text-success' : 'text-muted-foreground'}`}>
                        {submission.credits || '-'}
                      </div>
                      <div className="text-muted-foreground">Credits</div>
                    </div>
                  </div>
                </div>
                
                <Button variant="ghost" size="icon" className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => navigate('/contributions')}>
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4">
          <Button variant="outline" className="w-full" onClick={() => navigate('/contributions')}>
            View All Submissions
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}