import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export function ProgressChart() {
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Trees Planted',
        data: [120, 190, 300, 500, 750, 980, 1200, 1450, 1680, 1920, 2150, 2400],
        borderColor: 'hsl(142, 70%, 55%)',
        backgroundColor: 'hsl(142, 70%, 55%, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Credits Earned',
        data: [45, 78, 125, 200, 320, 420, 580, 720, 860, 1050, 1180, 1350],
        borderColor: 'hsl(153, 75%, 20%)',
        backgroundColor: 'hsl(153, 75%, 20%, 0.1)',
        fill: true,
        tension: 0.4,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
        }
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
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
        grid: {
          color: 'hsl(var(--border))',
          drawBorder: false,
        },
        ticks: {
          color: 'hsl(var(--muted-foreground))',
        }
      }
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false,
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Progress This Year</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <Line data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}