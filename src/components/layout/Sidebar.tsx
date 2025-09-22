import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import {
  Home,
  Upload,
  MapPin,
  BarChart3,
  Trophy,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  Leaf,
  Users,
  FileCheck,
  Shield
} from 'lucide-react';

const communityNavItems = [
  { name: 'Overview', href: '/dashboard', icon: Home },
  { name: 'Submit Plantation', href: '/submit', icon: Upload },
  { name: 'My Contributions', href: '/contributions', icon: MapPin },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Achievements', href: '/achievements', icon: Trophy },
  { name: 'Notifications', href: '/notifications', icon: Bell },
];

const adminNavItems = [
  { name: 'Overview', href: '/dashboard', icon: Home },
  { name: 'Submissions', href: '/submissions', icon: FileCheck },
  { name: 'Monitoring', href: '/monitoring', icon: MapPin },
  { name: 'AI Validation', href: '/validation', icon: Shield },
  { name: 'Communities', href: '/communities', icon: Users },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Reports', href: '/reports', icon: FileCheck },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const navItems = user?.role === 'admin' ? adminNavItems : communityNavItems;

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {/* Mobile overlay */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed top-0 left-0 h-full bg-card border-r border-border z-50 transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <Leaf className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-sm">Blue Carbon</span>
                <span className="text-xs text-muted-foreground">Registry</span>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-8 w-8"
          >
            {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </Button>
        </div>

        {/* User Info */}
        {!isCollapsed && user && (
          <div className="p-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full gradient-earth flex items-center justify-center">
                <span className="text-accent-foreground font-semibold">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground capitalize">
                  {user.role} {user.role !== 'admin' && `• Level ${user.level}`}
                </p>
              </div>
            </div>
            {user.role !== 'admin' && (
              <div className="mt-3 space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Credits</span>
                  <span className="font-medium text-success">{user.credits.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Tokens</span>
                  <span className="font-medium text-primary">{user.tokens.toLocaleString()}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-2">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <li key={item.name}>
                  <NavLink
                    to={item.href}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors",
                      isActive 
                        ? "bg-primary/10 text-primary font-medium" 
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    <item.icon className="h-4 w-4 flex-shrink-0" />
                    {!isCollapsed && <span>{item.name}</span>}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-2 border-t border-border">
          <Button
            variant="ghost"
            size={isCollapsed ? "icon" : "sm"}
            onClick={handleLogout}
            className="w-full justify-start text-muted-foreground hover:text-foreground"
          >
            <LogOut className="h-4 w-4" />
            {!isCollapsed && <span className="ml-3">Logout</span>}
          </Button>
        </div>
      </div>
    </>
  );
}