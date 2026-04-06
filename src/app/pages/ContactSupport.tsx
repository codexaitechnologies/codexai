import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Phone,
  Mail,
  MessageCircle,
  Send,
  Upload,
  X,
  CheckCircle,
  AlertCircle,
  Loader,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function ContactSupport() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    category: "general",
    description: "",
  });

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadProgress, setUploadProgress] = useState<string>("");

  // Auto-populate form with logged-in user data
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.fullName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
      }));
      console.log("📝 Form pre-populated with user data:", {
        name: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
      });
    }
  }, [user]);

  const categories = [
    { value: "general", label: "General Inquiry" },
    { value: "technical", label: "Technical Issue" },
    { value: "billing", label: "Billing & Payment" },
    { value: "account", label: "Account & Enrollment" },
    { value: "course", label: "Course Content" },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      const totalSize = uploadedFiles.reduce((acc, f) => acc + f.size, 0) +
        newFiles.reduce((acc, f) => acc + f.size, 0);

      // Limit total file size to 50MB
      if (totalSize > 50 * 1024 * 1024) {
        setErrorMessage("Total file size cannot exceed 50MB");
        e.target.value = ""; // Reset input
        return;
      }

      setUploadedFiles((prev) => [...prev, ...newFiles]);
      setErrorMessage("");
      e.target.value = ""; // Reset input so same file can be selected again
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSubmitStatus("idle");
    setErrorMessage("");
    setUploadProgress("");

    try {
      // Validate form
      if (!formData.name.trim()) {
        throw new Error("Please enter your name");
      }
      if (!formData.email.trim() || !formData.email.includes("@")) {
        throw new Error("Please enter a valid email");
      }
      if (!formData.phoneNumber.trim()) {
        throw new Error("Please enter your phone number");
      }
      if (!formData.description.trim()) {
        throw new Error("Please describe your query");
      }

      console.log("📤 Starting query submission process...");
      console.log("📋 Form Data:", {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        category: formData.category,
        descriptionLength: formData.description.length,
        filesCount: uploadedFiles.length,
      });

      // Step 1: Upload documents to S3 if files exist
      let documentUrls: string[] = [];
      if (uploadedFiles.length > 0) {
        setUploadProgress(`Uploading ${uploadedFiles.length} document(s)...`);
        console.log("📁 Uploading documents to S3...");
        documentUrls = await uploadDocumentsToS3(uploadedFiles);
        console.log("✅ Documents uploaded successfully. URLs:", documentUrls);
      }

      // Step 2: Submit query with document URLs
      setUploadProgress("Saving your query...");
      console.log("💾 Submitting query with documents...");
      await submitQueryToBackend({
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        category: formData.category,
        description: formData.description,
        documents: documentUrls,
      });

      console.log("✅ Query submitted successfully!");
      setUploadProgress("");
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        category: "general",
        description: "",
      });
      setUploadedFiles([]);

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to submit query";
      console.error("❌ Error:", message);
      setErrorMessage(message);
      setSubmitStatus("error");
      setUploadProgress("");
    } finally {
      setLoading(false);
    }
  };

  // Upload documents to S3 via backend API
  const uploadDocumentsToS3 = async (files: File[]): Promise<string[]> => {
    try {
      const documentUrls: string[] = [];

      for (const file of files) {
        console.log(`📤 Uploading file: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`);

        // Create FormData for this specific file
        const fileFormData = new FormData();
        fileFormData.append("file", file);
        fileFormData.append("email", formData.email);
        fileFormData.append("contentType", file.type);

        console.log(`📋 File details:`, {
          name: file.name,
          size: file.size,
          type: file.type,
          email: formData.email,
        });

        // Call backend API to upload to S3
        const uploadResponse = await fetch(
          "https://jbd1szydoc.execute-api.ap-south-1.amazonaws.com/support/upload-document",
          {
            method: "POST",
            body: fileFormData,
          }
        );

        if (!uploadResponse.ok) {
          let errorMessage = "Unknown error";
          try {
            const errorData = await uploadResponse.json();
            errorMessage = errorData.message || errorData.error || JSON.stringify(errorData);
          } catch {
            errorMessage = `HTTP ${uploadResponse.status}`;
          }
          console.error(`❌ Upload failed for ${file.name}:`, errorMessage);
          throw new Error(
            `Failed to upload ${file.name}: ${errorMessage}`
          );
        }

        const uploadData = await uploadResponse.json();
        console.log(`✅ File uploaded: ${file.name}`, uploadData);

        // Extract presigned URL from response
        if (uploadData.presignedUrl) {
          documentUrls.push(uploadData.presignedUrl);
          console.log(`📍 Presigned URL expires in: ${uploadData.urlExpiresIn} seconds`);
        } else {
          throw new Error(`No presigned URL returned for file: ${file.name}`);
        }
      }

      return documentUrls;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Document upload failed";
      console.error("❌ S3 Upload Error:", message);
      throw new Error(`Document upload failed: ${message}`);
    }
  };

  // Submit query to backend with document URLs
  const submitQueryToBackend = async (queryData: {
    name: string;
    email: string;
    phoneNumber: string;
    category: string;
    description: string;
    documents: string[];
  }): Promise<void> => {
    try {
      console.log("📨 Submitting query with complete payload:");
      console.log(JSON.stringify(queryData, null, 2));

      const response = await fetch(
        "https://jbd1szydoc.execute-api.ap-south-1.amazonaws.com/support/submit-query",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(queryData),
        }
      );

      if (!response.ok) {
        let errorMessage = "Failed to submit query";
        let errorDetails: any = {};
        
        try {
          errorDetails = await response.json();
          errorMessage = errorDetails.message || errorDetails.error || errorMessage;
        } catch {
          errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        }

        console.error(`❌ API Error Response (${response.status}):`, errorDetails);
        throw new Error(errorMessage);
      }

      const responseData = await response.json();
      console.log("✅ Query submitted successfully!");
      console.log("📝 Backend Response:");
      console.log(JSON.stringify(responseData, null, 2));

      // Log important fields if available
      if (responseData.queryId) {
        console.log(`📍 Support Ticket ID: ${responseData.queryId}`);
      }
      if (responseData.ticketNumber) {
        console.log(`🎫 Ticket Number: ${responseData.ticketNumber}`);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Query submission failed";
      console.error("❌ Query Submission Error:", message);
      throw new Error(`Query submission failed: ${message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white dark:from-black dark:via-slate-950 dark:to-black pt-32 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 max-w-6xl"
      >
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
            Contact & Support
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Have a question or need help? We're here to assist you. Choose your preferred way to
            reach us or submit a detailed query below.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {/* Call */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all"
          >
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-950/50 rounded-full flex items-center justify-center mb-6">
              <Phone className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">Call Us</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Speak with our team directly. We're available Monday to Friday, 10 AM to 6 PM IST.
            </p>
            <a
              href="tel:+918285994903"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:gap-3 transition-all"
            >
              +91 8285994903
              <Phone className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all"
          >
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-950/50 rounded-full flex items-center justify-center mb-6">
              <Mail className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">Email Us</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Send us an email and we'll respond within 24 hours.
            </p>
            <a
              href="mailto:codexaitechnologies@gmail.com"
              className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold hover:gap-3 transition-all"
            >
              codexaitechnologies@gmail.com
              <Mail className="w-4 h-4" />
            </a>
          </motion.div>

          {/* WhatsApp */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all"
          >
            <div className="w-16 h-16 bg-green-100 dark:bg-green-950/50 rounded-full flex items-center justify-center mb-6">
              <MessageCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">WhatsApp</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Quick chat support via WhatsApp. Get instant replies during business hours.
            </p>
            <a
              href="https://wa.me/918285994903"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold hover:gap-3 transition-all"
            >
              +91 8285994903
              <MessageCircle className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        {/* Query Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white dark:bg-slate-900 rounded-2xl p-8 md:p-12 border border-slate-200 dark:border-slate-800"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-slate-900 dark:text-white">
            Submit a Query
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Fill out the form below and attach any supporting documents. We'll get back to you
            as soon as possible.
          </p>

          {/* Status Messages */}
          {submitStatus === "success" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg flex items-start gap-3 mb-6"
            >
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-green-900 dark:text-green-100">Success!</p>
                <p className="text-sm text-green-800 dark:text-green-300">
                  Your query has been submitted successfully. We'll contact you soon.
                </p>
              </div>
            </motion.div>
          )}

          {submitStatus === "error" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3 mb-6"
            >
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-red-900 dark:text-red-100">Error</p>
                <p className="text-sm text-red-800 dark:text-red-300">{errorMessage}</p>
              </div>
            </motion.div>
          )}

          {uploadProgress && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg flex items-start gap-3 mb-6"
            >
              <Loader className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0 animate-spin" />
              <div>
                <p className="font-semibold text-blue-900 dark:text-blue-100">Processing</p>
                <p className="text-sm text-blue-800 dark:text-blue-300">{uploadProgress}</p>
              </div>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Info Banner */}
            {user && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg flex items-start gap-2"
              >
                <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                    Account Information Verified
                  </p>
                  <p className="text-xs text-blue-800 dark:text-blue-300">
                    Your details have been pre-filled from your account.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Name and Email Row - Only visible for guests */}
            {!user && (
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    disabled={loading}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 disabled:opacity-50"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    disabled={loading}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 disabled:opacity-50"
                  />
                </div>
              </div>
            )}

            {/* Phone Number and Category Row */}
            <div className={!user ? "grid md:grid-cols-2 gap-6" : ""}>
              {/* Phone Number - Only visible for guests */}
              {!user && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    disabled={loading}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 disabled:opacity-50"
                  />
                </div>
              )}

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Query Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  disabled={loading}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all text-slate-900 dark:text-white disabled:opacity-50"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Describe Your Query <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Please provide detailed information about your query, issue, or feedback..."
                disabled={loading}
                rows={6}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 disabled:opacity-50 resize-none"
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Upload Supporting Documents (Optional)
              </label>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                Max 50MB total. Accepted formats: PDF, DOC, DOCX, IMG, TXT
              </p>

              <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-6 text-center hover:border-slate-400 dark:hover:border-slate-600 transition-all">
                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-3" />
                <label className="cursor-pointer">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    PDF, DOC, DOCX, Images or Text
                  </p>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    disabled={loading}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.txt"
                  />
                </label>
              </div>

              {/* Uploaded Files List */}
              {uploadedFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    Uploaded Files ({uploadedFiles.length})
                  </p>
                  {uploadedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <Upload className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                            {file.name}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {(file.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        disabled={loading}
                        className="ml-2 p-1 text-slate-400 hover:text-red-500 transition-colors disabled:opacity-50"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-6">
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                  loading
                    ? "bg-gray-400 opacity-50 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/50 cursor-pointer"
                }`}
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Query
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            For quick answers, check out our FAQ section or browse through our knowledge base.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/faq"
              className="px-6 py-3 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg font-semibold hover:bg-slate-300 dark:hover:bg-slate-700 transition-all"
            >
              Browse FAQ
            </a>
            <a
              href="/knowledge-base"
              className="px-6 py-3 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
            >
              Knowledge Base
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
