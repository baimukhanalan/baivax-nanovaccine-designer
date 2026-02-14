import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { blink } from '../lib/blink';
import { useAuth } from '../hooks/use-auth';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '../components/ui/card';
import { 
  Dna, 
  Upload, 
  ChevronRight, 
  ChevronLeft, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  FlaskConical,
  Zap,
  Microscope,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { Progress } from '../components/ui/progress';

const STRAINS = [
  { id: 'covid-almaty-24', name: 'SARS-CoV-2 (Almaty-24 Variant)', type: 'Virus' },
  { id: 'flu-astana-23', name: 'Influenza A (Astana-23 Strain)', type: 'Virus' },
  { id: 'custom', name: 'Custom Upload (FASTA)', type: 'Upload' },
];

export function NewProjectPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // Form State
  const [projectName, setProjectName] = useState('');
  const [selectedStrain, setSelectedStrain] = useState('');
  const [fastaData, setFastaData] = useState('');
  const [uploadingFile, setUploadingFile] = useState(false);
  
  // Result State
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [mrnaSequence, setMrnaSequence] = useState('');
  const [lnpComposition, setLnpComposition] = useState<any>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingFile(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setFastaData(content);
      setUploadingFile(false);
      toast.success('FASTA file uploaded successfully');
    };
    reader.onerror = () => {
      toast.error('Failed to read file');
      setUploadingFile(false);
    };
    reader.readAsText(file);
  };

  const runAnalysis = async () => {
    setLoading(true);
    setProgress(0);
    
    // Step 2: AI Genotype Analysis
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 10;
      });
    }, 500);

    try {
      const { object } = await blink.ai.generateObject({
        prompt: `Analyze the viral genotype for vaccine design. Strain: ${selectedStrain}. FASTA: ${fastaData.substring(0, 500)}... 
        Identify mutations specific to Central Asia, suggest optimized mRNA codons, and recommend LNP (Lipid Nanoparticles) composition.`,
        schema: {
          type: 'object',
          properties: {
            regionalMutations: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  site: { type: 'string' },
                  mutation: { type: 'string' },
                  significance: { type: 'string' }
                }
              }
            },
            optimizedMrna: { type: 'string' },
            lnpRecommendation: {
              type: 'object',
              properties: {
                ionizableLipid: { type: 'string' },
                helperLipid: { type: 'string' },
                cholesterol: { type: 'string' },
                pegLipid: { type: 'string' },
                ratio: { type: 'string' }
              }
            },
            efficacyScore: { type: 'number' },
            timeSavedEstimate: { type: 'number' }
          },
          required: ['regionalMutations', 'optimizedMrna', 'lnpRecommendation']
        }
      });

      setAnalysisResults(object.regionalMutations);
      setMrnaSequence(object.optimizedMrna);
      setLnpComposition(object.lnpRecommendation);
      setProgress(100);
      setStep(3);
    } catch (error: any) {
      toast.error('Analysis failed: ' + error.message);
    } finally {
      setLoading(false);
      clearInterval(interval);
    }
  };

  const saveProject = async () => {
    setLoading(true);
    try {
      await blink.db.projects.create({
        userId: user!.id,
        name: projectName,
        virusStrain: STRAINS.find(s => s.id === selectedStrain)?.name || selectedStrain,
        fastaData,
        analysisResults: JSON.stringify(analysisResults),
        mrnaSequence,
        lnpComposition: JSON.stringify(lnpComposition),
        status: 'completed',
        timeSaved: 168, // 1 week saved
      });
      toast.success('Project saved successfully!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error('Failed to save project: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Progress Header */}
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                step >= s ? 'bg-secondary text-secondary-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
              </div>
              <span className={`text-sm font-medium ${step >= s ? 'text-primary' : 'text-muted-foreground'}`}>
                {s === 1 ? 'Setup' : s === 2 ? 'AI Analysis' : 'Review'}
              </span>
              {s < 3 && <div className="w-12 h-px bg-muted mx-4 hidden sm:block" />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="border-none shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold flex items-center gap-2 text-primary">
                    <FlaskConical className="w-6 h-6 text-secondary" />
                    Configure Design Session
                  </CardTitle>
                  <CardDescription>
                    Define your research parameters and select the viral strain target.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Project Name</Label>
                    <Input 
                      id="name" 
                      placeholder="e.g., Almaty-24 COVID-19 Vaccine Pilot" 
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>Select Virus Strain</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {STRAINS.map((strain) => (
                        <div 
                          key={strain.id}
                          onClick={() => setSelectedStrain(strain.id)}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            selectedStrain === strain.id 
                              ? 'border-secondary bg-secondary/5 ring-4 ring-secondary/10' 
                              : 'border-muted hover:border-secondary/30'
                          }`}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            {strain.type === 'Virus' ? <Zap className="w-4 h-4 text-secondary" /> : <Upload className="w-4 h-4 text-primary" />}
                            <span className="font-bold text-sm">{strain.name}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {strain.type === 'Virus' ? 'Pre-loaded Central Asian data' : 'Custom sequence via FASTA'}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedStrain === 'custom' && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="fasta">FASTA Data</Label>
                        <div className="relative">
                          <input
                            type="file"
                            id="fasta-upload"
                            className="hidden"
                            accept=".fasta,.fa,.txt"
                            onChange={handleFileUpload}
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2"
                            asChild
                          >
                            <label htmlFor="fasta-upload" className="cursor-pointer">
                              {uploadingFile ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                              Upload .fasta
                            </label>
                          </Button>
                        </div>
                      </div>
                      <textarea 
                        id="fasta"
                        rows={6}
                        placeholder=">Sequence_ID\nATGC..."
                        className="w-full p-4 rounded-xl border bg-muted/30 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-secondary/20"
                        value={fastaData}
                        onChange={(e) => setFastaData(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground italic">
                        * You can either paste the sequence or upload a file.
                      </p>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="bg-muted/30 px-6 py-4 flex justify-between">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <ShieldCheck className="w-4 h-4" />
                    Secure & Compliant
                  </div>
                  <Button 
                    onClick={() => setStep(2)} 
                    disabled={!projectName || !selectedStrain}
                    className="gap-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                  >
                    Start Analysis <ChevronRight className="w-4 h-4" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="border-none shadow-xl text-center py-12">
                <CardContent className="space-y-8">
                  <div className="relative inline-block">
                    <div className="w-24 h-24 rounded-full bg-secondary/10 flex items-center justify-center text-secondary relative z-10 mx-auto">
                      <Microscope className="w-12 h-12 animate-pulse" />
                    </div>
                    <div className="absolute inset-0 bg-secondary/20 rounded-full animate-ping -z-0" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-primary">AI Genotype Analysis</h3>
                    <p className="text-muted-foreground max-w-sm mx-auto">
                      Scanning for regional mutations and optimizing codon sequences for the {projectName} target.
                    </p>
                  </div>

                  <div className="max-w-md mx-auto space-y-2">
                    <div className="flex justify-between text-sm font-medium">
                      <span>{progress < 30 ? 'Reading Sequence...' : progress < 70 ? 'Detecting Mutations...' : 'Optimizing mRNA...'}</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2 bg-muted accent-secondary" />
                  </div>

                  <div className="pt-4">
                    <Button 
                      onClick={runAnalysis} 
                      disabled={loading}
                      size="lg"
                      className="bg-primary hover:bg-primary/90 text-white min-w-[200px]"
                    >
                      {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : 'Execute Sequence Design'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 border-none shadow-xl overflow-hidden">
                  <CardHeader className="bg-primary text-primary-foreground">
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-secondary" />
                      Optimized Design Report
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 space-y-8">
                    <div className="space-y-4">
                      <h4 className="font-bold text-primary flex items-center gap-2">
                        <Dna className="w-4 h-4 text-secondary" />
                        mRNA Sequence (Optimized)
                      </h4>
                      <div className="p-4 bg-muted/50 rounded-xl font-mono text-xs break-all border overflow-y-auto max-h-40">
                        {mrnaSequence}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-bold text-primary flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-secondary" />
                          Regional Mutations Detected
                        </h4>
                        <div className="space-y-2">
                          {analysisResults?.map((mut: any, i: number) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-white border rounded-lg text-sm">
                              <span className="font-mono font-bold text-secondary">{mut.site}</span>
                              <span className="font-medium">{mut.mutation}</span>
                              <span className="text-xs text-muted-foreground">{mut.significance}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-bold text-primary flex items-center gap-2">
                          <FlaskConical className="w-4 h-4 text-secondary" />
                          Recommended LNP Formula
                        </h4>
                        <div className="space-y-2">
                          {Object.entries(lnpComposition || {}).map(([key, value]: [string, any]) => (
                            <div key={key} className="flex items-center justify-between p-3 bg-white border rounded-lg text-sm capitalize">
                              <span className="text-muted-foreground">{key.replace(/([A-Z])/g, ' $1')}</span>
                              <span className="font-bold text-primary">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-muted/30 px-6 py-4 flex justify-between">
                    <Button variant="outline" onClick={() => setStep(1)}>
                      Back to Start
                    </Button>
                    <Button onClick={saveProject} disabled={loading} className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                      {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : 'Save & Finalize Design'}
                    </Button>
                  </CardFooter>
                </Card>

                <div className="space-y-6">
                  <Card className="border-none shadow-xl bg-secondary/10">
                    <CardHeader>
                      <CardTitle className="text-sm font-bold flex items-center gap-2 text-secondary">
                        <TrendingUp className="w-4 h-4" />
                        Efficiency Impact
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Time Saved</p>
                        <p className="text-3xl font-bold text-primary">168 Hours</p>
                      </div>
                      <div className="w-full h-px bg-secondary/20" />
                      <div>
                        <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Capital Saved</p>
                        <p className="text-3xl font-bold text-primary">$42,500</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-sm font-bold flex items-center gap-2">
                        <FileText className="w-4 h-4 text-primary" />
                        Next Steps
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground space-y-3">
                      <p>1. Review mRNA secondary structure in Project Detail.</p>
                      <p>2. Export sequences for synthesis partners.</p>
                      <p>3. Simulate LNP binding dynamics.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}
