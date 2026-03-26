import { Link } from "react-router";
import { Home, Search, BookOpen, ArrowLeft } from "lucide-react";

export function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <div className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            404
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mt-4 mb-4">Page Not Found</h1>
          <p className="text-xl text-gray-600">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Here are some helpful links:</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link
              to="/"
              className="flex flex-col items-center gap-3 p-6 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-blue-600" />
              </div>
              <span className="font-medium text-gray-900">Home</span>
            </Link>

            <Link
              to="/courses"
              className="flex flex-col items-center gap-3 p-6 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <span className="font-medium text-gray-900">Courses</span>
            </Link>

            <Link
              to="/about"
              className="flex flex-col items-center gap-3 p-6 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Search className="w-6 h-6 text-green-600" />
              </div>
              <span className="font-medium text-gray-900">About Us</span>
            </Link>
          </div>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
