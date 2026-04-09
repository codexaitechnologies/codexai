import { useState, useEffect } from "react";
import { X, Loader, AlertCircle } from "lucide-react";
import { getLegals } from "../services/legalsService";
import type { Legal } from "../types/legals";

interface LegalDocumentModalProps {
  isOpen: boolean;
  documentName: string | null;
  onClose: () => void;
}

export default function LegalDocumentModal({
  isOpen,
  documentName,
  onClose,
}: LegalDocumentModalProps) {
  const [legal, setLegal] = useState<Legal | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!isOpen || !documentName) {
      setLegal(null);
      setError("");
      return;
    }

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
            documentName.toLowerCase().replace(/\s+/g, "-")
        );

        if (!foundLegal) {
          setError("Legal document not found");
          setLegal(null);
          return;
        }

        setLegal(foundLegal);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to load legal document";
        setError(errorMessage);
        console.error("Error loading legal document:", err);
        setLegal(null);
      } finally {
        setLoading(false);
      }
    };

    fetchLegalDocument();
  }, [isOpen, documentName]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-4 md:inset-8 lg:inset-16 z-50 flex flex-col rounded-lg bg-white dark:bg-slate-900 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white truncate">
            {legal?.documentName || "Legal Document"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors flex-shrink-0 ml-4"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 text-slate-600 dark:text-slate-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Loader className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-500" />
                <p className="text-gray-600 dark:text-gray-400">Loading document...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center px-6">
                <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">{error}</p>
              </div>
            </div>
          ) : legal ? (
            <iframe
              src={legal.documentLink}
              title={legal.documentName}
              className="w-full h-full"
              frameBorder="0"
            />
          ) : null}
        </div>
      </div>
    </>
  );
}
