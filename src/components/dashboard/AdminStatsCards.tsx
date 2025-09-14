import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileCheck, AlertTriangle, TrendingUp, Shield, CheckCircle } from 'lucide-react';

export function AdminStatsCards() {
  const stats = [
    {
      title: 'Total Submissions',
      value: '1,247',
      change: '+12.5%',
      icon: FileCheck,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Pending Reviews',
      value: '23',
      change: '-8%',
      icon: AlertTriangle,
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      title: 'Active Communities',
      value: '156',
      change: '+18%',
      icon: Users,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      title: 'Credits Issued',
      value: '45.2K',
      change: '+24%',
      icon: CheckCircle,
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'AI Validations',
      value: '892',
      change: '+16%',
      icon: Shield,
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      title: 'System Health',
      value: '99.8%',
      change: '+0.2%',
      icon: TrendingUp,
      color: 'text-success',
      bgColor: 'bg-success/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className={`w-8 h-8 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              <span className={stat.change.startsWith('+') ? 'text-success' : 'text-destructive'}>
                {stat.change}
              </span> from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}