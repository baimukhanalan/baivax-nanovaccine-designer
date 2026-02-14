import { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Search, Database, FlaskConical, Filter, Dna } from 'lucide-react';

const MOCK_STRAINS = [
  { id: 'S1', name: 'Influenza A (H1N1) - Almaty/2024', type: 'Virus', region: 'Kazakhstan', date: '2024-01-15' },
  { id: 'S2', name: 'SARS-CoV-2 (JN.1) - Tashkent/2023', type: 'Virus', region: 'Uzbekistan', date: '2023-11-20' },
  { id: 'S3', name: 'Hepatitis B (Genotype D) - Bishkek', type: 'Virus', region: 'Kyrgyzstan', date: '2023-09-05' },
  { id: 'S4', name: 'RSV Subtype A - Astana/2024', type: 'Virus', region: 'Kazakhstan', date: '2024-02-10' },
  { id: 'S5', name: 'LNP Formulation Alpha-V2', type: 'Nano-carrier', region: 'Global', date: '2024-02-01' },
];

export function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStrains = MOCK_STRAINS.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Strain & Design Library</h1>
            <p className="text-muted-foreground">Access 500+ local Central Asian strains and optimized designs.</p>
          </div>
          <Button className="gap-2">
            <Database className="w-4 h-4" />
            Request New Strain
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search strains, regions, or design types..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStrains.map((strain) => (
            <Card key={strain.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="p-2 bg-secondary/10 rounded-lg">
                    {strain.type === 'Virus' ? (
                      <Dna className="w-5 h-5 text-secondary" />
                    ) : (
                      <FlaskConical className="w-5 h-5 text-secondary" />
                    )}
                  </div>
                  <Badge variant="outline">{strain.type}</Badge>
                </div>
                <CardTitle className="text-lg mt-4">{strain.name}</CardTitle>
                <CardDescription>{strain.region}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Collected: {strain.date}</span>
                  <Button variant="link" size="sm" className="h-auto p-0 text-secondary">View FASTA</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
