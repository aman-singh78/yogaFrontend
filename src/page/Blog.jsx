import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tag, Calendar, MapPin, Clock, User, FileText, Trash2, Loader, Search, RssIcon, BookOpen } from "lucide-react";
import Footer from "../Components/Footer";

const BlogClientPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  const BASE_URL = "http://localhost:4000/api";

  // Categories based on your existing ones
  const categories = [
    "All",
    "Yoga",
    "Wellness",
    "Fitness",
    "Meditation",
    "Mindfulness",
    "Nutrition",
    "Lifestyle",
  ];

  // Filter blogs based on active category and search query
  const filteredBlogs = blogs
    .filter(blog => activeCategory === "All" || blog.category === activeCategory)
    .filter(blog => 
      searchQuery === "" || 
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Fetch blogs when component mounts
  useEffect(() => {
    fetchBlogs();
  }, []);

  // Fetch all blogs
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/blog/get`, {
        withCredentials: true,
      });
      
      if (response.data && response.data.data) {
        setBlogs(response.data.data);
      } else {
        setBlogs([]);
      }
      setError(null);
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError("Failed to load blogs. Please try again later.");
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle deleting a blog
  // const handleDeleteBlog = async (blogId) => {
  //   if (window.confirm("Are you sure you want to delete this blog post?")) {
  //     setLoading(true);
  //     try {
  //       await axios.delete(`${BASE_URL}/blog/${blogId}`, {
  //         withCredentials: true,
  //       });
        
  //       // Update local state
  //       setBlogs(blogs.filter((blog) => blog.id !== blogId && blog._id !== blogId));
  //     } catch (err) {
  //       console.error("Error deleting blog:", err);
  //       setError("Failed to delete blog. Please try again.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  // };

  // Container and item variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Enhanced Header */}
      <div className="relative bg-gradient-to-br from-blue-100 to-blue-200 dark:from-gray-700 dark:to-gray-900 border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Bar */}
          <div className="flex items-center justify-between py-4 border-b dark:border-gray-700">
            <div className="flex items-center space-x-4">
              <RssIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Subscribe to our blog
              </span>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-gray-900 dark:text-gray-100"
              />
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Main Header Content */}
          <div className="py-16 text-center">
            <div className="inline-flex items-center space-x-2 bg-indigo-100 dark:bg-indigo-900/30 px-4 py-2 rounded-full mb-6">
              <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                Yoga Wisdom
              </span>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Explore the Art of
              <span className="block text-indigo-600 dark:text-indigo-400">
                Mindful Movement
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              Discover in-depth guides, expert tips, and transformative
              practices to deepen your yoga journey.
            </p>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap items-center justify-center space-x-2 space-y-2 md:space-y-0 pb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium 
                ${activeCategory === category 
                  ? "bg-indigo-600 text-white" 
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400"
                } transition-colors duration-300`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-8">
            <Loader className="animate-spin h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-gray-700 dark:text-gray-300">Loading blog posts...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg mb-6">
            <p>{error}</p>
          </div>
        )}

        {/* Featured Posts - Only show if in "All" category */}
        {activeCategory === "All" && blogs.some(blog => blog.featured) && !loading && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Featured Posts</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {blogs
                .filter(blog => blog.featured)
                .map(blog => (
                  <div
                    key={blog.id || blog._id}
                    className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 relative"
                  >
                    <div className="relative h-64">
                      <img
                        src={blog.image || "/api/placeholder/800/600"}
                        alt={blog.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <div className="flex items-center space-x-2 mb-2">
                          <Tag size={16} />
                          <span className="text-sm font-medium">{blog.category}</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                        <p className="text-sm text-gray-200 line-clamp-2">{blog.excerpt}</p>
                      </div>
                    </div>
                    {/* <div className="absolute top-4 right-4">
                      <button
                        onClick={() => handleDeleteBlog(blog.id || blog._id)}
                        className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors shadow-lg"
                      >
                        <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
                      </button>
                    </div> */}
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Regular Blog Posts */}
        {filteredBlogs.length > 0 && !loading ? (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {activeCategory === "All" ? "Latest Posts" : `${activeCategory} Posts`}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map(blog => (
                <div
                  key={blog.id || blog._id}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group relative"
                >
                  <div className="relative">
                    <img
                      src={blog.image || "/api/placeholder/800/600"}
                      alt={blog.title}
                      className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 text-xs font-medium bg-white/90 dark:bg-gray-900/90 text-gray-700 dark:text-gray-300 rounded-full">
                        {blog.category}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <button
                        onClick={() => handleDeleteBlog(blog.id || blog._id)}
                        className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors shadow-lg"
                      >
                        <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {blog.excerpt}
                    </p>
                    <div className="flex items-center justify-between border-t dark:border-gray-700 pt-4 mt-4">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {blog.author}
                        </p>
                        <p>{blog.date}</p>
                      </div>
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{blog.readTime || "5 min read"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : !loading && (
          <div className="text-center py-16">
            <div className="mx-auto w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
              <FileText className="w-8 h-8 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
              No blog posts found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              {searchQuery ? "Try adjusting your search terms." : `There are no blog posts in the ${activeCategory} category yet.`}
            </p>
          </div>
        )}
      </div>

      <Footer />
    </section>
  );
};

export default BlogClientPage;