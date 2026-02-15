import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth';
import { 
  LayoutDashboard, 
  PlusCircle, 
  History, 
  Database,
  Users, 
  Settings, 
  FlaskConical,
  LogOut,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
    { icon: PlusCircle, label: 'New Design', path: '/new-project' },
    { icon: Database, label: 'Library', path: '/library' },
    { icon: History, label: 'Project History', path: '/history' },
    { icon: Users, label: 'Team', path: '/team' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-primary text-primary-foreground hidden md:flex flex-col">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2">
            <FlaskConical className="w-8 h-8 text-secondary" />
            <span className="text-xl font-bold tracking-tight">BaiVax</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                location.pathname === item.path
                  ? "bg-secondary text-secondary-foreground"
                  : "hover:bg-primary-foreground/10 text-primary-foreground/70 hover:text-primary-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium text-sm">{item.label}</span>
              {location.pathname === item.path && (
                <ChevronRight className="w-4 h-4 ml-auto" />
              )}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-primary-foreground/10">
          <div className="flex items-center gap-3 px-3 py-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-bold">
              {user?.displayName?.[0] || user?.email?.[0] || 'U'}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium truncate">{user?.displayName || 'User'}</p>
              <p className="text-xs text-primary-foreground/50 truncate">{user?.email}</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full justify-start gap-2 text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
            onClick={signOut}
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-foreground/50" onClick={() => setMobileMenuOpen(false)} />
          <aside className="relative w-64 h-full bg-primary text-primary-foreground flex flex-col">
            <div className="p-6 flex items-center justify-between">
              <Link to="/" className="flex items-center gap-2">
                <FlaskConical className="w-8 h-8 text-secondary" />
                <span className="text-xl font-bold tracking-tight">BaiVax</span>
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)} className="text-primary-foreground">
                <X className="w-5 h-5" />
              </Button>
            </div>
            <nav className="flex-1 px-4 py-4 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                    location.pathname === item.path
                      ? "bg-secondary text-secondary-foreground"
                      : "hover:bg-primary-foreground/10 text-primary-foreground/70 hover:text-primary-foreground"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium text-sm">{item.label}</span>
                </Link>
              ))}
            </nav>
            <div className="p-4 border-t border-primary-foreground/10">
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full justify-start gap-2 text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
                onClick={signOut}
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 border-b flex items-center justify-between px-4 md:px-8 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
              <Menu className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-semibold text-primary">
              {menuItems.find(i => i.path === location.pathname)?.label || 'Dashboard'}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-xs text-muted-foreground px-3 py-1 bg-muted rounded-full hidden sm:block">
              Region: Central Asia (Optimal)
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-background/50">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
