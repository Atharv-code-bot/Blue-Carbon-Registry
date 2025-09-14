import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Shield, Brain, Scan, CheckCircle, AlertTriangle } from 'lucide-react';

export function AIValidationPanel() {
  const validations = [
    {
      id: '1',
      submissionId: 'SUB-2024-001',
      type: 'Fraud Detection',
      status: 'completed',
      score: 95,
      risk: 'low',
      progress: 100
    },
    {
      id: '2',
      submissionId: 'SUB-2024-002',
      type: 'NDVI Analysis',
      status: 'processing',
      score: 0,
      risk: 'unknown',
      progress: 65
    },
    {
      id: '3',
      submissionId: 'SUB-2024-003',
      type: 'Tree Counting',
      status: 'queued',
      score: 0,
      risk: 'unknown',
      progress: 0
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'processing': return <Brain className="h-4 w-4 text-primary animate-pulse" />;
      case 'queued': return <Scan className="h-4 w-4 text-muted-foreground" />;
      default: return <Shield className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'low': return <Badge variant="default" className="text-xs bg-success/10 text-success">Low Risk</Badge>;
      case 'medium': return <Badge variant="secondary" className="text-xs bg-warning/10 text-warning">Medium Risk</Badge>;
      case 'high': return <Badge variant="destructive" className="text-xs">High Risk</Badge>;
      default: return <Badge variant="outline" className="text-xs">Pending</Badge>;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-success';
    if (score >= 70) return 'text-warning';
    if (score > 0) return 'text-destructive';
    return 'text-muted-foreground';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-primary" />
            <span>AI Validation</span>
          </CardTitle>
          <Badge variant="outline" className="text-xs">
            3 Active
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {validations.map((validation) => (
            <div 
              key={validation.id} 
              className="p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(validation.status)}
                    <span className="font-semibold text-sm">{validation.type}</span>
                  </div>
                  {getRiskBadge(validation.risk)}
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">
                      {validation.submissionId}
                    </span>
                    <span className={`font-medium ${getScoreColor(validation.score)}`}>
                      {validation.score > 0 ? `${validation.score}% confidence` : 'Pending'}
                    </span>
                  </div>
                  
                  <Progress 
                    value={validation.progress} 
                    className="h-2"
                  />
                  
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{validation.status.charAt(0).toUpperCase() + validation.status.slice(1)}</span>
                    <span>{validation.progress}% complete</span>
                  </div>
                </div>
                
                {validation.status === 'completed' && (
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      View Details
                    </Button>
                    <Button variant="default" size="sm" className="flex-1">
                      Approve
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Queue Status</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              <span>Processing</span>
            </div>
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            Average processing time: 15 minutes
          </div>
        </div>
      </CardContent>
    </Card>
  );
}