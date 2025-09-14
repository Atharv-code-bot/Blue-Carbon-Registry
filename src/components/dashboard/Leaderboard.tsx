import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Award } from 'lucide-react';

export function Leaderboard() {
  const leaders = [
    {
      rank: 1,
      name: 'Sundarbans Conservation Group',
      location: 'West Bengal',
      credits: 12450,
      level: 15,
      badge: 'Gold'
    },
    {
      rank: 2,
      name: 'Kerala Backwater Initiative',
      location: 'Kerala',
      credits: 9820,
      level: 12,
      badge: 'Gold'
    },
    {
      rank: 3,
      name: 'Tamil Nadu Coastal Project',
      location: 'Tamil Nadu',
      credits: 8560,
      level: 11,
      badge: 'Silver'
    },
    {
      rank: 4,
      name: 'Community Leader', // Current user
      location: 'Sundarbans, West Bengal',
      credits: 2450,
      level: 7,
      badge: 'Bronze',
      isCurrentUser: true
    },
    {
      rank: 5,
      name: 'Odisha Marine Foundation',
      location: 'Odisha',
      credits: 1980,
      level: 6,
      badge: 'Bronze'
    }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="h-4 w-4 text-warning" />;
      case 2: return <Medal className="h-4 w-4 text-muted-foreground" />;
      case 3: return <Award className="h-4 w-4 text-amber-600" />;
      default: return <span className="text-sm font-semibold text-muted-foreground">#{rank}</span>;
    }
  };

  const getBadgeVariant = (badge: string) => {
    switch (badge) {
      case 'Gold': return 'default';
      case 'Silver': return 'secondary';
      case 'Bronze': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Trophy className="h-5 w-5 text-warning" />
          <span>Community Leaderboard</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {leaders.map((leader) => (
            <div 
              key={leader.rank} 
              className={`p-3 rounded-lg border transition-colors ${
                leader.isCurrentUser 
                  ? 'border-primary bg-primary/5 shadow-primary' 
                  : 'border-border hover:bg-muted/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8">
                    {getRankIcon(leader.rank)}
                  </div>
                  <div className="space-y-1">
                    <h4 className={`text-sm font-semibold ${leader.isCurrentUser ? 'text-primary' : ''}`}>
                      {leader.name}
                      {leader.isCurrentUser && <span className="text-xs text-primary ml-1">(You)</span>}
                    </h4>
                    <p className="text-xs text-muted-foreground">{leader.location}</p>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <div className="text-sm font-semibold text-success">
                    {leader.credits.toLocaleString()}
                  </div>
                  <div className="flex items-center space-x-1">
                    <Badge variant={getBadgeVariant(leader.badge)} className="text-xs">
                      Lv.{leader.level}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-muted/50 rounded-lg text-center">
          <p className="text-xs text-muted-foreground">
            Keep contributing to climb the leaderboard! 🌱
          </p>
        </div>
      </CardContent>
    </Card>
  );
}