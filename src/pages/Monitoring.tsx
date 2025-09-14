import { Sidebar } from '@/components/layout/Sidebar';
import { MonitoringMap } from '@/components/dashboard/MonitoringMap';

export default function Monitoring() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-64 p-6">
        <MonitoringMap />
      </main>
    </div>
  );
}