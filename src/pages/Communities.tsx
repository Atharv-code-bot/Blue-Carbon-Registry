import { Sidebar } from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, MapPin, Award } from 'lucide-react';

export default function Communities() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-64 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Community Management</h1>
            <p className="text-muted-foreground">Manage active communities and their contributions</p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Active Communities</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Community management interface</h3>
                <p className="text-muted-foreground">Detailed community management features coming soon</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}