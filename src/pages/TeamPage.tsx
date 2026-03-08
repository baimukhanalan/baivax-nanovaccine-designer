import { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { 
  Users, 
  UserPlus, 
  Mail, 
  Shield, 
  MoreVertical,
  CheckCircle2,
  Globe,
  Lock
} from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { toast } from 'react-hot-toast';
import { Input } from '../components/ui/input';
import { useLanguage } from '../contexts/LanguageContext';

const INITIAL_MEMBERS = [
  { id: '1', name: 'Dr. Alibekov', email: 'alibekov@nu.edu.kz', role: 'Researcher', status: 'Active', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix' },
  { id: '2', name: 'Elena Petrova', email: 'epetrova@qazbiopharm.kz', role: 'Admin', status: 'Active', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena' },
  { id: '3', name: 'Kairat Nurotan', email: 'knurotan@santo.kz', role: 'Viewer', status: 'Pending', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kairat' },
];

export function TeamPage() {
  const { t } = useLanguage();
  const [members, setMembers] = useState(INITIAL_MEMBERS);
  const [inviteEmail, setInviteEmail] = useState('');

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;
    toast.success(`Invitation sent to ${inviteEmail}`);
    setInviteEmail('');
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-3">
              <Users className="w-8 h-8 text-secondary" />
              {t('team.title') || 'Team Management'}
            </h2>
            <p className="text-muted-foreground">{t('team.desc') || 'Collaborate with fellow researchers and manage organizational access.'}</p>
          </div>
          <Button className="gap-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground">
            <UserPlus className="w-4 h-4" />
            {t('team.inviteButton') || 'Invite Member'}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-none shadow-xl">
              <CardHeader>
                <CardTitle>{t('team.members.title') || 'Organization Members'}</CardTitle>
                <CardDescription>{t('team.members.desc') || 'A list of all users in your research laboratory.'}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {members.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 border rounded-xl bg-white hover:bg-muted/5 transition-colors">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-10 h-10 border-2 border-secondary/20">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>{member.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-bold text-primary">{member.name}</p>
                          <p className="text-xs text-muted-foreground">{member.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <div className="hidden sm:block">
                          <Badge variant="outline" className="gap-1">
                            <Shield className="w-3 h-3" />
                            {member.role}
                          </Badge>
                        </div>
                        <Badge variant={member.status === 'Active' ? 'success' : 'secondary'}>
                          {member.status}
                        </Badge>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="border-none shadow-xl bg-primary text-primary-foreground">
                <CardContent className="p-6 space-y-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                    <Globe className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-bold">{t('team.network.title') || 'Regional Network'}</h4>
                    <p className="text-xs text-primary-foreground/70">{t('team.network.desc') || 'You are connected to the Nazarbayev University Research Node.'}</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-none shadow-xl">
                <CardContent className="p-6 space-y-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                    <Lock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold">{t('team.access.title') || 'Access Control'}</h4>
                    <p className="text-xs text-muted-foreground">{t('team.access.desc') || 'All members have mandatory 2FA enabled for FASTA data security.'}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg">{t('team.inviteCard.title') || 'Quick Invite'}</CardTitle>
                <CardDescription>{t('team.inviteCard.desc') || 'Send a collaboration link to a researcher.'}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleInvite} className="space-y-4">
                  <div className="space-y-2">
                    <Input 
                      placeholder={t('team.inviteCard.placeholder') || 'email@example.kz'} 
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                    />
                  </div>
                  <Button className="w-full gap-2 bg-primary text-white" type="submit">
                    <Mail className="w-4 h-4" />
                    {t('team.inviteCard.button') || 'Send Invitation'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg">{t('team.roles.title') || 'Laboratory Roles'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-secondary mt-1 shrink-0" />
                  <div>
                    <p className="text-sm font-bold">{t('team.roles.admin.title') || 'Admin'}</p>
                    <p className="text-xs text-muted-foreground">{t('team.roles.admin.desc') || 'Full access to projects and billing.'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-secondary mt-1 shrink-0" />
                  <div>
                    <p className="text-sm font-bold">{t('team.roles.researcher.title') || 'Researcher'}</p>
                    <p className="text-xs text-muted-foreground">{t('team.roles.researcher.desc') || 'Can create and analyze vaccine designs.'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-secondary mt-1 shrink-0" />
                  <div>
                    <p className="text-sm font-bold">{t('team.roles.viewer.title') || 'Viewer'}</p>
                    <p className="text-xs text-muted-foreground">{t('team.roles.viewer.desc') || 'Read-only access to final reports.'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
