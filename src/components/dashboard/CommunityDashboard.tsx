import { Sidebar } from '@/components/layout/Sidebar';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { RecentSubmissions } from '@/components/dashboard/RecentSubmissions';
import { ProgressChart } from '@/components/dashboard/ProgressChart';
import { Leaderboard } from '@/components/dashboard/Leaderboard';
import { NotificationCenter } from '@/components/dashboard/NotificationCenter';
import { useLayout } from '@/components/layout/Layout';
import { cn } from '@/lib/utils';

export function CommunityDashboard() {
  const { sidebarCollapsed } = useLayout();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className={cn(
        "flex-1 p-6 animate-fade-in-up transition-all duration-300",
        sidebarCollapsed ? "ml-16" : "ml-64"
      )}>
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Welcome back!</h1>
            <p className="text-muted-foreground">
              Track your contributions to blue carbon restoration
            </p>
          </div>

          {/* Stats Overview */}
          <StatsCards />

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <QuickActions />
              <ProgressChart />
              <RecentSubmissions />
            </div>

            {/* Right Column - Sidebar Content */}
            <div className="space-y-6">
              <NotificationCenter />
              <Leaderboard />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}