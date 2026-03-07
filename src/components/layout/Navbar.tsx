import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth';
import { Button } from '../ui/button';
import { FlaskConical, LayoutDashboard, LogOut, Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export function Navbar() {
  const { isAuthenticated, signOut } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'kk', name: 'Қазақша', flag: '🇰🇿' },
  ] as const;

  return (
    <nav className="fixed top-0 w-full z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <FlaskConical className="w-8 h-8 text-secondary" />
          <span className="text-xl font-bold tracking-tight text-primary">BaiVax</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a href="/#features" className="text-sm font-medium hover:text-secondary transition-colors">{t('nav.features')}</a>
          <a href="/#pricing" className="text-sm font-medium hover:text-secondary transition-colors">{t('nav.pricing')}</a>
          <Link to="/documentation" className="text-sm font-medium hover:text-secondary transition-colors">{t('nav.docs')}</Link>
        </div>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <Globe className="w-4 h-4" />
                <span className="uppercase">{language}</span>
                <ChevronDown className="w-3 h-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languages.map((lang) => (
                <DropdownMenuItem 
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className="gap-2 cursor-pointer"
                >
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm" className="gap-2">
                  <LayoutDashboard className="w-4 h-4" />
                  {t('nav.dashboard')}
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={signOut} className="gap-2">
                <LogOut className="w-4 h-4" />
                {t('nav.signout')}
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/auth">
                <Button variant="ghost" size="sm">{t('nav.signin')}</Button>
              </Link>
              <Link to="/auth?mode=signup">
                <Button size="sm" className="bg-primary hover:bg-primary/90">{t('nav.getstarted')}</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
