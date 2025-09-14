import { Sidebar } from '@/components/layout/Sidebar';
import { AIValidationPanel } from '@/components/dashboard/AIValidationPanel';

export default function Validation() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-64 p-6">
        <AIValidationPanel />
      </main>
    </div>
  );
}