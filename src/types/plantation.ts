export interface PlantationSubmission {
  id: string;
  userId: string;
  title: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  area: number; // in hectares
  treeCount: number;
  speciesType: string[];
  plantationDate: string;
  submissionDate: string;
  status: 'pending' | 'under_review' | 'verified' | 'rejected';
  aiValidation: AIValidationResult;
  images: string[];
  droneFootage?: string;
  documents: string[];
  credits?: number;
  tokens?: number;
  adminNotes?: string;
}

export interface AIValidationResult {
  fraudScore: {
    score: number; // 0-100
    risk: 'low' | 'medium' | 'high';
    flags: string[];
  };
  ndviAnalysis: {
    healthIndex: number; // 0-100
    vegetationCoverage: number; // percentage
    changeDetection: string;
  };
  treeSurvival: {
    count: number;
    survivalRate: number; // percentage
    confidence: number; // 0-100
  };
  processing: {
    status: 'pending' | 'processing' | 'completed' | 'failed';
    completedAt?: string;
  };
}

export interface MapFilter {
  status?: PlantationSubmission['status'][];
  dateRange?: {
    start: string;
    end: string;
  };
  community?: string[];
  species?: string[];
}