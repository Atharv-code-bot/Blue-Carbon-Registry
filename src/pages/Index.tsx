import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Leaf, TreePine, Shield, Globe, ArrowRight, Users, BarChart3 } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen gradient-subtle">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <Leaf className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm">Blue Carbon Registry</span>
                <span className="text-xs text-muted-foreground">MRV System</span>
              </div>
            </div>
            <Button onClick={() => navigate('/auth')} variant="forest">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Shield className="h-4 w-4" />
                <span>Blockchain-Powered Carbon Registry</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Protecting Our
                <span className="gradient-primary bg-clip-text text-transparent block">
                  Blue Planet
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Join the world's first AI-powered blue carbon monitoring system. Track, verify, and trade 
                mangrove restoration credits with complete transparency.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" variant="forest" onClick={() => navigate('/auth')}>
                Start Contributing
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate('/docs')}
              >
                View Documentation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">2.5M+</div>
              <div className="text-muted-foreground">Trees Planted</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-secondary">15,000</div>
              <div className="text-muted-foreground">Hectares Restored</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-accent">500+</div>
              <div className="text-muted-foreground">Communities</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-success">45.2K</div>
              <div className="text-muted-foreground">Credits Issued</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Revolutionary Technology</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Combining AI, blockchain, and satellite monitoring for unprecedented accuracy
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-xl border border-border hover-lift">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">AI Fraud Detection</h3>
              <p className="text-muted-foreground leading-relaxed">
                Advanced machine learning algorithms detect anomalies and prevent fraudulent submissions with 99.7% accuracy.
              </p>
            </div>
            
            <div className="p-8 rounded-xl border border-border hover-lift">
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-6">
                <Globe className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Satellite Monitoring</h3>
              <p className="text-muted-foreground leading-relaxed">
                Real-time NDVI analysis and vegetation health monitoring using latest satellite imagery data.
              </p>
            </div>
            
            <div className="p-8 rounded-xl border border-border hover-lift">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-6">
                <BarChart3 className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Blockchain Transparency</h3>
              <p className="text-muted-foreground leading-relaxed">
                Immutable records and smart contracts ensure complete transparency in carbon credit issuance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-primary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Make an Impact?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8">
            Join thousands of communities working together to restore our blue carbon ecosystems
          </p>
          <Button size="lg" variant="secondary" onClick={() => navigate('/auth')}>
            Join Blue Carbon Registry
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 rounded gradient-primary flex items-center justify-center">
                <Leaf className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">Blue Carbon Registry</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 National Centre for Carbon Registry. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
