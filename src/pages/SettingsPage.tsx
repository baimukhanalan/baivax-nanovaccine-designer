import { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '../components/ui/card';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Database,
  Globe,
  Save,
  Loader2,
  DollarSign
} from 'lucide-react';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { useAuth } from '../hooks/use-auth';
import { toast } from 'react-hot-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useLanguage } from '../contexts/LanguageContext';

export function SettingsPage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  
  const handleSaveProfile = async () => {
    setLoading(true);
    // Simulate save
    await new Promise(r => setTimeout(r, 1000));
    toast.success('Profile updated successfully');
    setLoading(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-3">
            <SettingsIcon className="w-8 h-8 text-secondary" />
            {t('settings.title')}
          </h2>
          <p className="text-muted-foreground">{t('settings.desc')}</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-muted/50 p-1 rounded-xl">
            <TabsTrigger value="profile" className="gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <User className="w-4 h-4" /> {t('settings.tabs.profile')}
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Shield className="w-4 h-4" /> {t('settings.tabs.security')}
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Bell className="w-4 h-4" /> {t('settings.tabs.notifications')}
            </TabsTrigger>
            <TabsTrigger value="billing" className="gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <DollarSign className="w-4 h-4" /> {t('settings.tabs.billing')}
            </TabsTrigger>
            <TabsTrigger value="data" className="gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Database className="w-4 h-4" /> {t('settings.tabs.data')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="border-none shadow-xl">
              <CardHeader>
                <CardTitle>{t('settings.profile.title')}</CardTitle>
                <CardDescription>{t('settings.profile.desc')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-8 items-start">
                  <div className="shrink-0 space-y-4 text-center">
                    <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center text-4xl text-secondary-foreground font-bold shadow-lg shadow-secondary/20">
                      {displayName[0] || 'U'}
                    </div>
                    <Button variant="outline" size="sm">{t('settings.profile.changeAvatar')}</Button>
                  </div>
                  
                  <div className="flex-1 space-y-4 w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">{t('settings.profile.fullName')}</Label>
                        <Input 
                          id="name" 
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">{t('settings.profile.emailAddress')}</Label>
                        <Input id="email" value={user?.email || ''} disabled />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="org">{t('settings.profile.organization')}</Label>
                        <Input id="org" placeholder="e.g., Nazarbayev University" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">{t('settings.profile.jobTitle')}</Label>
                        <Input id="role" placeholder="e.g., Lead Bio-informatician" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">{t('settings.profile.professionalBio')}</Label>
                      <textarea 
                        id="bio"
                        className="w-full p-4 rounded-xl border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/20 h-24"
                        placeholder="Tell us about your research focus..."
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/30 px-6 py-4 flex justify-end">
                <Button onClick={handleSaveProfile} disabled={loading} className="gap-2 bg-secondary text-secondary-foreground">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {t('settings.save')}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="border-none shadow-xl">
              <CardHeader>
                <CardTitle>{t('settings.security.title')}</CardTitle>
                <CardDescription>{t('settings.security.desc')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 border rounded-xl">
                  <div className="space-y-1">
                    <p className="font-bold text-primary">{t('settings.security.twoFactorAuth')}</p>
                    <p className="text-xs text-muted-foreground">{t('settings.security.twoFactorAuthDesc')}</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-xl">
                  <div className="space-y-1">
                    <p className="font-bold text-primary">{t('settings.security.biotechExportApproval')}</p>
                    <p className="text-xs text-muted-foreground">{t('settings.security.biotechExportApprovalDesc')}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="space-y-4 pt-4 border-t">
                  <h4 className="font-bold text-primary">{t('settings.security.changePassword')}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input type="password" placeholder={t('settings.security.currentPassword')} />
                    <Input type="password" placeholder={t('settings.security.newPassword')} />
                  </div>
                  <Button variant="outline">{t('settings.security.updatePassword')}</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="border-none shadow-xl">
              <CardHeader>
                <CardTitle>{t('settings.notifications.title')}</CardTitle>
                <CardDescription>{t('settings.notifications.desc')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { title: t('settings.notifications.analysisComplete.title'), desc: t('settings.notifications.analysisComplete.desc') },
                  { title: t('settings.notifications.collaborationInvites.title'), desc: t('settings.notifications.collaborationInvites.desc') },
                  { title: t('settings.notifications.weeklyReports.title'), desc: t('settings.notifications.weeklyReports.desc') },
                  { title: t('settings.notifications.systemSecurity.title'), desc: t('settings.notifications.systemSecurity.desc') },
                ].map((pref, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-xl">
                    <div className="space-y-1">
                      <p className="font-bold text-primary">{pref.title}</p>
                      <p className="text-xs text-muted-foreground">{pref.desc}</p>
                    </div>
                    <Switch defaultChecked={i < 2} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing">
            <Card className="border-none shadow-xl">
              <CardHeader>
                <CardTitle>{t('settings.billing.title')}</CardTitle>
                <CardDescription>{t('settings.billing.desc')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-6 bg-primary text-primary-foreground rounded-2xl flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-xs text-primary-foreground/60 uppercase font-bold tracking-widest">{t('settings.billing.currentPlan')}</p>
                    <p className="text-2xl font-bold">Biotech Lab Pro</p>
                    <p className="text-sm text-primary-foreground/70">Next renewal: March 15, 2024</p>
                  </div>
                  <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 border-none">{t('settings.billing.upgradePlan')}</Button>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold text-primary">{t('settings.billing.paymentMethods')}</h4>
                  <div className="flex items-center justify-between p-4 border rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 bg-muted rounded flex items-center justify-center font-bold text-[10px]">VISA</div>
                      <div>
                        <p className="text-sm font-bold">•••• 4242</p>
                        <p className="text-xs text-muted-foreground">Expires 12/25</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">{t('settings.edit')}</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data">
            <Card className="border-none shadow-xl">
              <CardHeader>
                <CardTitle>{t('settings.data.title')}</CardTitle>
                <CardDescription>{t('settings.data.desc')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-secondary/5 rounded-xl border border-secondary/20 flex items-start gap-4">
                  <Globe className="w-5 h-5 text-secondary mt-1 shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-primary">{t('settings.data.region')}</p>
                    <p className="text-xs text-muted-foreground">{t('settings.data.regionDesc')}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                    <span className="font-bold text-primary">{t('settings.data.downloadAllData')}</span>
                    <span className="text-[10px] text-muted-foreground">Export as .zip (FASTA, SMILES, PDF)</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex-col gap-2 text-destructive hover:text-destructive">
                    <span className="font-bold">{t('settings.data.purgeAccount')}</span>
                    <span className="text-[10px] opacity-70">{t('settings.data.purgeAccountDesc')}</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
