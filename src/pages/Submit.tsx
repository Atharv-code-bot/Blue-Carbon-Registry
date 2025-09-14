import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Upload, MapPin, Camera, FileText, TreePine, Calendar, Users } from 'lucide-react';

export default function Submit() {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    coordinates: { lat: '', lng: '' },
    area: '',
    treeCount: '',
    species: [],
    plantationDate: '',
    images: [],
    droneFootage: null,
    documents: []
  });

  const steps = [
    { id: 1, name: 'Project Details', icon: FileText },
    { id: 2, name: 'Location & Area', icon: MapPin },
    { id: 3, name: 'Plantation Info', icon: TreePine },
    { id: 4, name: 'Media Upload', icon: Camera },
    { id: 5, name: 'Review & Submit', icon: Upload }
  ];

  const speciesOptions = [
    'Rhizophora mucronata',
    'Avicennia marina',
    'Sonneratia alba',
    'Bruguiera gymnorrhiza',
    'Ceriops decandra',
    'Excoecaria agallocha'
  ];

  const handleFileUpload = (files: FileList, type: 'images' | 'documents' | 'drone') => {
    const fileArray = Array.from(files);
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setUploadProgress(0);
        
        if (type === 'images') {
          setFormData(prev => ({
            ...prev,
            images: [...prev.images, ...fileArray.map(f => f.name)]
          }));
        } else if (type === 'documents') {
          setFormData(prev => ({
            ...prev,
            documents: [...prev.documents, ...fileArray.map(f => f.name)]
          }));
        } else if (type === 'drone') {
          setFormData(prev => ({ ...prev, droneFootage: fileArray[0]?.name || null }));
        }
        
        toast({
          title: "Upload successful",
          description: `${fileArray.length} file(s) uploaded successfully`,
        });
      }
    }, 200);
  };

  const handleSubmit = () => {
    toast({
      title: "Submission successful!",
      description: "Your plantation project has been submitted for review. You'll receive updates via notifications.",
    });
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      location: '',
      coordinates: { lat: '', lng: '' },
      area: '',
      treeCount: '',
      species: [],
      plantationDate: '',
      images: [],
      droneFootage: null,
      documents: []
    });
    setCurrentStep(1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Project Title</Label>
              <Input
                id="title"
                placeholder="e.g., Sundarbans Restoration Phase 2"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="description">Project Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your mangrove restoration project..."
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
              />
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="location">Location Address</Label>
              <Input
                id="location"
                placeholder="e.g., Sundarbans, West Bengal, India"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="lat">Latitude</Label>
                <Input
                  id="lat"
                  placeholder="21.9497"
                  value={formData.coordinates.lat}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    coordinates: { ...prev.coordinates, lat: e.target.value }
                  }))}
                />
              </div>
              <div>
                <Label htmlFor="lng">Longitude</Label>
                <Input
                  id="lng"
                  placeholder="88.9468"
                  value={formData.coordinates.lng}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    coordinates: { ...prev.coordinates, lng: e.target.value }
                  }))}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="area">Total Area (hectares)</Label>
              <Input
                id="area"
                type="number"
                placeholder="2.5"
                value={formData.area}
                onChange={(e) => setFormData(prev => ({ ...prev, area: e.target.value }))}
              />
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="treeCount">Number of Trees Planted</Label>
              <Input
                id="treeCount"
                type="number"
                placeholder="1250"
                value={formData.treeCount}
                onChange={(e) => setFormData(prev => ({ ...prev, treeCount: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="species">Mangrove Species</Label>
              <Select onValueChange={(value) => {
                if (!formData.species.includes(value)) {
                  setFormData(prev => ({ ...prev, species: [...prev.species, value] }));
                }
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select species" />
                </SelectTrigger>
                <SelectContent>
                  {speciesOptions.map((species) => (
                    <SelectItem key={species} value={species}>{species}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.species.map((species) => (
                  <Badge key={species} variant="secondary" className="cursor-pointer"
                    onClick={() => setFormData(prev => ({ 
                      ...prev, 
                      species: prev.species.filter(s => s !== species)
                    }))}>
                    {species} ×
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="plantationDate">Plantation Date</Label>
              <Input
                id="plantationDate"
                type="date"
                value={formData.plantationDate}
                onChange={(e) => setFormData(prev => ({ ...prev, plantationDate: e.target.value }))}
              />
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-6">
            {/* Images Upload */}
            <div>
              <Label>Plantation Images (Required)</Label>
              <div className="mt-2 border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Camera className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground mb-4">
                  Upload geo-tagged images of your plantation site
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => e.target.files && handleFileUpload(e.target.files, 'images')}
                  className="hidden"
                  id="images-upload"
                />
                <Button asChild variant="outline">
                  <label htmlFor="images-upload" className="cursor-pointer">
                    Choose Images
                  </label>
                </Button>
                {formData.images.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium">{formData.images.length} images uploaded</p>
                  </div>
                )}
              </div>
            </div>

            {/* Drone Footage */}
            <div>
              <Label>Drone Footage (Optional)</Label>
              <div className="mt-2 border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground mb-4">
                  Upload aerial footage for better verification
                </p>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => e.target.files && handleFileUpload(e.target.files, 'drone')}
                  className="hidden"
                  id="drone-upload"
                />
                <Button asChild variant="outline">
                  <label htmlFor="drone-upload" className="cursor-pointer">
                    Choose Video
                  </label>
                </Button>
                {formData.droneFootage && (
                  <div className="mt-4">
                    <p className="text-sm font-medium">Video: {formData.droneFootage}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Documents */}
            <div>
              <Label>Supporting Documents</Label>
              <div className="mt-2 border-2 border-dashed border-border rounded-lg p-6 text-center">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground mb-4">
                  Upload permits, reports, or other documentation
                </p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => e.target.files && handleFileUpload(e.target.files, 'documents')}
                  className="hidden"
                  id="docs-upload"
                />
                <Button asChild variant="outline">
                  <label htmlFor="docs-upload" className="cursor-pointer">
                    Choose Documents
                  </label>
                </Button>
                {formData.documents.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium">{formData.documents.length} documents uploaded</p>
                  </div>
                )}
              </div>
            </div>

            {uploadProgress > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} />
              </div>
            )}
          </div>
        );
      
      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Review Your Submission</h3>
              <p className="text-muted-foreground">
                Please review all information before submitting
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-semibold">Project Title</Label>
                <p className="text-sm">{formData.title || 'Not specified'}</p>
              </div>
              <div className="space-y-2">
                <Label className="font-semibold">Location</Label>
                <p className="text-sm">{formData.location || 'Not specified'}</p>
              </div>
              <div className="space-y-2">
                <Label className="font-semibold">Area</Label>
                <p className="text-sm">{formData.area ? `${formData.area} hectares` : 'Not specified'}</p>
              </div>
              <div className="space-y-2">
                <Label className="font-semibold">Trees Planted</Label>
                <p className="text-sm">{formData.treeCount || 'Not specified'}</p>
              </div>
              <div className="space-y-2">
                <Label className="font-semibold">Species</Label>
                <p className="text-sm">{formData.species.length > 0 ? formData.species.join(', ') : 'Not specified'}</p>
              </div>
              <div className="space-y-2">
                <Label className="font-semibold">Plantation Date</Label>
                <p className="text-sm">{formData.plantationDate || 'Not specified'}</p>
              </div>
            </div>
            
            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Uploaded Files</h4>
              <div className="text-sm space-y-1">
                <p>Images: {formData.images.length} files</p>
                <p>Drone footage: {formData.droneFootage ? '1 video' : 'None'}</p>
                <p>Documents: {formData.documents.length} files</p>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Submit New Plantation</h1>
            <p className="text-muted-foreground">
              Document your mangrove restoration project for verification and carbon credit issuance
            </p>
          </div>

          {/* Progress Steps */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-8">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                      currentStep >= step.id 
                        ? 'border-primary bg-primary text-primary-foreground' 
                        : 'border-muted-foreground text-muted-foreground'
                    }`}>
                      <step.icon className="h-4 w-4" />
                    </div>
                    <div className="ml-3 hidden sm:block">
                      <p className={`text-sm font-medium ${
                        currentStep >= step.id ? 'text-primary' : 'text-muted-foreground'
                      }`}>
                        {step.name}
                      </p>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-12 h-0.5 ml-4 ${
                        currentStep > step.id ? 'bg-primary' : 'bg-muted-foreground'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Form Content */}
          <Card>
            <CardHeader>
              <CardTitle>Step {currentStep}: {steps.find(s => s.id === currentStep)?.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {renderStepContent()}
              
              <div className="flex justify-between pt-6">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>
                
                {currentStep < steps.length ? (
                  <Button 
                    onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
                    variant="forest"
                  >
                    Next
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} variant="forest">
                    Submit for Review
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}