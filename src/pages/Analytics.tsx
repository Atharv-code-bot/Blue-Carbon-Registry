import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart3, TrendingUp, Calendar, Download, TreePine, Coins, Users, Target } from 'lucide-react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  ArcElement,
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  ArcElement,
  Title, 
  Tooltip, 
  Legend
);

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('12m');
  const [viewType, setViewType] = useState('overview');

  // Sample data
  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    submissions: [2, 4, 3, 5, 7, 6, 8, 9, 7, 10, 8, 11],
    verifications: [1, 3, 2, 4, 6, 5, 7, 8, 6, 9, 7, 10],
    credits: [150, 420, 320, 680, 890, 750, 1240, 1560, 1120, 1890, 1450, 2100],
    trees: [650, 1200, 980, 1680, 2150, 1890, 3200, 3890, 2850, 4750, 3680, 5250]
  };

  const statusDistribution = {
    labels: ['Verified', 'Under Review', 'Pending', 'Rejected'],
    datasets: [{
      data: [15, 4, 3, 2],
      backgroundColor: [
        'hsl(142, 70%, 55%)',
        'hsl(43, 96%, 56%)',
        'hsl(210, 15%, 65%)',
        'hsl(0, 84%, 60%)'
      ],
      borderWidth: 0
    }]
  };

  const contributionTrend = {
    labels: monthlyData.labels,
    datasets: [
      {
        label: 'Submissions',
        data: monthlyData.submissions,
        borderColor: 'hsl(153, 75%, 20%)',
        backgroundColor: 'hsl(153, 75%, 20%, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Verifications',
        data: monthlyData.verifications,
        borderColor: 'hsl(142, 70%, 55%)',
        backgroundColor: 'hsl(142, 70%, 55%, 0.1)',
        fill: true,
        tension: 0.4,
      }
    ]
  };

  const creditsChart = {
    labels: monthlyData.labels,
    datasets: [{
      label: 'Credits Earned',
      data: monthlyData.credits,
      backgroundColor: 'hsl(153, 75%, 20%)',
      borderRadius: 4,
    }]
  };

  const treesChart = {
    labels: monthlyData.labels,
    datasets: [{
      label: 'Trees Planted',
      data: monthlyData.trees,
      backgroundColor: 'hsl(142, 70%, 55%)',
      borderRadius: 4,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'hsl(var(--border))',
          drawBorder: false,
        },
        ticks: {
          color: 'hsl(var(--muted-foreground))',
        }
      },
      y: {
        grid: {
          color: 'hsl(var(--border))',
          drawBorder: false,
        },
        ticks: {
          color: 'hsl(var(--muted-foreground))',
        }
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      }
    }
  };

  const kpiData = [
    {
      title: 'Total Impact Score',
      value: '8,456',
      change: '+22.5%',
      icon: Target,
      color: 'text-primary'
    },
    {
      title: 'Verification Rate',
      value: '87.5%',
      change: '+4.2%',
      icon: BarChart3,
      color: 'text-success'
    },
    {
      title: 'Avg. Credits/Project',
      value: '186',
      change: '+8.7%',
      icon: Coins,
      color: 'text-accent'
    },
    {
      title: 'Community Rank',
      value: '#4',
      change: '+2 positions',
      icon: Users,
      color: 'text-secondary'
    }
  ];

  const achievements = [
    {
      title: 'Carbon Champion',
      description: 'Earned 1,000+ carbon credits',
      progress: 85,
      target: 1000,
      current: 850,
      badge: '🏆'
    },
    {
      title: 'Forest Guardian',
      description: 'Planted 10,000+ trees',
      progress: 92,
      target: 10000,
      current: 9200,
      badge: '🌳'
    },
    {
      title: 'Consistency Master',
      description: 'Submit for 12 consecutive months',
      progress: 75,
      target: 12,
      current: 9,
      badge: '📅'
    }
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
              <p className="text-muted-foreground">
                Track your contribution impact and performance metrics
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1m">1 Month</SelectItem>
                  <SelectItem value="3m">3 Months</SelectItem>
                  <SelectItem value="6m">6 Months</SelectItem>
                  <SelectItem value="12m">12 Months</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpiData.map((kpi, index) => (
              <Card key={index} className="hover-lift">
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">{kpi.title}</p>
                      <p className="text-2xl font-bold">{kpi.value}</p>
                      <p className="text-xs text-success">{kpi.change}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-lg bg-muted/50 flex items-center justify-center`}>
                      <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Contribution Trend */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Contribution Trend</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <Line data={contributionTrend} options={chartOptions} />
                </div>
              </CardContent>
            </Card>

            {/* Status Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Submission Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <Doughnut data={statusDistribution} options={doughnutOptions} />
                </div>
              </CardContent>
            </Card>

            {/* Credits Over Time */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Coins className="h-5 w-5" />
                  <span>Credits Earned</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <Bar data={creditsChart} options={chartOptions} />
                </div>
              </CardContent>
            </Card>

            {/* Trees Planted */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TreePine className="h-5 w-5" />
                  <span>Trees Planted</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <Bar data={treesChart} options={chartOptions} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Progress Towards Goals */}
          <Card>
            <CardHeader>
              <CardTitle>Achievement Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {achievements.map((achievement, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{achievement.badge}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{achievement.title}</h4>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{achievement.current.toLocaleString()}</span>
                        <span>{achievement.target.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${achievement.progress}%` }}
                        />
                      </div>
                      <div className="text-center">
                        <Badge variant="outline" className="text-xs">
                          {achievement.progress}% Complete
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Detailed Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average Processing Time</span>
                    <span className="font-semibold">2.3 days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Success Rate</span>
                    <span className="font-semibold text-success">87.5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">AI Confidence Average</span>
                    <span className="font-semibold">91.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Documentation Quality</span>
                    <span className="font-semibold text-primary">Excellent</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Targets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Submissions Target</span>
                      <span>8/10</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '80%' }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Credits Target</span>
                      <span>1,200/1,500</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-success h-2 rounded-full" style={{ width: '80%' }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Trees Target</span>
                      <span>4,200/5,000</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-accent h-2 rounded-full" style={{ width: '84%' }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}