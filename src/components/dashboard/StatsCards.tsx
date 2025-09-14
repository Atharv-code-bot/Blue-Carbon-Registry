import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { TreePine, Coins, Trophy, TrendingUp } from 'lucide-react';

export function StatsCards() {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Total Contributions',
      value: '24',
      change: '+12%',
      icon: TreePine,
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'Carbon Credits',
      value: user?.credits.toLocaleString() || '0',
      change: '+8.2%',
      icon: Coins,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Tokens Earned',
      value: user?.tokens.toLocaleString() || '0',
      change: '+15%',
      icon: Trophy,
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      title: 'Impact Score',
      value: '856',
      change: '+22%',
      icon: TrendingUp,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
              <span className="text-success">{stat.change}</span> from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}