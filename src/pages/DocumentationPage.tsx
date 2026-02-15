import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Book, FileText, Code, Database, Shield } from 'lucide-react';

export function DocumentationPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-32 pb-24">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-primary">Documentation</h1>
            <p className="text-xl text-muted-foreground">Technical guides and API references for the BaiVax platform.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Book className="w-5 h-5 text-secondary" />
                  Getting Started
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Learn how to set up your laboratory account and run your first vaccine design analysis.
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-secondary" />
                  FASTA Specifications
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Detailed requirements for genomic data uploads and supported viral sequence formats.
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-secondary" />
                  API Reference
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Connect your laboratory LIMS directly to our AI sequence optimization engine.
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-secondary" />
                  Strain Database
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Understand the methodology behind our Central Asian regional mutation tracking.
              </CardContent>
            </Card>
          </div>

          <div className="prose prose-slate max-w-none p-8 bg-white rounded-2xl border">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-primary mb-4">
              <Shield className="w-6 h-6 text-secondary" />
              Biosafety & Ethics
            </h2>
            <p className="text-muted-foreground mb-4">
              BaiVax operates in strict accordance with the Biological Weapons Convention and local biosafety regulations. 
              All sequence designs are screened for dual-use concerns before generation.
            </p>
            <h3 className="text-lg font-bold text-primary mb-2">Data Sovereignty</h3>
            <p className="text-muted-foreground">
              Genomic data uploaded to BaiVax remains the property of the originating institution. 
              We utilize encrypted enclaves to ensure that your intellectual property is never exposed to third parties.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
