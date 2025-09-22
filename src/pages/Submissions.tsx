import { Sidebar } from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Search, 
  Filter,
  Download,
  MapPin,
  User,
  Calendar
} from 'lucide-react';
import { useState } from 'react';

const mockSubmissions = [
  {
    id: 'SUB-2024-001',
    title: 'Mangrove Restoration - Sundarbans Phase 2',
    submitter: 'Village Green Initiative',
    location: 'Sundarbans, West Bengal',
    submittedDate: '2024-03-15',
    status: 'pending',
    area: '2.5 hectares',
    species: 'Rhizophora apiculata',
    priority: 'high'
  },
  {
    id: 'SUB-2024-002',
    title: 'Coastal Plantation - Konark Beach',
    submitter: 'Ocean Conservation Trust',
    location: 'Konark, Odisha',
    submittedDate: '2024-03-14',
    status: 'under_review',
    area: '1.8 hectares',
    species: 'Avicennia marina',
    priority: 'medium'
  },
  {
    id: 'SUB-2024-003',
    title: 'Backwater Restoration Project',
    submitter: 'Kerala Fishermen Collective',
    location: 'Kochi, Kerala',
    submittedDate: '2024-03-13',
    status: 'approved',
    area: '3.2 hectares',
    species: 'Rhizophora mucronata',
    priority: 'low'
  },
  {
    id: 'SUB-2024-004',
    title: 'Mudflat Revegetation Initiative',
    submitter: 'Chennai Coastal Guard',
    location: 'Chennai, Tamil Nadu',
    submittedDate: '2024-03-12',
    status: 'rejected',
    area: '1.2 hectares',
    species: 'Sonneratia alba',
    priority: 'medium'
  }
];

// Returns a Tailwind border color class based on priority
function getPriorityColor(priority: string) {
  switch (priority) {
    case 'high':
      return 'border-red-500';
    case 'medium':
      return 'border-yellow-500';
    case 'low':
      return 'border-green-500';
    default:
      return 'border-gray-300';
  }
}

export default function Submissions() {
  const [submissions, setSubmissions] = useState(mockSubmissions);
  const [reviewId, setReviewId] = useState<string | null>(null);

  // Handler for Review button
  const handleReview = (id: string) => {
    setReviewId(id);
  };

  // Handler for Approve button
  const handleApprove = (id: string) => {
    setSubmissions((prev) =>
      prev.map((sub) =>
        sub.id === id ? { ...sub, status: 'approved' } : sub
      )
    );
    if (reviewId === id) setReviewId(null);
  };

  // Handler for Reject button
  const handleReject = (id: string) => {
    setSubmissions((prev) =>
      prev.map((sub) =>
        sub.id === id ? { ...sub, status: 'rejected' } : sub
      )
    );
    if (reviewId === id) setReviewId(null);
  };

  const reviewedSubmission = submissions.find((s) => s.id === reviewId);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-64 p-6 animate-fade-in-up">
        <div className="max-w-7xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {submissions.map((submission) => (
                  <div 
                    key={submission.id}
                    className={`p-4 border rounded-lg border-l-4 ${getPriorityColor(submission.priority)} hover:bg-muted/50 transition-colors`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{submission.id}</Badge>
                          <span className="font-semibold">{submission.title}</span>
                          <Badge variant="outline" className="ml-2 capitalize">{submission.status.replace('_', ' ')}</Badge>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {submission.submitter}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {submission.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {submission.submittedDate}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {submission.area}
                          </span>
                          <span className="flex items-center gap-1">
                            🌱 {submission.species}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleReview(submission.id)}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          Review
                        </Button>
                        {submission.status === 'pending' && (
                          <>
                            <Button 
                              variant="default" 
                              size="sm"
                              onClick={() => handleApprove(submission.id)}
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Approve
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleReject(submission.id)}
                            >
                              <XCircle className="h-3 w-3 mr-1" />
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Review Details Modal/Section */}
          {reviewedSubmission && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
              <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
                <button
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                  onClick={() => setReviewId(null)}
                  aria-label="Close"
                >
                  <XCircle className="h-5 w-5" />
                </button>
                <h2 className="text-xl font-bold mb-4">Submission Details</h2>
                <div className="space-y-2">
                  <div>
                    <Badge variant="secondary">{reviewedSubmission.id}</Badge>
                    <span className="ml-2 font-semibold">{reviewedSubmission.title}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {reviewedSubmission.submitter}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {reviewedSubmission.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {reviewedSubmission.submittedDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {reviewedSubmission.area}
                    </span>
                    <span className="flex items-center gap-1">
                      🌱 {reviewedSubmission.species}
                    </span>
                    <span className="flex items-center gap-1">
                      Priority: <span className="capitalize">{reviewedSubmission.priority}</span>
                    </span>
                  </div>
                  <div className="mt-4 flex gap-2">
                    {reviewedSubmission.status === 'pending' && (
                      <>
                        <Button 
                          variant="default"
                          size="sm"
                          onClick={() => handleApprove(reviewedSubmission.id)}
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Approve
                        </Button>
                        <Button 
                          variant="destructive"
                          size="sm"
                          onClick={() => handleReject(reviewedSubmission.id)}
                        >
                          <XCircle className="h-3 w-3 mr-1" />
                          Reject
                        </Button>
                      </>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setReviewId(null)}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}