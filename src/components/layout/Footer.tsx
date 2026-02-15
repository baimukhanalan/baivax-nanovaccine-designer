import { FlaskConical } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <FlaskConical className="w-8 h-8 text-secondary" />
              <span className="text-xl font-bold tracking-tight">BaiVax</span>
            </Link>
            <p className="text-sm text-primary-foreground/60 max-w-xs">
              Next-generation AI platform for vaccine design, enabling scientists to create optimized vaccines in minutes with a focus on nano-delivery and Central Asian strains.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              <li><Link to="/dashboard" className="hover:text-secondary">Dashboard</Link></li>
              <li><Link to="/new-project" className="hover:text-secondary">Design Wizard</Link></li>
              <li><Link to="/library" className="hover:text-secondary">Strain Library</Link></li>
              <li><Link to="/history" className="hover:text-secondary">Project History</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              <li><a href="/#features" className="hover:text-secondary">Features</a></li>
              <li><a href="/#pricing" className="hover:text-secondary">Pricing</a></li>
              <li><Link to="/documentation" className="hover:text-secondary">Documentation</Link></li>
              <li><Link to="/team" className="hover:text-secondary">Team</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              <li><span className="hover:text-secondary cursor-pointer">Privacy Policy</span></li>
              <li><span className="hover:text-secondary cursor-pointer">Terms of Service</span></li>
              <li><span className="hover:text-secondary cursor-pointer">Compliance</span></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center text-sm text-primary-foreground/40">
          <p>© {new Date().getFullYear()} BaiVax. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
