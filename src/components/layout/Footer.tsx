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
              <li><Link to="/strains" className="hover:text-secondary">Strain Database</Link></li>
              <li><Link to="/analytics" className="hover:text-secondary">Analytics</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              <li><Link to="/about" className="hover:text-secondary">About Us</Link></li>
              <li><Link to="/pricing" className="hover:text-secondary">Pricing</Link></li>
              <li><Link to="/careers" className="hover:text-secondary">Careers</Link></li>
              <li><Link to="/contact" className="hover:text-secondary">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              <li><Link to="/privacy" className="hover:text-secondary">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-secondary">Terms of Service</Link></li>
              <li><Link to="/compliance" className="hover:text-secondary">Compliance</Link></li>
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
