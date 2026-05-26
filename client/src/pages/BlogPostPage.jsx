import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Tag, User, Clock, Share2, MessageCircle, Globe, Users } from 'lucide-react';
import { blogApi, analyticsApi } from '../services/api';
import useScrollToTop from '../hooks/useScrollToTop';

export default function BlogPostPage() {
  useScrollToTop();
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await blogApi.getBySlug(slug);
        setPost(res.data);
        analyticsApi.trackEvent('blog_post_view', { slug, title: res.data.title }).catch(() => {});
      } catch (err) {
        setError('Post not found');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = post?.title || 'Check out this article';
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      default:
        navigator.clipboard.writeText(url);
        return;
    }
    window.open(shareUrl, '_blank', 'width=600,height=400');
    analyticsApi.trackEvent('share', { platform, slug }).catch(() => {});
  };

  if (loading) {
    return (
      <div className="pt-24 pb-16 container">
        <div className="max-w-3xl mx-auto animate-pulse">
          <div className="h-4 bg-white/5 rounded w-1/4 mb-6" />
          <div className="h-10 bg-white/5 rounded w-3/4 mb-4" />
          <div className="h-4 bg-white/5 rounded w-1/2 mb-8" />
          <div className="h-64 bg-white/5 rounded-lg mb-8" />
          <div className="space-y-3">
            <div className="h-4 bg-white/5 rounded w-full" />
            <div className="h-4 bg-white/5 rounded w-full" />
            <div className="h-4 bg-white/5 rounded w-2/3" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="pt-24 pb-16 container">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <p className="text-[#8B949E] mb-6">The article you're looking for doesn't exist.</p>
          <Link to="/blog" className="btn btn-primary">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-[#8B949E] hover:text-[#C8FF2E] mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          <span className="badge mb-4">{post.category}</span>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-[#8B949E]">
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" /> {post.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" /> {formatDate(post.publishedAt)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" /> {Math.ceil(post.content.length / 1000)} min read
            </span>
          </div>

          <div className="h-64 md:h-80 rounded-xl bg-gradient-to-br from-[#C8FF2E]/10 to-[#22D3EE]/10 mb-8 flex items-center justify-center">
            <Tag className="w-12 h-12 text-[#8B949E]" />
          </div>

          <div
            className="prose prose-invert max-w-none mb-10"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="flex flex-wrap gap-2 mb-10">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                to={`/blog?tag=${tag}`}
                className="badge text-xs"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </Link>
            ))}
          </div>

          <div className="card flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#E6EDF3]">Share this article</p>
              <p className="text-xs text-[#8B949E]">Help others discover Televalley</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleShare('twitter')} className="w-9 h-9 rounded-lg bg-[#161B22] border border-white/5 flex items-center justify-center text-[#8B949E] hover:text-[#C8FF2E] transition-colors">
                <MessageCircle className="w-4 h-4" />
              </button>
              <button onClick={() => handleShare('linkedin')} className="w-9 h-9 rounded-lg bg-[#161B22] border border-white/5 flex items-center justify-center text-[#8B949E] hover:text-[#C8FF2E] transition-colors">
                <Globe className="w-4 h-4" />
              </button>
              <button onClick={() => handleShare('facebook')} className="w-9 h-9 rounded-lg bg-[#161B22] border border-white/5 flex items-center justify-center text-[#8B949E] hover:text-[#C8FF2E] transition-colors">
                <Users className="w-4 h-4" />
              </button>
              <button onClick={() => handleShare('copy')} className="w-9 h-9 rounded-lg bg-[#161B22] border border-white/5 flex items-center justify-center text-[#8B949E] hover:text-[#C8FF2E] transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.article>
      </div>
    </div>
  );
}
