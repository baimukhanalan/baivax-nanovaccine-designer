import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blink, type Project } from '../lib/blink';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { 
  Dna, 
  FlaskConical, 
  Download, 
  Share2, 
  History, 
  ChevronLeft,
  Zap,
  ShieldCheck,
  FileText,
  AlertCircle,
  Clock,
  ArrowUpRight,
  Database
} from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { MoleculeViewer } from '../components/biotech/MoleculeViewer';
import { toast } from 'react-hot-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

export function ProjectDetailPage() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchProject(id);
  }, [id]);

  const fetchProject = async (projectId: string) => {
    try {
      const data = await blink.db.projects.get(projectId);
      if (data) {
        setProject(data as Project);
      }
    } catch (error) {
      console.error('Failed to fetch project:', error);
      toast.error('Project not found');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex h-64 items-center justify-center">
          <Clock className="w-8 h-8 animate-spin text-secondary" />
        </div>
      </DashboardLayout>
    );
  }

  if (!project) {
    return (
      <DashboardLayout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold">Project not found</h2>
          <Link to="/dashboard">
            <Button className="mt-4">Back to Dashboard</Button>
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const analysis = JSON.parse(project.analysisResults || '[]');
  const lnp = JSON.parse(project.lnpComposition || '{}');

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <Link to="/dashboard" className="text-xs font-medium text-muted-foreground hover:text-secondary flex items-center gap-1 mb-2">
              <ChevronLeft className="w-3 h-3" />
              Back to Projects
            </Link>
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-bold tracking-tight text-primary">{project.name}</h2>
              <Badge variant="success" className="uppercase text-[10px]">Completed</Badge>
            </div>
            <p className="text-muted-foreground flex items-center gap-2">
              <Zap className="w-4 h-4 text-secondary" />
              Target: {project.virusStrain}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <Share2 className="w-4 h-4" />
              Share
            </Button>
            <Button className="gap-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground">
              <Download className="w-4 h-4" />
              Export FASTA
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Visualizer */}
            <Card className="border-none shadow-xl overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-primary text-white">
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <Database className="w-4 h-4 text-secondary" />
                  Structural Visualization
                </CardTitle>
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-white border-white/20">3D</Badge>
                  <Badge variant="outline" className="text-white border-white/20">Interactive</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <MoleculeViewer />
              </CardContent>
            </Card>

            {/* Detailed Analysis */}
            <Tabs defaultValue="sequence" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-muted/50 p-1">
                <TabsTrigger value="sequence">mRNA Sequence</TabsTrigger>
                <TabsTrigger value="mutations">Mutations</TabsTrigger>
                <TabsTrigger value="lnp">LNP Formulation</TabsTrigger>
              </TabsList>
              
              <TabsContent value="sequence" className="mt-6">
                <Card className="border-none shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                      <Dna className="w-5 h-5 text-secondary" />
                      Optimized mRNA Sequence
                    </CardTitle>
                    <CardDescription>
                      Codon-optimized for maximum expression stability.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="p-6 bg-muted/30 rounded-xl font-mono text-sm break-all border leading-relaxed">
                      {project.mrnaSequence}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="mutations" className="mt-6">
                <Card className="border-none shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-secondary" />
                      Regional Mutation Analysis
                    </CardTitle>
                    <CardDescription>
                      Genetic variants identified for Central Asian strains.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analysis.map((mut: any, i: number) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-white border rounded-xl hover:border-secondary transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center font-mono font-bold text-secondary text-xs">
                              {mut.site}
                            </div>
                            <div>
                              <p className="font-bold text-primary">{mut.mutation}</p>
                              <p className="text-xs text-muted-foreground">{mut.significance}</p>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-[10px]">Critical</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="lnp" className="mt-6">
                <Card className="border-none shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                      <FlaskConical className="w-5 h-5 text-secondary" />
                      Lipid Nanoparticle Composition
                    </CardTitle>
                    <CardDescription>
                      AI-recommended carrier system for optimal delivery.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(lnp).map(([key, value]: [string, any]) => (
                        <div key={key} className="p-4 bg-white border rounded-xl flex items-center justify-between">
                          <span className="text-sm text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                          <span className="font-bold text-primary">{value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <Card className="border-none shadow-xl bg-primary text-primary-foreground">
              <CardHeader>
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <Zap className="w-4 h-4 text-secondary" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-end">
                  <p className="text-xs text-primary-foreground/60 uppercase font-bold tracking-widest">Efficiency</p>
                  <p className="text-2xl font-bold">98.2%</p>
                </div>
                <div className="flex justify-between items-end">
                  <p className="text-xs text-primary-foreground/60 uppercase font-bold tracking-widest">Time Savings</p>
                  <p className="text-2xl font-bold">168h</p>
                </div>
                <div className="w-full h-px bg-white/10" />
                <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground border-none gap-2">
                  <History className="w-4 h-4" />
                  View Build History
                </Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-secondary" />
                  Compliance & Safety
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  GDPR & HIPAA Compliant
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  End-to-End Encryption
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  ISO 27001 Certified
                </div>
                <Button variant="ghost" className="w-full justify-start p-0 h-auto text-secondary text-xs hover:bg-transparent hover:underline">
                  Download Security Report <ArrowUpRight className="w-3 h-3 ml-1" />
                </Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" />
                  Documentation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" size="sm" className="w-full justify-start text-xs gap-2">
                  <Download className="w-3 h-3" />
                  Download Protocol PDF
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start text-xs gap-2">
                  <Download className="w-3 h-3" />
                  SMILES Notation
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
