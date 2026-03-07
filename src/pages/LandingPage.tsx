import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/button';
import { 
  ArrowRight, 
  FlaskConical, 
  Zap, 
  ShieldCheck, 
  Dna, 
  ChevronRight,
  Clock,
  DollarSign
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

export function LandingPage() {
  const { t } = useLanguage();
  const [timeValue, setTimeValue] = useState(12); // months
  const [costValue, setCostValue] = useState(500000); // dollars

  const calculateSavings = () => {
    const savedTime = timeValue * 0.8; // 80% time saving
    const savedCost = costValue * 0.7; // 70% cost saving
    return { savedTime, savedCost };
  };

  const { savedTime, savedCost } = calculateSavings();

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://v3b.fal.media/files/b/0a8e2afd/uvZ9PLT6VqURQVwMDTsii.png" 
            alt="Background" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-semibold mb-6">
              <Zap className="w-3 h-3" />
              <span>{t('hero.badge')}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-primary mb-6 leading-[1.1]">
              {t('hero.title1')} <br />
              <span className="text-secondary">{t('hero.title2')}</span> {t('hero.with_ai')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              {t('hero.desc')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/auth?mode=signup">
                <Button size="lg" className="h-12 px-8 text-lg gap-2 bg-primary hover:bg-primary/90">
                  {t('hero.cta')} <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/documentation">
                <Button variant="outline" size="lg" className="h-12 px-8 text-lg">
                  {t('hero.demo')}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">85%</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">{t('stats.faster')}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">70%</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">{t('stats.cost')}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">99.9%</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">{t('stats.fidelity')}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">50+</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">{t('stats.strains')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-primary rounded-3xl p-8 md:p-12 text-primary-foreground shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="relative z-10">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('calc.title')}</h2>
                <p className="text-primary-foreground/70">{t('calc.desc')}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <label className="text-sm font-medium flex justify-between">
                      {t('calc.timeline')} <span>{timeValue}{t('calc.months').toLowerCase()[0]}</span>
                    </label>
                    <input 
                      type="range" 
                      min="1" 
                      max="24" 
                      value={timeValue} 
                      onChange={(e) => setTimeValue(Number(e.target.value))}
                      className="w-full h-2 bg-primary-foreground/20 rounded-lg appearance-none cursor-pointer accent-secondary"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-sm font-medium flex justify-between">
                      {t('calc.budget')} <span>${costValue.toLocaleString()}</span>
                    </label>
                    <input 
                      type="range" 
                      min="50000" 
                      max="2000000" 
                      step="50000"
                      value={costValue} 
                      onChange={(e) => setCostValue(Number(e.target.value))}
                      className="w-full h-2 bg-primary-foreground/20 rounded-lg appearance-none cursor-pointer accent-secondary"
                    />
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/10">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary">
                        <Clock className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs text-primary-foreground/60 uppercase font-bold tracking-widest">{t('calc.saved_time')}</p>
                        <p className="text-2xl font-bold">{savedTime.toFixed(1)} {t('calc.months')}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary">
                        <DollarSign className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs text-primary-foreground/60 uppercase font-bold tracking-widest">{t('calc.saved_capital')}</p>
                        <p className="text-2xl font-bold">${savedCost.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">{t('features.title')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t('features.desc')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl border bg-white hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary mb-6">
                <Dna className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t('feat1.title')}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t('feat1.desc')}
              </p>
            </div>
            <div className="p-8 rounded-2xl border bg-white hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-6">
                <FlaskConical className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t('feat2.title')}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t('feat2.desc')}
              </p>
            </div>
            <div className="p-8 rounded-2xl border bg-white hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t('feat3.title')}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t('feat3.desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">{t('pricing.title')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-16">{t('pricing.desc')}</p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
            <div className="p-8 rounded-2xl border bg-white">
              <h3 className="font-bold text-xl mb-2">{t('pricing.plan1.title')}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-bold">$0</span>
                <span className="text-muted-foreground text-sm">/month</span>
              </div>
              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-secondary" /> {t('pricing.plan1.feat1')}</li>
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-secondary" /> {t('pricing.plan1.feat2')}</li>
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-secondary" /> {t('pricing.plan1.feat3')}</li>
              </ul>
              <Button variant="outline" className="w-full">{t('pricing.plan1.cta')}</Button>
            </div>

            <div className="p-8 rounded-2xl border bg-primary text-primary-foreground relative shadow-xl scale-105">
              <div className="absolute top-0 right-0 bg-secondary text-secondary-foreground text-[10px] font-bold px-2 py-1 rounded-bl-lg rounded-tr-xl uppercase">{t('pricing.popular')}</div>
              <h3 className="font-bold text-xl mb-2 text-white">{t('pricing.plan2.title')}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-bold">$499</span>
                <span className="text-muted-foreground text-sm">/month</span>
              </div>
              <ul className="space-y-3 mb-8 text-sm text-primary-foreground/80">
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-secondary" /> {t('pricing.plan2.feat1')}</li>
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-secondary" /> {t('pricing.plan2.feat2')}</li>
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-secondary" /> {t('pricing.plan2.feat3')}</li>
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-secondary" /> {t('pricing.plan2.feat4')}</li>
              </ul>
              <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground border-none">{t('pricing.plan2.cta')}</Button>
            </div>

            <div className="p-8 rounded-2xl border bg-white">
              <h3 className="font-bold text-xl mb-2">{t('pricing.plan3.title')}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-bold">Custom</span>
              </div>
              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-secondary" /> {t('pricing.plan3.feat1')}</li>
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-secondary" /> {t('pricing.plan3.feat2')}</li>
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-secondary" /> {t('pricing.plan3.feat3')}</li>
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-secondary" /> {t('pricing.plan3.feat4')}</li>
              </ul>
              <Button variant="outline" className="w-full">{t('pricing.plan3.cta')}</Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">{t('cta.title')}</h2>
          <p className="text-primary-foreground/70 mb-10 text-lg max-w-2xl mx-auto">
            {t('cta.desc')}
          </p>
          <Link to="/auth?mode=signup">
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground border-none h-14 px-10 text-lg">
              {t('cta.button')}
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
