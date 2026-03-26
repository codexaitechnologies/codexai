import { useState } from "react";
import { Download, Save, Eye, CheckCircle, FileText } from "lucide-react";

export function ResumeBuilder() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    summary: "",
    experience: [{ title: "", company: "", duration: "", description: "" }],
    education: [{ degree: "", school: "", year: "", gpa: "" }],
    skills: "",
    projects: [{ name: "", tech: "", description: "", link: "" }]
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [...formData.experience, { title: "", company: "", duration: "", description: "" }]
    });
  };

  const addProject = () => {
    setFormData({
      ...formData,
      projects: [...formData.projects, { name: "", tech: "", description: "", link: "" }]
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Resume Builder</h1>
          <p className="text-gray-600">Create an ATS-friendly resume that gets you interviews</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Email *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Phone *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Location</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      placeholder="Bangalore, India"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">LinkedIn</label>
                    <input
                      type="url"
                      value={formData.linkedin}
                      onChange={(e) => handleInputChange("linkedin", e.target.value)}
                      placeholder="linkedin.com/in/johndoe"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">GitHub</label>
                    <input
                      type="url"
                      value={formData.github}
                      onChange={(e) => handleInputChange("github", e.target.value)}
                      placeholder="github.com/johndoe"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Professional Summary</h2>
              <textarea
                value={formData.summary}
                onChange={(e) => handleInputChange("summary", e.target.value)}
                placeholder="Brief overview of your professional background and career objectives..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-sm text-gray-600 mt-2">2-3 sentences highlighting your key strengths and goals</p>
            </div>

            {/* Experience */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Work Experience</h2>
                <button
                  onClick={addExperience}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                >
                  Add Experience
                </button>
              </div>

              {formData.experience.map((exp, index) => (
                <div key={index} className={`space-y-4 ${index > 0 ? 'pt-6 mt-6 border-t border-gray-200' : ''}`}>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Job Title</label>
                      <input
                        type="text"
                        placeholder="Software Engineer"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Company</label>
                      <input
                        type="text"
                        placeholder="Tech Corp"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Duration</label>
                    <input
                      type="text"
                      placeholder="Jan 2023 - Present"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Description</label>
                    <textarea
                      placeholder="Key responsibilities and achievements..."
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Education */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Education</h2>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Degree</label>
                    <input
                      type="text"
                      placeholder="B.Tech in Computer Science"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">School/University</label>
                    <input
                      type="text"
                      placeholder="XYZ University"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Year</label>
                    <input
                      type="text"
                      placeholder="2019 - 2023"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">GPA/Percentage</label>
                    <input
                      type="text"
                      placeholder="8.5/10"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Skills</h2>
              <textarea
                value={formData.skills}
                onChange={(e) => handleInputChange("skills", e.target.value)}
                placeholder="JavaScript, React, Node.js, Python, AWS, Docker..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-sm text-gray-600 mt-2">Separate skills with commas</p>
            </div>

            {/* Projects */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Projects</h2>
                <button
                  onClick={addProject}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                >
                  Add Project
                </button>
              </div>

              {formData.projects.map((project, index) => (
                <div key={index} className={`space-y-4 ${index > 0 ? 'pt-6 mt-6 border-t border-gray-200' : ''}`}>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Project Name</label>
                      <input
                        type="text"
                        placeholder="E-Commerce Platform"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Technologies</label>
                      <input
                        type="text"
                        placeholder="React, Node.js, MongoDB"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Description</label>
                    <textarea
                      placeholder="Brief description of the project..."
                      rows={2}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Link (GitHub/Demo)</label>
                    <input
                      type="url"
                      placeholder="https://github.com/username/project"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow">
                <Download className="w-5 h-5" />
                Download PDF
              </button>
              <button className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50">
                <Save className="w-5 h-5" />
                Save
              </button>
            </div>
          </div>

          {/* Preview */}
          <div className="lg:sticky lg:top-24">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Preview</h2>
                <Eye className="w-5 h-5 text-gray-400" />
              </div>

              <div className="border border-gray-200 rounded-lg p-8 bg-white" style={{ aspectRatio: '8.5/11' }}>
                {/* Resume Preview */}
                <div className="space-y-6">
                  <div className="text-center border-b border-gray-200 pb-4">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {formData.fullName || "Your Name"}
                    </h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      {formData.email && <div>{formData.email}</div>}
                      {formData.phone && <div>{formData.phone}</div>}
                      {formData.location && <div>{formData.location}</div>}
                    </div>
                  </div>

                  {formData.summary && (
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2 text-sm uppercase tracking-wide">Summary</h4>
                      <p className="text-xs text-gray-700">{formData.summary}</p>
                    </div>
                  )}

                  {formData.skills && (
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2 text-sm uppercase tracking-wide">Skills</h4>
                      <p className="text-xs text-gray-700">{formData.skills}</p>
                    </div>
                  )}

                  <div className="text-center text-sm text-gray-400 italic">
                    Continue filling the form to see your resume preview
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-900">
                    <div className="font-semibold mb-1">ATS-Friendly Format</div>
                    <div className="text-blue-700">This resume is optimized to pass Applicant Tracking Systems</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
