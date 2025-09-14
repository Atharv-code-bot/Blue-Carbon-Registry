import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Trophy, Star, Award, Medal, Target, Calendar, Users, TreePine } from 'lucide-react';

export default function Achievements() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const badges = [
    {
      id: 1,
      name: 'First Steps',
      description: 'Completed your first plantation submission',
      icon: '🌱',
      rarity: 'common',
      earnedAt: '2024-01-15',
      category: 'milestone',
      earned: true
    },
    {
      id: 2,
      name: 'Verified Expert',
      description: 'Had 10 plantations verified successfully',
      icon: '✅',
      rarity: 'rare',
      earnedAt: '2024-08-20',
      category: 'verification',
      earned: true
    },
    {
      id: 3,
      name: 'Carbon Champion',
      description: 'Earned 1,000+ carbon credits',
      icon: '🏆',
      rarity: 'epic',
      earnedAt: null,
      category: 'credits',
      earned: false,
      progress: 85,
      target: 1000,
      current: 850
    },
    {
      id: 4,
      name: 'Forest Guardian',
      description: 'Planted 10,000+ mangrove trees',
      icon: '🌳',
      rarity: 'epic',
      earnedAt: null,
      category: 'trees',
      earned: false,
      progress: 92,
      target: 10000,
      current: 9200
    },
    {
      id: 5,
      name: 'AI Ace',
      description: 'Achieved 95%+ AI confidence score',
      icon: '🤖',
      rarity: 'rare',
      earnedAt: '2024-09-10',
      category: 'quality',
      earned: true
    },
    {
      id: 6,
      name: 'Consistency King',
      description: 'Submit plantations for 12 consecutive months',
      icon: '📅',
      rarity: 'legendary',
      earnedAt: null,
      category: 'consistency',
      earned: false,
      progress: 75,
      target: 12,
      current: 9
    },
    {
      id: 7,
      name: 'Community Leader',
      description: 'Rank in top 10 on leaderboard',
      icon: '👑',
      rarity: 'epic',
      earnedAt: null,
      category: 'social',
      earned: false,
      progress: 40,
      target: 10,
      current: 4
    },
    {
      id: 8,
      name: 'Speed Demon',
      description: 'Get plantation verified within 24 hours',
      icon: '⚡',
      rarity: 'rare',
      earnedAt: '2024-07-22',
      category: 'speed',
      earned: true
    },
    {
      id: 9,
      name: 'Documentation Master',
      description: 'Submit perfect documentation 5 times',
      icon: '📋',
      rarity: 'rare',
      earnedAt: null,
      category: 'quality',
      earned: false,
      progress: 60,
      target: 5,
      current: 3
    },
    {
      id: 10,
      name: 'Ecosystem Pioneer',
      description: 'Plant 5 different mangrove species',
      icon: '🌿',
      rarity: 'common',
      earnedAt: '2024-06-18',
      category: 'biodiversity',
      earned: true
    }
  ];

  const achievements = [
    {
      title: 'Level 7 Contributor',
      description: 'Continue contributing to reach higher levels',
      progress: 70,
      xpCurrent: 3500,
      xpNext: 5000,
      icon: Star
    },
    {
      title: 'Monthly Challenge',
      description: 'Submit 3 plantations this month',
      progress: 66,
      current: 2,
      target: 3,
      icon: Calendar
    },
    {
      title: 'Quality Streak',
      description: 'Maintain 90%+ AI scores for 5 submissions',
      progress: 80,
      current: 4,
      target: 5,
      icon: Target
    }
  ];

  const stats = {
    totalBadges: badges.filter(b => b.earned).length,
    totalAvailable: badges.length,
    rareCount: badges.filter(b => b.earned && (b.rarity === 'rare' || b.rarity === 'epic' || b.rarity === 'legendary')).length,
    level: 7,
    rank: 4,
    percentile: 95
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-muted text-muted-foreground';
      case 'rare': return 'bg-primary/10 text-primary border-primary/20';
      case 'epic': return 'bg-accent/10 text-accent border-accent/20';
      case 'legendary': return 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const categories = [
    { id: 'all', name: 'All Badges', count: badges.length },
    { id: 'milestone', name: 'Milestones', count: badges.filter(b => b.category === 'milestone').length },
    { id: 'verification', name: 'Verification', count: badges.filter(b => b.category === 'verification').length },
    { id: 'credits', name: 'Credits', count: badges.filter(b => b.category === 'credits').length },
    { id: 'trees', name: 'Trees', count: badges.filter(b => b.category === 'trees').length },
    { id: 'quality', name: 'Quality', count: badges.filter(b => b.category === 'quality').length },
  ];

  const filteredBadges = selectedCategory === 'all' 
    ? badges 
    : badges.filter(badge => badge.category === selectedCategory);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Achievements & Badges</h1>
            <p className="text-muted-foreground">
              Track your progress and showcase your contributions to blue carbon restoration
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Level</p>
                    <p className="text-2xl font-bold text-primary">{stats.level}</p>
                  </div>
                  <Star className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Badges Earned</p>
                    <p className="text-2xl font-bold text-success">{stats.totalBadges}/{stats.totalAvailable}</p>
                  </div>
                  <Trophy className="h-8 w-8 text-success" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Rare Badges</p>
                    <p className="text-2xl font-bold text-accent">{stats.rareCount}</p>
                  </div>
                  <Award className="h-8 w-8 text-accent" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Community Rank</p>
                    <p className="text-2xl font-bold text-secondary">#{stats.rank}</p>
                  </div>
                  <Users className="h-8 w-8 text-secondary" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Current Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Current Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {achievements.map((achievement, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <achievement.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{achievement.title}</h4>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>
                          {achievement.xpCurrent ? 
                            `${achievement.xpCurrent} / ${achievement.xpNext} XP` :
                            `${achievement.current} / ${achievement.target}`
                          }
                        </span>
                        <span>{achievement.progress}%</span>
                      </div>
                      <Progress value={achievement.progress} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Badge Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name} ({category.count})
              </Button>
            ))}
          </div>

          {/* Badges Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredBadges.map((badge) => (
              <Card key={badge.id} className={`hover-lift ${badge.earned ? '' : 'opacity-60'}`}>
                <CardContent className="pt-6">
                  <div className="text-center space-y-3">
                    <div className="text-4xl">{badge.icon}</div>
                    <div className="space-y-1">
                      <h3 className="font-semibold">{badge.name}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {badge.description}
                      </p>
                    </div>
                    
                    <div className="flex justify-center">
                      <Badge className={getRarityColor(badge.rarity)}>
                        {badge.rarity.charAt(0).toUpperCase() + badge.rarity.slice(1)}
                      </Badge>
                    </div>

                    {badge.earned ? (
                      <div className="space-y-1">
                        <div className="text-xs text-success font-medium">✓ Earned</div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(badge.earnedAt!).toLocaleDateString()}
                        </div>
                      </div>
                    ) : badge.progress !== undefined ? (
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>{badge.current?.toLocaleString()}</span>
                          <span>{badge.target?.toLocaleString()}</span>
                        </div>
                        <Progress value={badge.progress} className="h-2" />
                        <div className="text-xs text-muted-foreground">
                          {badge.progress}% complete
                        </div>
                      </div>
                    ) : (
                      <div className="text-xs text-muted-foreground">
                        Requirements not met
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Leaderboard Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="h-5 w-5" />
                <span>Leaderboard Position</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">4</span>
                    </div>
                    <div>
                      <p className="font-semibold">Your Position</p>
                      <p className="text-sm text-muted-foreground">Top {stats.percentile}% of contributors</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">2,450</p>
                    <p className="text-sm text-muted-foreground">Credits</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-3">
                    You're only 550 credits away from rank #3!
                  </p>
                  <Button variant="outline" size="sm">
                    View Full Leaderboard
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