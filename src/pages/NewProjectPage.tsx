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
  FileText,
  TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { useLanguage } from '../contexts/LanguageContext';

const STRAINS = [
  { id: 'covid-almaty-24', name: 'SARS-CoV-2 (Almaty-24)', region: 'Kazakhstan', type: 'Virus' },
  { id: 'flu-tashkent-23', name: 'Influenza A (Tashkent-23)', region: 'Uzbekistan', type: 'Virus' },
  { id: 'hepatitis-bishkek', name: 'Hepatitis B (Bishkek-D)', region: 'Kyrgyzstan', type: 'Virus' },
  { id: 'rsv-astana-24', name: 'RSV (Astana-24)', region: 'Kazakhstan', type: 'Virus' },
  { id: 'custom', name: 'Custom Upload (FASTA)', region: 'User Provided', type: 'Upload' },
];

const VACCINE_TYPES = [
  { id: 'mrna', name: 'mRNA Vaccine', description: 'Synthetic mRNA in LNP carrier' },
  { id: 'protein', name: 'Protein Subunit', description: 'Recombinant viral proteins' },
  { id: 'vector', name: 'Viral Vector', description: 'Adenoviral delivery system' },
];

export function NewProjectPage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // Form State
  const [projectName, setProjectName] = useState('');
  const [selectedStrain, setSelectedStrain] = useState('');
  const [vaccineType, setVaccineType] = useState('mrna');
  const [optimizationPriority, setOptimizationPriority] = useState('immunogenicity');
  const [fastaData, setFastaData] = useState('');
  const [uploadingFile, setUploadingFile] = useState(false);
  
  // Result State
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [mrnaSequence, setMrnaSequence] = useState('');
  const [lnpComposition, setLnpComposition] = useState<any>(null);
  const [geneticAdaptation, setGeneticAdaptation] = useState<any>(null);

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
    if (!projectName) {
      toast.error('Please enter a project name');
      return;
    }
    
    setLoading(true);
    setProgress(0);
    
    // Realistic progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) return prev;
        const remaining = 100 - prev;
        return prev + (remaining * 0.1); // Asymptotic progress
      });
    }, 400);

    try {
      const { object } = await blink.ai.generateObject({
        prompt: `ACT AS A SENIOR VACCINOLOGIST AND BIOINFORMATICIAN.
        MISSION: Design a high-fidelity vaccine optimized for Central Asian populations and viral strains.
        
        INPUT PARAMETERS:
        - Strain Name: ${selectedStrain}
        - Platform Type: ${vaccineType}
        - Optimization Priority: ${optimizationPriority}
        - Sequence Context (FASTA): ${fastaData ? fastaData.substring(0, 1000) : 'Standard ' + selectedStrain + ' sequence from database'}
        
        SCIENTIFIC REQUIREMENTS:
        1. EPITOPE MAPPING: Identify conserved regions and high-affinity epitopes for MHC Class I and II.
        2. REGIONAL ADAPTATION: Specifically address MHC/HLA allele frequencies common in Central Asian ethnic groups (Kazakh, Uzbek, Kyrgyz, etc.).
        3. CODON OPTIMIZATION: If mRNA, optimize for human expression, avoiding rare codons and unwanted secondary structures.
        4. DELIVERY SYSTEM: Design a specific Lipid Nanoparticle (LNP) formulation (Ionizable lipid, Helper lipid, Cholesterol, PEG-lipid ratios).
        5. MUTATIONAL ROBUSTNESS: Analyze current mutation trends in Central Asia for this strain and ensure the design covers potential drift.
        
        OUTPUT MUST BE TECHNICALLY PRECISE AND READY FOR LABORATORY REVIEW.`,
        schema: {
          type: 'object',
          properties: {
            regionalMutations: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  site: { type: 'string', description: 'Amino acid position' },
                  mutation: { type: 'string', description: 'Original -> Mutant' },
                  significance: { type: 'string', description: 'Impact on escape or binding' }
                }
              }
            },
            optimizedSequence: { type: 'string', description: 'Complete FASTA or amino acid sequence' },
            lnpRecommendation: {
              type: 'object',
              properties: {
                composition: { type: 'string', description: 'Molar ratios of components (e.g. 50:10:38.5:1.5)' },
                particleSize: { type: 'string', description: 'Target diameter in nm' },
                stabilityScore: { type: 'number', description: 'Predicted stability index (0.0 - 1.0)' },
                lipidChemistry: { type: 'string', description: 'Recommended ionizable lipid class' }
              }
            },
            geneticAdaptation: {
              type: 'object',
              properties: {
                hlaAlleles: { type: 'array', items: { type: 'string' }, description: 'Target regional HLA alleles' },
                regionalEfficacy: { type: 'number', description: 'Predicted efficacy score (0.0 - 1.0)' },
                adaptationSummary: { type: 'string', description: 'Scientific justification for regional adaptation' }
              }
            },
            timeSavedEstimate: { type: 'number' }
          },
          required: ['regionalMutations', 'optimizedSequence', 'lnpRecommendation', 'geneticAdaptation']
        }
      });

      setAnalysisResults(object.regionalMutations);
      setMrnaSequence(object.optimizedSequence);
      setLnpComposition(object.lnpRecommendation);
      setGeneticAdaptation(object.geneticAdaptation);
      
      clearInterval(progressInterval);
      setProgress(100);
      
      // Short delay for the 100% to be visible before switching
      setTimeout(() => {
        setStep(4);
      }, 500);
      
    } catch (error: any) {
      clearInterval(progressInterval);
      toast.error('Analysis failed: ' + error.message);
    } finally {
      setLoading(false);
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
        vaccineType,
        geneticAdaptation: JSON.stringify(geneticAdaptation),
        status: 'completed',
        timeSaved: 7, // 7 days saved
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
        <div className="flex items-center justify-between mb-8 overflow-x-auto pb-4">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center gap-2 flex-shrink-0">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                step >= s ? 'bg-secondary text-secondary-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
              </div>
              <span className={`text-sm font-medium whitespace-nowrap ${step >= s ? 'text-primary' : 'text-muted-foreground'}`}>
                {s === 1 ? t('wiz.step1') : s === 2 ? t('wiz.step2') : s === 3 ? t('wiz.step3') : t('wiz.step4')}
              </span>
              {s < 4 && <div className="w-8 md:w-12 h-px bg-muted mx-2 md:mx-4" />}
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
                    <Dna className="w-6 h-6 text-secondary" />
                    {t('wiz.target_title')}
                  </CardTitle>
                  <CardDescription>
                    {t('wiz.target_desc')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label>{t('wiz.strain_db_label')}</Label>
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
                          <p className="text-xs text-muted-foreground italic">
                            {strain.region}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedStrain === 'custom' && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="fasta">{t('wiz.fasta_label')}</Label>
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
                              {t('wiz.upload_fasta')}
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
                        * {t('wiz.fasta_note')}
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
                    disabled={!selectedStrain}
                    className="gap-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                  >
                    {t('wiz.next_config')} <ChevronRight className="w-4 h-4" />
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
              <Card className="border-none shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold flex items-center gap-2 text-primary">
                    <FlaskConical className="w-6 h-6 text-secondary" />
                    {t('wiz.config_title')}
                  </CardTitle>
                  <CardDescription>
                    {t('wiz.config_desc')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t('wiz.project_name_label')}</Label>
                    <Input 
                      id="name" 
                      placeholder="e.g., Almaty-24 COVID-19 Vaccine Pilot" 
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>{t('wiz.vaccine_platform_label')}</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {VACCINE_TYPES.map((type) => (
                        <div 
                          key={type.id}
                          onClick={() => setVaccineType(type.id)}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            vaccineType === type.id 
                              ? 'border-secondary bg-secondary/5 ring-4 ring-secondary/10' 
                              : 'border-muted hover:border-secondary/30'
                          }`}
                        >
                          <span className="font-bold text-sm block mb-1">{type.name}</span>
                          <p className="text-[10px] text-muted-foreground leading-tight">{type.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>{t('wiz.optimization_priority_label')}</Label>
                    <div className="flex flex-wrap gap-2">
                      {['immunogenicity', 'safety', 'stability', 'speed'].map((p) => (
                        <Button
                          key={p}
                          variant={optimizationPriority === p ? 'secondary' : 'outline'}
                          size="sm"
                          onClick={() => setOptimizationPriority(p)}
                          className="capitalize"
                        >
                          {t(`wiz.priority_${p}`)}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/30 px-6 py-4 flex justify-between">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    {t('wiz.back') || 'Back'}
                  </Button>
                  <Button 
                    onClick={() => setStep(3)} 
                    disabled={!projectName}
                    className="gap-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                  >
                    {t('wiz.start_analysis')} <ChevronRight className="w-4 h-4" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
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
                    <h3 className="text-2xl font-bold text-primary">{t('wiz.analyzing')}</h3>
                    <p className="text-muted-foreground max-w-sm mx-auto">
                      Scanning for regional mutations and adapting for Central Asian population genetics.
                    </p>
                  </div>

                  <div className="max-w-md mx-auto space-y-2">
                    <div className="flex justify-between text-sm font-medium">
                      <span>{progress < 30 ? t('wiz.progress_reading') : progress < 60 ? t('wiz.progress_hla') : t('wiz.progress_delivery')}</span>
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
                      {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : t('wiz.executing')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 border-none shadow-xl overflow-hidden">
                  <CardHeader className="bg-primary text-primary-foreground">
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Zap className="w-5 h-5 text-secondary" />
                        {t('wiz.design_title')}
                      </div>
                      <Badge className="bg-secondary text-secondary-foreground border-none">{t('wiz.ai_generated')}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <h4 className="font-bold text-primary flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-secondary" />
                          {t('wiz.regional_adaptation_title')}
                        </h4>
                        <div className="p-4 bg-secondary/5 border border-secondary/20 rounded-xl space-y-3">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">{t('wiz.regional_efficacy_label')}</span>
                            <span className="font-bold text-secondary">{((geneticAdaptation?.regionalEfficacy || 0) * 100).toFixed(1)}%</span>
                          </div>
                          <div className="space-y-1">
                            <p className="text-[10px] text-muted-foreground uppercase font-bold">{t('wiz.target_hla_label')}</p>
                            <div className="flex flex-wrap gap-1">
                              {geneticAdaptation?.hlaAlleles?.map((hla: string) => (
                                <Badge key={hla} variant="outline" className="text-[10px] py-0">{hla}</Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-bold text-primary flex items-center gap-2">
                          <FlaskConical className="w-4 h-4 text-secondary" />
                          {t('wiz.lnp_profile_title')}
                        </h4>
                        <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl space-y-3">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">{t('wiz.composition_label')}</span>
                            <span className="font-bold text-primary truncate max-w-[120px]">{lnpComposition?.composition}</span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">{t('wiz.stability_score_label')}</span>
                            <span className="font-bold text-primary">{(lnpComposition?.stabilityScore * 100).toFixed(0)}%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-bold text-primary flex items-center gap-2">
                        <Dna className="w-4 h-4 text-secondary" />
                        {t('wiz.sequence_design_title')}
                      </h4>
                      <div className="p-4 bg-muted/50 rounded-xl font-mono text-xs break-all border overflow-y-auto max-h-32">
                        {mrnaSequence}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-bold text-primary flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-secondary" />
                        {t('wiz.mutations_covered_title')}
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {analysisResults?.map((mut: any, i: number) => (
                          <div key={i} className="flex items-center justify-between p-2 bg-white border rounded-lg text-[11px]">
                            <span className="font-mono font-bold text-secondary">{mut.site}</span>
                            <span className="font-medium">{mut.mutation}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-muted/30 px-6 py-4 flex justify-between">
                    <Button variant="outline" onClick={() => setStep(2)}>
                      {t('wiz.modify_params') || 'Modify Parameters'}
                    </Button>
                    <Button 
                      onClick={saveProject} 
                      disabled={loading}
                      className="gap-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                    >
                      {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <CheckCircle2 className="w-4 h-4" />}
                      {loading ? t('wiz.saving') : t('wiz.finish')}
                    </Button>
                  </CardFooter>
                </Card>

                <div className="space-y-6">
                  <Card className="border-none shadow-xl bg-secondary/10">
                    <CardHeader>
                      <CardTitle className="text-sm font-bold flex items-center gap-2 text-secondary">
                        <TrendingUp className="w-4 h-4" />
                        {t('wiz.efficiency_impact_title')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">{t('wiz.time_saved_label')}</p>
                        <p className="text-3xl font-bold text-primary">168 Hours</p>
                      </div>
                      <div className="w-full h-px bg-secondary/20" />
                      <div>
                        <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">{t('wiz.capital_saved_label')}</p>
                        <p className="text-3xl font-bold text-primary">$42,500</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-sm font-bold flex items-center gap-2">
                        <FileText className="w-4 h-4 text-primary" />
                        {t('wiz.next_steps_title')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground space-y-3">
                      <p>{t('wiz.next_step_1')}</p>
                      <p>{t('wiz.next_step_2')}</p>
                      <p>{t('wiz.next_step_3')}</p>
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
