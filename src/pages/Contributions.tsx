import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Calendar, TreePine, Eye, Filter, Download, Search } from 'lucide-react';

export default function Contributions() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const contributions = [
    {
      id: 'SUB-2024-001',
      title: 'Sundarbans Restoration Phase 2',
      location: 'Sundarbans, West Bengal',
      area: 2.5,
      treeCount: 1250,
      species: ['Rhizophora mucronata', 'Avicennia marina'],
      submissionDate: '2024-01-15',
      verificationDate: '2024-01-18',
      status: 'verified',
      credits: 450,
      tokens: 225,
      aiValidation: {
        fraudScore: 95,
        ndviHealth: 88,
        treeSurvival: 92
      },
      images: 8,
      droneFootage: true
    },
    {
      id: 'SUB-2024-002',
      title: 'Coastal Mangrove Initiative',
      location: 'Odisha Coast',
      area: 1.8,
      treeCount: 900,
      species: ['Sonneratia alba', 'Bruguiera gymnorrhiza'],
      submissionDate: '2024-01-10',
      verificationDate: null,
      status: 'under_review',
      credits: 0,
      tokens: 0,
      aiValidation: {
        fraudScore: 87,
        ndviHealth: 0,
        treeSurvival: 0
      },
      images: 12,
      droneFootage: false
    },
    {
      id: 'SUB-2024-003',
      title: 'Community Restoration Project',
      location: 'Kerala Backwaters',
      area: 3.2,
      treeCount: 1600,
      species: ['Ceriops decandra', 'Excoecaria agallocha'],
      submissionDate: '2024-01-05',
      verificationDate: null,
      status: 'pending',
      credits: 0,
      tokens: 0,
      aiValidation: {
        fraudScore: 0,
        ndviHealth: 0,
        treeSurvival: 0
      },
      images: 6,
      droneFootage: true
    },
    {
      id: 'SUB-2023-045',
      title: 'Wetland Conservation Phase 1',
      location: 'Tamil Nadu Coast',
      area: 1.2,
      treeCount: 600,
      species: ['Rhizophora mucronata'],
      submissionDate: '2023-12-20',
      verificationDate: '2023-12-23',
      status: 'verified',
      credits: 220,
      tokens: 110,
      aiValidation: {
        fraudScore: 91,
        ndviHealth: 85,
        treeSurvival: 89
      },
      images: 5,
      droneFootage: false
    },
    {
      id: 'SUB-2023-038',
      title: 'Urban Mangrove Expansion',
      location: 'Mumbai, Maharashtra',
      area: 0.8,
      treeCount: 400,
      species: ['Avicennia marina'],
      submissionDate: '2023-12-15',
      verificationDate: null,
      status: 'rejected',
      credits: 0,
      tokens: 0,
      aiValidation: {
        fraudScore: 45,
        ndviHealth: 0,
        treeSurvival: 0
      },
      images: 3,
      droneFootage: false
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-success/10 text-success border-success/20">Verified</Badge>;
      case 'under_review':
        return <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">Under Review</Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-muted/10 text-muted-foreground">Pending</Badge>;
      case 'rejected':
        return <Badge variant="destructive" className="bg-destructive/10 text-destructive border-destructive/20">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getValidationScore = (score: number) => {
    if (score === 0) return { color: 'text-muted-foreground', label: 'Pending' };
    if (score >= 90) return { color: 'text-success', label: 'Excellent' };
    if (score >= 70) return { color: 'text-warning', label: 'Good' };
    return { color: 'text-destructive', label: 'Poor' };
  };

  const filteredContributions = contributions.filter(contribution => {
    const matchesStatus = filterStatus === 'all' || contribution.status === filterStatus;
    const matchesSearch = contribution.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contribution.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalStats = {
    totalSubmissions: contributions.length,
    verified: contributions.filter(c => c.status === 'verified').length,
    totalCredits: contributions.reduce((sum, c) => sum + c.credits, 0),
    totalTokens: contributions.reduce((sum, c) => sum + c.tokens, 0),
    totalArea: contributions.reduce((sum, c) => sum + c.area, 0),
    totalTrees: contributions.reduce((sum, c) => sum + c.treeCount, 0)
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">My Contributions</h1>
              <p className="text-muted-foreground">
                Track your plantation submissions and carbon credit earnings
              </p>
            </div>
            <Button variant="outline" onClick={() => {
              const csvContent = `ID,Title,Location,Area,Trees,Credits,Status,Date\n${contributions.map(c => 
                `${c.id},"${c.title}","${c.location}",${c.area},${c.treeCount},${c.credits},${c.status},${c.submissionDate}`
              ).join('\n')}`;
              const blob = new Blob([csvContent], { type: 'text/csv' });
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'contributions-report.csv';
              a.click();
              window.URL.revokeObjectURL(url);
            }}>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Card>
              <CardContent className="pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{totalStats.totalSubmissions}</div>
                  <div className="text-xs text-muted-foreground">Total Submissions</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">{totalStats.verified}</div>
                  <div className="text-xs text-muted-foreground">Verified</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">{totalStats.totalCredits.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Credits Earned</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">{totalStats.totalTokens.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Tokens Earned</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{totalStats.totalArea}</div>
                  <div className="text-xs text-muted-foreground">Hectares Restored</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">{totalStats.totalTrees.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Trees Planted</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search contributions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="verified">Verified</SelectItem>
                    <SelectItem value="under_review">Under Review</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Contributions List */}
          <div className="grid grid-cols-1 gap-6">
            {filteredContributions.map((contribution) => (
              <Card key={contribution.id} className="hover-lift">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h3 className="text-lg font-semibold">{contribution.title}</h3>
                        <div className="flex items-center text-sm text-muted-foreground space-x-4">
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{contribution.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>Submitted {new Date(contribution.submissionDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(contribution.status)}
                        <Button variant="outline" size="sm" onClick={() => {
                          // Mock detailed view - in real app would open modal or navigate to detail page
                          alert(`Viewing details for ${contribution.title}\n\nSubmission ID: ${contribution.id}\nStatus: ${contribution.status}\nCredits: ${contribution.credits}\nTokens: ${contribution.tokens}\n\nAI Validation:\n- Fraud Score: ${contribution.aiValidation.fraudScore}%\n- NDVI Health: ${contribution.aiValidation.ndviHealth}%\n- Tree Survival: ${contribution.aiValidation.treeSurvival}%`);
                        }}>
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <div className="text-lg font-semibold">{contribution.area} ha</div>
                        <div className="text-xs text-muted-foreground">Area Restored</div>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <div className="text-lg font-semibold flex items-center justify-center space-x-1">
                          <TreePine className="h-4 w-4" />
                          <span>{contribution.treeCount.toLocaleString()}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">Trees Planted</div>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <div className={`text-lg font-semibold ${contribution.credits > 0 ? 'text-success' : 'text-muted-foreground'}`}>
                          {contribution.credits || '-'}
                        </div>
                        <div className="text-xs text-muted-foreground">Credits Earned</div>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <div className={`text-lg font-semibold ${contribution.tokens > 0 ? 'text-primary' : 'text-muted-foreground'}`}>
                          {contribution.tokens || '-'}
                        </div>
                        <div className="text-xs text-muted-foreground">Tokens Earned</div>
                      </div>
                    </div>

                    {/* Species */}
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Mangrove Species:</div>
                      <div className="flex flex-wrap gap-2">
                        {contribution.species.map((species) => (
                          <Badge key={species} variant="outline" className="text-xs">
                            {species}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* AI Validation Results */}
                    {contribution.status !== 'pending' && (
                      <div className="space-y-2">
                        <div className="text-sm font-medium">AI Validation Results:</div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center p-2 bg-muted/30 rounded">
                            <div className={`font-semibold ${getValidationScore(contribution.aiValidation.fraudScore).color}`}>
                              {contribution.aiValidation.fraudScore || '-'}%
                            </div>
                            <div className="text-xs text-muted-foreground">Fraud Score</div>
                          </div>
                          <div className="text-center p-2 bg-muted/30 rounded">
                            <div className={`font-semibold ${getValidationScore(contribution.aiValidation.ndviHealth).color}`}>
                              {contribution.aiValidation.ndviHealth || '-'}%
                            </div>
                            <div className="text-xs text-muted-foreground">NDVI Health</div>
                          </div>
                          <div className="text-center p-2 bg-muted/30 rounded">
                            <div className={`font-semibold ${getValidationScore(contribution.aiValidation.treeSurvival).color}`}>
                              {contribution.aiValidation.treeSurvival || '-'}%
                            </div>
                            <div className="text-xs text-muted-foreground">Tree Survival</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Media Files */}
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-4">
                        <span>{contribution.images} images uploaded</span>
                        {contribution.droneFootage && (
                          <span>✓ Drone footage included</span>
                        )}
                      </div>
                      <span className="text-xs">ID: {contribution.id}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredContributions.length === 0 && (
            <Card>
              <CardContent className="pt-6 text-center py-12">
                <TreePine className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No contributions found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery || filterStatus !== 'all' 
                    ? 'Try adjusting your search or filter criteria' 
                    : 'Start by submitting your first plantation project'}
                </p>
                {!searchQuery && filterStatus === 'all' && (
                  <Button variant="forest">
                    Submit New Plantation
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}