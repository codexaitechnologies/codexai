import { useState } from "react";
import {
  MessageSquare, ThumbsUp, Eye, Search, Filter,
  TrendingUp, Users, Calendar, Tag, Send
} from "lucide-react";

export function CommunityPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", name: "All Topics" },
    { id: "javascript", name: "JavaScript" },
    { id: "react", name: "React" },
    { id: "node", name: "Node.js" },
    { id: "cloud", name: "Cloud" },
    { id: "career", name: "Career" }
  ];

  const discussions = [
    {
      id: 1,
      title: "Best practices for state management in large React applications?",
      author: "Priya Sharma",
      avatar: "PS",
      category: "React",
      views: 234,
      replies: 15,
      likes: 42,
      time: "2 hours ago",
      tags: ["React", "State Management", "Redux"],
      excerpt: "I'm working on a large e-commerce application and wondering about the best approach for state management..."
    },
    {
      id: 2,
      title: "How to prepare for AWS Solutions Architect certification?",
      author: "Rahul Kumar",
      avatar: "RK",
      category: "Cloud",
      views: 189,
      replies: 12,
      likes: 38,
      time: "5 hours ago",
      tags: ["AWS", "Certification", "Cloud"],
      excerpt: "Planning to take the AWS SA exam next month. What resources did you find most helpful?"
    },
    {
      id: 3,
      title: "Node.js vs Python for backend development in 2026?",
      author: "Amit Patel",
      avatar: "AP",
      category: "Career",
      views: 456,
      replies: 28,
      likes: 65,
      time: "1 day ago",
      tags: ["Node.js", "Python", "Backend"],
      excerpt: "Looking to specialize in backend development. Which technology stack should I focus on?"
    },
    {
      id: 4,
      title: "Tips for cracking technical interviews at FAANG companies",
      author: "Sneha Singh",
      avatar: "SS",
      category: "Career",
      views: 892,
      replies: 45,
      likes: 128,
      time: "2 days ago",
      tags: ["Interview", "FAANG", "Career"],
      excerpt: "Just got an offer from Google! Here's what worked for me during the interview process..."
    },
    {
      id: 5,
      title: "Understanding JavaScript closures with practical examples",
      author: "Vikram Joshi",
      avatar: "VJ",
      category: "JavaScript",
      views: 567,
      replies: 22,
      likes: 89,
      time: "3 days ago",
      tags: ["JavaScript", "Fundamentals", "Closures"],
      excerpt: "Closures can be tricky. Let me explain them with real-world use cases..."
    }
  ];

  const trendingTopics = [
    { name: "React Hooks", count: 156 },
    { name: "AWS Lambda", count: 142 },
    { name: "System Design", count: 128 },
    { name: "Interview Prep", count: 115 },
    { name: "TypeScript", count: 98 }
  ];

  const activeMembers = [
    { name: "Priya Sharma", posts: 45, avatar: "PS" },
    { name: "Rahul Kumar", posts: 38, avatar: "RK" },
    { name: "Amit Patel", posts: 32, avatar: "AP" },
    { name: "Sneha Singh", posts: 28, avatar: "SS" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Community Forum</h1>
          <p className="text-gray-600">Connect, learn, and grow with fellow tech enthusiasts</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search discussions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow">
              New Discussion
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Discussions */}
          <div className="lg:col-span-2 space-y-4">
            {discussions.map((discussion) => (
              <div key={discussion.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0">
                    {discussion.avatar}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">
                      {discussion.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{discussion.excerpt}</p>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {discussion.tags.map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="font-medium text-gray-900">{discussion.author}</span>
                        <span>{discussion.time}</span>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {discussion.views}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          {discussion.replies}
                        </div>
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="w-4 h-4" />
                          {discussion.likes}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Stats */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-sm p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Community Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span>Members</span>
                  </div>
                  <span className="font-bold">1,245</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    <span>Discussions</span>
                  </div>
                  <span className="font-bold">3,567</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>Active Today</span>
                  </div>
                  <span className="font-bold">234</span>
                </div>
              </div>
            </div>

            {/* Trending Topics */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-gray-900">Trending Topics</h3>
              </div>
              <div className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700 text-sm">{topic.name}</span>
                    </div>
                    <span className="text-xs text-gray-500">{topic.count} posts</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Members */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-gray-900">Top Contributors</h3>
              </div>
              <div className="space-y-3">
                {activeMembers.map((member, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center font-bold text-white text-sm">
                      {member.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 text-sm">{member.name}</div>
                      <div className="text-xs text-gray-600">{member.posts} posts</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Guidelines */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">Community Guidelines</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5"></div>
                  <span>Be respectful and constructive</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5"></div>
                  <span>Search before posting</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5"></div>
                  <span>Use relevant tags</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5"></div>
                  <span>Help others learn and grow</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
