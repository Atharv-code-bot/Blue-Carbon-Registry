import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, MapPin, Camera, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function QuickActions() {
  const navigate = useNavigate();
  
  const actions = [
    {
      title: 'Submit New Plantation',
      description: 'Upload photos and documentation of your latest mangrove plantation',
      icon: Upload,
      variant: 'forest' as const,
      action: () => navigate('/submit')
    },
    {
      title: 'View Site Map',
      description: 'Explore your plantation sites and track their status',
      icon: MapPin,
      variant: 'ocean' as const,
      action: () => navigate('/monitoring')
    },
    {
      title: 'Upload Drone Footage',
      description: 'Add aerial monitoring footage for better verification',
      icon: Camera,
      variant: 'earth' as const,
      action: () => navigate('/submit')
    },
    {
      title: 'Generate Report',
      description: 'Create detailed reports of your restoration activities',
      icon: FileText,
      variant: 'secondary' as const,
      action: () => navigate('/analytics')
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {actions.map((action, index) => (
            <div key={index} className="p-4 rounded-lg border border-border hover-lift cursor-pointer group">
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
                  <action.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="font-semibold text-sm">{action.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {action.description}
                  </p>
                  <Button 
                    size="sm" 
                    variant={action.variant}
                    onClick={action.action}
                    className="w-full"
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}