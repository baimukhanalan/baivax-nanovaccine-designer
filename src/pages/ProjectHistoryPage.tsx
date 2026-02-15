import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blink, type Project } from '../lib/blink';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { 
  Search, 
  Filter, 
  Clock, 
  ArrowRight,
  Beaker,
  History,
  Download,
  Trash2,
  FlaskConical
} from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { toast } from 'react-hot-toast';
import { Input } from '../components/ui/input';

export function ProjectHistoryPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

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
      toast.error('Failed to load project history');
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await blink.db.projects.delete(id);
      setProjects(prev => prev.filter(p => p.id !== id));
      toast.success('Project deleted');
    } catch (error) {
      toast.error('Failed to delete project');
    }
  };

  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.virusStrain.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-3">
              <History className="w-8 h-8 text-secondary" />
              Project History
            </h2>
            <p className="text-muted-foreground">Comprehensive record of all your vaccine designs and analysis reports.</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search by name or strain..." 
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-2 w-full md:w-auto">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button variant="outline" className="gap-2 w-full md:w-auto">
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {loading ? (
            Array(5).fill(0).map((_, i) => (
              <div key={i} className="h-24 rounded-xl bg-white border animate-pulse" />
            ))
          ) : filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <Card key={project.id} className="hover:shadow-md transition-shadow group overflow-hidden">
                <div className="flex items-center p-6 gap-6">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                    <Beaker className="w-6 h-6" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-primary truncate group-hover:text-secondary transition-colors">
                        {project.name}
                      </h4>
                      <Badge variant={project.status === 'completed' ? 'success' : 'secondary'} className="text-[10px] uppercase">
                        {project.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <FlaskConical className="w-3 h-3" />
                        {project.virusStrain}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(project.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Link to={`/project/${project.id}`}>
                      <Button variant="outline" size="sm" className="gap-2">
                        View Details
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => deleteProject(project.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-muted-foreground/20">
              <History className="w-12 h-12 text-muted-foreground/20 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-primary mb-2">No projects found</h4>
              <p className="text-muted-foreground mb-6">Try adjusting your search or create a new design session.</p>
              <Link to="/new-project">
                <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                  New Vaccine Design
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
