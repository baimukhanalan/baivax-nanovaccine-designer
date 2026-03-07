import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blink, type Project } from '../lib/blink';
import { useAuth } from '../hooks/use-auth';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { 
  Plus, 
  Search, 
  Filter, 
  Clock, 
  TrendingUp, 
  Activity,
  ArrowRight,
  MoreVertical,
  Beaker,
  FlaskConical
} from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { toast } from 'react-hot-toast';
import { useLanguage } from '../contexts/LanguageContext';

export function DashboardPage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await blink.db.projects.list({
        orderBy: { createdAt: 'desc' }
      });
      setProjects(data as Project[]);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { 
      label: t('dash.stats.projects'), 
      value: projects.length, 
      icon: FlaskConical, 
      color: 'text-secondary bg-secondary/10' 
    },
    { 
      label: t('dash.stats.time'), 
      value: `${projects.reduce((acc, p) => acc + (p.timeSaved || 0), 0).toFixed(1)} Days`, 
      icon: Clock, 
      color: 'text-accent bg-accent/10' 
    },
    { 
      label: t('dash.stats.adaptation'), 
      value: '100%', 
      icon: TrendingUp, 
      color: 'text-green-600 bg-green-600/10' 
    },
    { 
      label: 'Success Rate', 
      value: '94%', 
      icon: Activity, 
      color: 'text-blue-600 bg-blue-600/10' 
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-primary">{t('dash.welcome')} {user?.displayName?.split(' ')[0] || 'Researcher'}</h2>
            <p className="text-muted-foreground">Monitor your vaccine designs and research progress.</p>
          </div>
          <Link to="/new-project">
            <Button className="gap-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-lg shadow-secondary/20">
              <Plus className="w-4 h-4" />
              {t('dash.new_project')}
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-none shadow-sm">
              <CardContent className="p-6 flex items-center gap-4">
                <div className={`p-3 rounded-xl ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-primary">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Projects */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-primary">{t('dash.recent_projects')}</h3>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search projects..." 
                  className="pl-9 pr-4 py-2 bg-white border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-secondary/20 w-64"
                />
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {loading ? (
              Array(4).fill(0).map((_, i) => (
                <div key={i} className="h-40 rounded-2xl bg-white border animate-pulse" />
              ))
            ) : projects.length > 0 ? (
              projects.map((project) => (
                <Link key={project.id} to={`/project/${project.id}`}>
                  <Card className="hover:shadow-md transition-shadow group">
                    <CardHeader className="flex flex-row items-start justify-between p-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-lg group-hover:text-secondary transition-colors">
                            {project.name}
                          </CardTitle>
                          <Badge variant={project.status === 'completed' ? 'success' : 'secondary'} className="text-[10px] uppercase">
                            {project.status}
                          </Badge>
                        </div>
                        <CardDescription className="flex items-center gap-2">
                          <Beaker className="w-3 h-3" />
                          {project.virusStrain}
                        </CardDescription>
                      </div>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </CardHeader>
                    <CardContent className="px-6 pb-6 pt-0">
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex -space-x-2">
                          {Array(3).fill(0).map((_, i) => (
                            <div key={i} className="w-7 h-7 rounded-full border-2 border-white bg-muted flex items-center justify-center text-[10px] font-bold">
                              {String.fromCharCode(65 + i)}
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(project.createdAt).toLocaleDateString()}
                          </span>
                          <span className="text-secondary font-semibold">
                            Details <ArrowRight className="w-3 h-3 inline ml-1" />
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            ) : (
              <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-muted-foreground/20">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4 text-muted-foreground/40">
                  <Plus className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-semibold text-primary mb-2">No projects yet</h4>
                <p className="text-muted-foreground mb-6">Start your first vaccine design optimized for Central Asian strains.</p>
                <Link to="/new-project">
                  <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                    Create New Design
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
