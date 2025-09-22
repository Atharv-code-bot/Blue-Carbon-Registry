import { Sidebar } from '@/components/layout/Sidebar';
import { useState } from 'react';

// Mock data for validation submissions
const mockValidations = [
  {
    id: 'VAL-2024-001',
    title: 'Mangrove Restoration - Sundarbans Phase 2',
    submitter: 'Village Green Initiative',
    status: 'pending',
    details: 'This project focuses on restoring mangroves in the Sundarbans region. Area: 2.5 hectares. Species: Rhizophora apiculata.',
  },
  {
    id: 'VAL-2024-002',
    title: 'Coastal Plantation - Konark Beach',
    submitter: 'Ocean Conservation Trust',
    status: 'pending',
    details: 'Plantation along Konark Beach. Area: 1.8 hectares. Species: Avicennia marina.',
  },
];

export default function Validation() {
  const [validations, setValidations] = useState(mockValidations);
  const [viewId, setViewId] = useState<string | null>(null);

  const handleViewDetails = (id: string) => {
    setViewId(id);
  };

  const handleApprove = (id: string) => {
    setValidations((prev) =>
      prev.map((val) =>
        val.id === id ? { ...val, status: 'approved' } : val
      )
    );
    setViewId(null);
  };

  const viewed = validations.find((v) => v.id === viewId);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-64 p-6">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-2xl font-bold mb-4">Validation Submissions</h1>
          <div className="space-y-4">
            {validations.map((val) => (
              <div key={val.id} className="border rounded-lg p-4 flex items-center justify-between">
                <div>
                  <div className="font-semibold">{val.title}</div>
                  <div className="text-sm text-muted-foreground">{val.submitter}</div>
                  <div className="text-xs mt-1 capitalize">Status: {val.status}</div>
                </div>
                <div className="flex gap-2">
                  <button
                    className="px-3 py-1 border rounded text-sm hover:bg-gray-100"
                    onClick={() => handleViewDetails(val.id)}
                  >
                    View Details
                  </button>
                  {val.status === 'pending' && (
                    <button
                      className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                      onClick={() => handleApprove(val.id)}
                    >
                      Approve
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Details Modal */}
          {viewed && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
              <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
                <button
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                  onClick={() => setViewId(null)}
                  aria-label="Close"
                >
                  ×
                </button>
                <h2 className="text-xl font-bold mb-2">{viewed.title}</h2>
                <div className="mb-2 text-sm text-muted-foreground">{viewed.submitter}</div>
                <div className="mb-4">{viewed.details}</div>
                <div className="flex gap-2">
                  {viewed.status === 'pending' && (
                    <button
                      className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                      onClick={() => handleApprove(viewed.id)}
                    >
                      Approve
                    </button>
                  )}
                  <button
                    className="px-3 py-1 border rounded text-sm hover:bg-gray-100"
                    onClick={() => setViewId(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}