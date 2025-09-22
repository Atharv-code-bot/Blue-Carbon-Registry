import { useAuth } from '@/hooks/useAuth';
import { CommunityDashboard } from '@/components/dashboard/CommunityDashboard';
import { AdminDashboard } from '@/components/dashboard/AdminDashboard';
import { Navigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      {user.role === 'admin' ? (
        <AdminDashboard />
      ) : (
        <CommunityDashboard />
      )}
    </div>
  );
}