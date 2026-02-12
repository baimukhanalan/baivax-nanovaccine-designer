import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth';
import { Button } from '../ui/button';
import { FlaskConical, LayoutDashboard, User, LogOut } from 'lucide-react';

export function Navbar() {
  const { isAuthenticated, user, signOut } = useAuth();

  return (
    <nav className="fixed top-0 w-full z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <FlaskConical className="w-8 h-8 text-secondary" />
          <span className="text-xl font-bold tracking-tight text-primary">VacuAI.kz</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/pricing" className="text-sm font-medium hover:text-secondary transition-colors">Pricing</Link>
          <Link to="/about" className="text-sm font-medium hover:text-secondary transition-colors">About</Link>
          <Link to="/documentation" className="text-sm font-medium hover:text-secondary transition-colors">Docs</Link>
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm" className="gap-2">
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={signOut} className="gap-2">
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/auth">
                <Button variant="ghost" size="sm">Sign In</Button>
              </Link>
              <Link to="/auth?mode=signup">
                <Button size="sm" className="bg-primary hover:bg-primary/90">Get Started</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
