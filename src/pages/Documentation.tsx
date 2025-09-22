import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, BookOpen, Video, Code, Users, ExternalLink } from 'lucide-react';

export default function Documentation() {
  const navigate = useNavigate();

  const sections = [
    {
      title: 'Getting Started',
      icon: BookOpen,
      description: 'Learn the basics of the Blue Carbon Registry system',
      items: [
        'What is Blue Carbon?',
        'System Overview',
        'User Registration',
        'First Plantation Submission'
      ]
    },
    {
      title: 'Video Tutorials',
      icon: Video,
      description: 'Step-by-step video guides for all major features',
      items: [
        'How to Submit Plantations',
        'Using the Monitoring System',
        'Understanding AI Validation',
        'Generating Reports'
      ]
    },
    {
      title: 'API Documentation',
      icon: Code,
      description: 'Technical documentation for developers',
      items: [
        'REST API Reference',
        'Authentication',
        'Data Models',
        'WebSocket Events'
      ]
    },
    {
      title: 'Community Guidelines',
      icon: Users,
      description: 'Best practices and community standards',
      items: [
        'Submission Guidelines',
        'Photography Standards',
        'Verification Process',
        'Credit System'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/')}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Home</span>
              </Button>
              <div className="w-px h-6 bg-border" />
              <h1 className="text-2xl font-bold">Documentation</h1>
            </div>
            <Button onClick={() => navigate('/auth')} variant="forest">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Blue Carbon Registry Docs</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to know about using our platform for mangrove restoration 
            and carbon credit management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {sections.map((section, index) => (
            <Card key={index} className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <section.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span>{section.title}</span>
                </CardTitle>
                <p className="text-muted-foreground">{section.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <li 
                      key={itemIndex}
                      className="flex items-center justify-between p-2 rounded hover:bg-muted/50 cursor-pointer"
                    >
                      <span className="text-sm">{item}</span>
                      <ExternalLink className="h-3 w-3 text-muted-foreground" />
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Links */}
        <div className="text-center space-y-6">
          <h3 className="text-2xl font-semibold">Quick Links</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => window.open('https://docs.lovable.dev', '_blank')}
              className="flex items-center space-x-2"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Platform Documentation</span>
            </Button>
            <Button 
              variant="outline"
              onClick={() => window.open('https://github.com/lovable-dev', '_blank')}
              className="flex items-center space-x-2"
            >
              <Code className="h-4 w-4" />
              <span>GitHub Repository</span>
            </Button>
            <Button 
              variant="outline"
              onClick={() => window.open('https://discord.gg/lovable', '_blank')}
              className="flex items-center space-x-2"
            >
              <Users className="h-4 w-4" />
              <span>Community Support</span>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}