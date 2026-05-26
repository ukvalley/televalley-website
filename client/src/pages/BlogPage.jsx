import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, Tag, Search, ArrowRight } from 'lucide-react';
import { blogApi } from '../services/api';
import useScrollToTop from '../hooks/useScrollToTop';

export default function BlogPage() {
  useScrollToTop();
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsRes, catsRes] = await Promise.all([
          blogApi.getAll({ status: 'published' }),
          blogApi.getCategories()
        ]);
        setPosts(postsRes.data.posts);
        setCategories(catsRes.data);
      } catch (err) {
        console.error('Failed to load blog data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = !search ||
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="badge mb-4">Blog</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Televalley <span className="gradient-text">Blog</span>
          </h1>
          <p className="text-[#8B949E] text-lg">
            Insights, strategies, and tips for modern telecalling teams.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B949E]" />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="md:w-48"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="h-48 bg-white/5 rounded-lg mb-4" />
                <div className="h-4 bg-white/5 rounded w-1/4 mb-2" />
                <div className="h-6 bg-white/5 rounded w-3/4 mb-2" />
                <div className="h-4 bg-white/5 rounded w-full mb-2" />
                <div className="h-4 bg-white/5 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <Search className="w-12 h-12 text-[#8B949E] mx-auto mb-4" />
            <p className="text-[#8B949E]">No posts found. Try a different search.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="card group flex flex-col"
              >
                <div className="h-48 rounded-lg bg-gradient-to-br from-[#C8FF2E]/10 to-[#22D3EE]/10 mb-4 flex items-center justify-center">
                  <Tag className="w-8 h-8 text-[#8B949E]" />
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <span className="badge text-xs">{post.category}</span>
                  <span className="flex items-center gap-1 text-xs text-[#8B949E]">
                    <Calendar className="w-3 h-3" />
                    {formatDate(post.publishedAt)}
                  </span>
                </div>

                <Link to={`/blog/${post.slug}`}>
                  <h3 className="text-xl font-semibold text-[#E6EDF3] mb-2 group-hover:text-[#C8FF2E] transition-colors">
                    {post.title}
                  </h3>
                </Link>

                <p className="text-sm text-[#8B949E] mb-4 flex-1">{post.excerpt}</p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                  <span className="text-xs text-[#8B949E]">By {post.author}</span>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="flex items-center gap-1 text-sm text-[#C8FF2E] hover:text-[#22D3EE] transition-colors"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
