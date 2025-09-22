import { Sidebar } from '@/components/layout/Sidebar';
import { AdminStatsCards } from '@/components/dashboard/AdminStatsCards';
import { SubmissionQueue } from '@/components/dashboard/SubmissionQueue';
import { AIValidationPanel } from '@/components/dashboard/AIValidationPanel';
import { MonitoringMap } from '@/components/dashboard/MonitoringMap';
import { SystemAlerts } from '@/components/dashboard/SystemAlerts';
import { AnalyticsChart } from '@/components/dashboard/AnalyticsChart';

export function AdminDashboard() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-6 animate-fade-in-up">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">NCCR Admin Console</h1>
              <p className="text-muted-foreground">
                Monitor and manage blue carbon registry operations
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-success animate-pulse"></div>
              <span className="text-sm text-muted-foreground">System Online</span>
            </div>
          </div>

          {/* Stats Overview */}
          <AdminStatsCards />

          {/* Main Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Left Column - Monitoring */}
            <div className="xl:col-span-2 space-y-6">
              <MonitoringMap />
              <AnalyticsChart />
            </div>

            {/* Right Column - Operations */}
            <div className="space-y-6">
              <SystemAlerts />
              <AIValidationPanel />
              <SubmissionQueue />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}