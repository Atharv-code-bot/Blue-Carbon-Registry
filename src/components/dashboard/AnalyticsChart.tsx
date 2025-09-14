import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

export function AnalyticsChart() {
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Submissions',
        data: [45, 67, 89, 112, 98, 134, 156, 178, 165, 189, 201, 224],
        borderColor: 'hsl(153, 75%, 20%)',
        backgroundColor: 'hsl(153, 75%, 20%, 0.1)',
        fill: false,
        tension: 0.4,
      },
      {
        label: 'Verifications',
        data: [38, 52, 76, 95, 87, 118, 142, 159, 148, 167, 182, 198],
        borderColor: 'hsl(142, 70%, 55%)',
        backgroundColor: 'hsl(142, 70%, 55%, 0.1)',
        fill: false,
        tension: 0.4,
      },
      {
        label: 'Credits Issued',
        data: [1200, 1850, 2340, 2890, 2650, 3450, 4230, 4780, 4520, 5120, 5690, 6240],
        borderColor: 'hsl(186, 85%, 25%)',
        backgroundColor: 'hsl(186, 85%, 25%, 0.1)',
        fill: false,
        tension: 0.4,
        yAxisID: 'y1',
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
        }
      },
      tooltip: {
        backgroundColor: 'hsl(var(--card))',
        titleColor: 'hsl(var(--card-foreground))',
        bodyColor: 'hsl(var(--card-foreground))',
        borderColor: 'hsl(var(--border))',
        borderWidth: 1,
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
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        grid: {
          color: 'hsl(var(--border))',
          drawBorder: false,
        },
        ticks: {
          color: 'hsl(var(--muted-foreground))',
        }
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          color: 'hsl(var(--muted-foreground))',
        }
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Platform Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <Line data={chartData} options={options} />
        </div>
        
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-muted/50 rounded-lg">
            <div className="text-lg font-semibold text-primary">98.2%</div>
            <div className="text-xs text-muted-foreground">Verification Rate</div>
          </div>
          <div className="p-3 bg-muted/50 rounded-lg">
            <div className="text-lg font-semibold text-success">2.5h</div>
            <div className="text-xs text-muted-foreground">Avg Review Time</div>
          </div>
          <div className="p-3 bg-muted/50 rounded-lg">
            <div className="text-lg font-semibold text-secondary">156</div>
            <div className="text-xs text-muted-foreground">Active Communities</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}