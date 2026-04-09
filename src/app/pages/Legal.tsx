import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Loader, AlertCircle, ArrowLeft } from "lucide-react";
import { getLegals } from "../services/legalsService";
import type { Legal } from "../types/legals";

export default function Legal() {
  const { documentName } = useParams<{ documentName: string }>();
  const navigate = useNavigate();
  const [legal, setLegal] = useState<Legal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchLegalDocument = async () => {
      try {
        setLoading(true);
        setError("");

        // Fetch all legal documents
        const response = await getLegals({ limit: 20 });

        // Find the document matching the document name
        const foundLegal = response.legals.find(
          (legal) =>
            legal.documentName.toLowerCase().replace(/\s+/g, "-") ===
            documentName?.toLowerCase()
        );

        if (!foundLegal) {
          setError("Legal document not found");
          setLoading(false);
          return;
        }

        setLegal(foundLegal);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to load legal document";
        setError(errorMessage);
        console.error("Error loading legal document:", err);
      } finally {
        setLoading(false);
      }
    };

    if (documentName) {
      fetchLegalDocument();
    }
  }, [documentName]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-500" />
          <p className="text-gray-600 dark:text-gray-400">Loading document...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <button
            onClick={() => navigate("/")}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black pt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        {/* Document title */}
        {legal && (
          <>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-2">
              {legal.documentName}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
              Last updated: {new Date(legal.updatedAt).toLocaleDateString()}
            </p>

            {/* Document viewer - using iframe */}
            <div className="bg-white dark:bg-slate-900 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
              <iframe
                src={legal.documentLink}
                title={legal.documentName}
                className="w-full h-screen rounded-lg"
                frameBorder="0"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
