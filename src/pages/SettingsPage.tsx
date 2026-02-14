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
  Loader2
} from 'lucide-react';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { useAuth } from '../hooks/use-auth';
import { toast } from 'react-hot-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

export function SettingsPage() {
  const { user } = useAuth();
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
            Account Settings
          </h2>
          <p className="text-muted-foreground">Manage your personal profile, notifications, and security preferences.</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-muted/50 p-1 rounded-xl">
            <TabsTrigger value="profile" className="gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <User className="w-4 h-4" /> Profile
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Shield className="w-4 h-4" /> Security
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Bell className="w-4 h-4" /> Notifications
            </TabsTrigger>
            <TabsTrigger value="billing" className="gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <DollarSign className="w-4 h-4" /> Billing
            </TabsTrigger>
            <TabsTrigger value="data" className="gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Database className="w-4 h-4" /> Data & Export
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="border-none shadow-xl">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your public profile details and professional affiliations.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-8 items-start">
                  <div className="shrink-0 space-y-4 text-center">
                    <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center text-4xl text-secondary-foreground font-bold shadow-lg shadow-secondary/20">
                      {displayName[0] || 'U'}
                    </div>
                    <Button variant="outline" size="sm">Change Avatar</Button>
                  </div>
                  
                  <div className="flex-1 space-y-4 w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" value={user?.email || ''} disabled />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="org">Organization</Label>
                        <Input id="org" placeholder="e.g., Nazarbayev University" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">Job Title</Label>
                        <Input id="role" placeholder="e.g., Lead Bio-informatician" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Professional Bio</Label>
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
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="border-none shadow-xl">
              <CardHeader>
                <CardTitle>Security & Privacy</CardTitle>
                <CardDescription>Configure authentication settings and API access.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 border rounded-xl">
                  <div className="space-y-1">
                    <p className="font-bold text-primary">Two-Factor Authentication</p>
                    <p className="text-xs text-muted-foreground">Add an extra layer of security to your account.</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-xl">
                  <div className="space-y-1">
                    <p className="font-bold text-primary">Biotech Export Approval</p>
                    <p className="text-xs text-muted-foreground">Require secondary approval for FASTA exports.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="space-y-4 pt-4 border-t">
                  <h4 className="font-bold text-primary">Change Password</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input type="password" placeholder="Current Password" />
                    <Input type="password" placeholder="New Password" />
                  </div>
                  <Button variant="outline">Update Password</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="border-none shadow-xl">
              <CardHeader>
                <CardTitle>Communication Preferences</CardTitle>
                <CardDescription>Control how you receive updates and report alerts.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { title: 'Analysis Complete', desc: 'Notify me when mRNA optimization is finished.' },
                  { title: 'Collaboration Invites', desc: 'Notify me when invited to join a research team.' },
                  { title: 'Weekly Reports', desc: 'Summary of time and capital saved across projects.' },
                  { title: 'System Security', desc: 'Alerts regarding login attempts and data access.' },
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
                <CardTitle>Subscription & Billing</CardTitle>
                <CardDescription>Manage your research plan and payment methods.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-6 bg-primary text-primary-foreground rounded-2xl flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-xs text-primary-foreground/60 uppercase font-bold tracking-widest">Current Plan</p>
                    <p className="text-2xl font-bold">Biotech Lab Pro</p>
                    <p className="text-sm text-primary-foreground/70">Next renewal: March 15, 2024</p>
                  </div>
                  <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 border-none">Upgrade Plan</Button>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold text-primary">Payment Methods</h4>
                  <div className="flex items-center justify-between p-4 border rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 bg-muted rounded flex items-center justify-center font-bold text-[10px]">VISA</div>
                      <div>
                        <p className="text-sm font-bold">•••• 4242</p>
                        <p className="text-xs text-muted-foreground">Expires 12/25</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data">
            <Card className="border-none shadow-xl">
              <CardHeader>
                <CardTitle>Research Data Management</CardTitle>
                <CardDescription>Export or manage your genomic research data.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-secondary/5 rounded-xl border border-secondary/20 flex items-start gap-4">
                  <Globe className="w-5 h-5 text-secondary mt-1 shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-primary">Region: Central Asia (KZ-East-01)</p>
                    <p className="text-xs text-muted-foreground">Your data is stored and processed according to local biosafety protocols.</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                    <span className="font-bold text-primary">Download All Data</span>
                    <span className="text-[10px] text-muted-foreground">Export as .zip (FASTA, SMILES, PDF)</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex-col gap-2 text-destructive hover:text-destructive">
                    <span className="font-bold">Purge Account</span>
                    <span className="text-[10px] opacity-70">Permanently delete all research history</span>
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
