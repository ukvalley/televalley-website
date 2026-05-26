const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// In-memory blog storage
let posts = [
  {
    id: 1,
    slug: 'sim-vs-voip-why-sales-teams-are-switching',
    title: 'SIM vs VoIP: Why Sales Teams Are Switching to SIM-Based Calling',
    excerpt: 'Discover why leading sales teams are abandoning VoIP for native SIM-based calling to eliminate drops and boost conversions.',
    content: `<p>VoIP has been the standard for business calling for years, but it comes with significant drawbacks that cost sales teams money every day. Call drops, latency issues, and dependency on internet bandwidth create friction in the sales process.</p><p>SIM-based calling leverages the native cellular network, providing unmatched reliability. When your rep is on a crucial closing call, the last thing you want is a dropped connection due to WiFi instability.</p><h2>The Cost of Dropped Calls</h2><p>Research shows that 34% of prospects who experience a dropped call during a sales conversation never answer again. That's a lost opportunity that could have been avoided with reliable SIM-based connectivity.</p>`,
    category: 'Sales Technology',
    tags: ['SIM calling', 'VoIP', 'sales productivity'],
    author: 'Umesh Jain',
    authorRole: 'CEO',
    publishedAt: '2024-01-15T10:00:00Z',
    status: 'published',
    featuredImage: '/blog/sim-vs-voip.jpg',
    views: 1240
  },
  {
    id: 2,
    slug: 'automated-follow-ups-close-more-deals',
    title: 'How Automated Follow-Ups Help You Close 40% More Deals',
    excerpt: 'Manual follow-ups are killing your conversion rates. Learn how automated telecalling workflows ensure no lead falls through the cracks.',
    content: `<p>The average sales rep follows up with only 20% of leads after the first contact. This isn't because reps are lazy—it's because manual tracking systems fail under pressure.</p><p>Automated follow-up workflows change the game by triggering actions based on call outcomes. No-answer? Schedule an auto-redial. Voicemail? Trigger a personalized SMS.</p>`,
    category: 'Sales Strategy',
    tags: ['automation', 'follow-ups', 'conversion'],
    author: 'Umesh Jain',
    authorRole: 'CEO',
    publishedAt: '2024-02-01T10:00:00Z',
    status: 'published',
    featuredImage: '/blog/automated-followups.jpg',
    views: 890
  },
  {
    id: 3,
    slug: 'mobile-first-crm-real-estate',
    title: 'Why Real Estate Teams Need a Mobile-First CRM',
    excerpt: 'Field agents need CRM access on the go. See how a mobile-first telecalling CRM transforms real estate operations.',
    content: `<p>Real estate agents spend 60% of their working hours in the field. Desktop-bound CRMs force them to remember details until they return to the office, resulting in lost information and missed follow-ups.</p><p>A mobile-first CRM puts the entire pipeline in their pocket. Log calls, update lead status, and schedule follow-ups—all while driving to the next property showing.</p>`,
    category: 'Real Estate',
    tags: ['real estate', 'mobile CRM', 'field sales'],
    author: 'Umesh Jain',
    authorRole: 'CEO',
    publishedAt: '2024-02-20T10:00:00Z',
    status: 'published',
    featuredImage: '/blog/mobile-crm-real-estate.jpg',
    views: 670
  },
  {
    id: 4,
    slug: 'reduce-lead-response-time',
    title: '5 Ways to Reduce Lead Response Time to Under 5 Minutes',
    excerpt: 'Speed to lead is the #1 predictor of conversion. Here are proven strategies to slash your response time.',
    content: `<p>Leads contacted within 5 minutes are 21x more likely to convert than those contacted after 30 minutes. Yet the average company takes 42 hours to respond to a new lead.</p><p>Implementing instant lead assignment, automated dialing sequences, and mobile notifications can bring your response time down to under 5 minutes consistently.</p>`,
    category: 'Sales Strategy',
    tags: ['lead response', 'speed to lead', 'conversion'],
    author: 'Umesh Jain',
    authorRole: 'CEO',
    publishedAt: '2024-03-05T10:00:00Z',
    status: 'published',
    featuredImage: '/blog/lead-response-time.jpg',
    views: 1520
  }
];

let postIdCounter = 5;

const postValidation = [
  body('title').trim().notEmpty(),
  body('slug').trim().notEmpty(),
  body('content').trim().notEmpty(),
  body('category').trim().notEmpty(),
  body('author').trim().notEmpty()
];

// GET all posts
router.get('/', (req, res) => {
  const { category, tag, status = 'published', search, page = 1, limit = 10 } = req.query;
  let result = [...posts];

  if (status) result = result.filter(p => p.status === status);
  if (category) result = result.filter(p => p.category === category);
  if (tag) result = result.filter(p => p.tags.includes(tag));
  if (search) {
    const s = search.toLowerCase();
    result = result.filter(p =>
      p.title.toLowerCase().includes(s) ||
      p.excerpt.toLowerCase().includes(s) ||
      p.content.toLowerCase().includes(s)
    );
  }

  const total = result.length;
  const start = (page - 1) * limit;
  const paginated = result.slice(start, start + parseInt(limit));

  res.json({ posts: paginated, total, page: parseInt(page), pages: Math.ceil(total / limit) });
});

// GET categories
router.get('/categories', (req, res) => {
  const cats = [...new Set(posts.map(p => p.category))];
  res.json(cats);
});

// GET tags
router.get('/tags', (req, res) => {
  const tags = [...new Set(posts.flatMap(p => p.tags))];
  res.json(tags);
});

// GET post by slug
router.get('/post/:slug', (req, res) => {
  const post = posts.find(p => p.slug === req.params.slug);
  if (!post) return res.status(404).json({ error: 'Post not found' });
  post.views = (post.views || 0) + 1;
  res.json(post);
});

// GET post by ID
router.get('/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
});

// POST create post
router.post('/', postValidation, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const post = {
    id: postIdCounter++,
    ...req.body,
    status: req.body.status || 'draft',
    views: 0,
    publishedAt: req.body.status === 'published' ? new Date().toISOString() : null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  posts.push(post);
  res.status(201).json(post);
});

// PUT update post
router.put('/:id', (req, res) => {
  const index = posts.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Post not found' });

  posts[index] = { ...posts[index], ...req.body, updatedAt: new Date().toISOString() };
  res.json(posts[index]);
});

// DELETE post
router.delete('/:id', (req, res) => {
  const index = posts.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Post not found' });
  posts.splice(index, 1);
  res.json({ message: 'Post deleted' });
});

module.exports = router;
