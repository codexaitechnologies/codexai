import { useState } from "react";
import {
  Github, ExternalLink, Heart, Eye, Star, Search,
  Code, Cloud, Brain, Smartphone, Filter
} from "lucide-react";

export function ProjectShowcase() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", name: "All Projects", icon: Code },
    { id: "web", name: "Web Apps", icon: Code },
    { id: "mobile", name: "Mobile Apps", icon: Smartphone },
    { id: "ai-ml", name: "AI/ML", icon: Brain },
    { id: "cloud", name: "Cloud", icon: Cloud }
  ];

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform with Microservices",
      author: "Priya Sharma",
      avatar: "PS",
      description: "Full-stack e-commerce application built with React, Node.js, and MongoDB. Features include user authentication, product catalog, cart, and payment integration.",
      category: "web",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800",
      github: "https://github.com/example/ecommerce",
      demo: "https://demo.example.com",
      likes: 128,
      views: 1245,
      stars: 89,
      course: "Full Stack Web Development"
    },
    {
      id: 2,
      title: "Real-time Chat Application",
      author: "Rahul Kumar",
      avatar: "RK",
      description: "WebSocket-based chat app with group conversations, file sharing, and emoji reactions. Built with Socket.io and Express.",
      category: "web",
      tags: ["Socket.io", "Express", "React", "Redis"],
      image: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800",
      github: "https://github.com/example/chat",
      demo: "https://demo.example.com",
      likes: 95,
      views: 892,
      stars: 67,
      course: "Full Stack Web Development"
    },
    {
      id: 3,
      title: "AI-Powered Image Recognition App",
      author: "Amit Patel",
      avatar: "AP",
      description: "Mobile app using TensorFlow Lite for real-time image classification and object detection. Trained custom model on 10k+ images.",
      category: "ai-ml",
      tags: ["TensorFlow", "Python", "Computer Vision", "React Native"],
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800",
      github: "https://github.com/example/ai-vision",
      demo: null,
      likes: 156,
      views: 1567,
      stars: 112,
      course: "Machine Learning & AI"
    },
    {
      id: 4,
      title: "Serverless Blog Platform on AWS",
      author: "Sneha Singh",
      avatar: "SS",
      description: "Fully serverless blog built with AWS Lambda, API Gateway, DynamoDB, and S3. CI/CD pipeline with GitHub Actions.",
      category: "cloud",
      tags: ["AWS Lambda", "DynamoDB", "S3", "API Gateway"],
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
      github: "https://github.com/example/serverless-blog",
      demo: "https://demo.example.com",
      likes: 142,
      views: 1342,
      stars: 98,
      course: "AWS Cloud Solutions"
    },
    {
      id: 5,
      title: "Fitness Tracker Mobile App",
      author: "Vikram Joshi",
      avatar: "VJ",
      description: "Cross-platform fitness app with workout tracking, nutrition logging, and progress analytics. Built with React Native.",
      category: "mobile",
      tags: ["React Native", "Firebase", "Charts", "HealthKit"],
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800",
      github: "https://github.com/example/fitness-tracker",
      demo: null,
      likes: 178,
      views: 2134,
      stars: 134,
      course: "React Native Mobile Development"
    },
    {
      id: 6,
      title: "Sentiment Analysis API",
      author: "Neha Gupta",
      avatar: "NG",
      description: "RESTful API for sentiment analysis using NLP. Analyzes text and returns sentiment scores with 92% accuracy.",
      category: "ai-ml",
      tags: ["Python", "NLP", "FastAPI", "spaCy"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
      github: "https://github.com/example/sentiment-api",
      demo: "https://demo.example.com",
      likes: 103,
      views: 967,
      stars: 78,
      course: "Python for Data Science"
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === "all" || project.category === selectedCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Project Showcase</h1>
          <p className="text-gray-600">Explore amazing projects built by our students</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow">
              Submit Project
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <cat.icon className="w-4 h-4" />
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-500 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <div className="px-2 py-1 bg-black/50 backdrop-blur-sm rounded text-white text-xs font-medium flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {project.views}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{project.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {project.avatar}
                      </div>
                      <span>{project.author}</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.slice(0, 3).map((tag, idx) => (
                    <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        {project.likes}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        {project.stars}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </a>
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
