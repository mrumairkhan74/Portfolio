export const blogPosts = [
  {
    id: '1',
    title: 'Building Real-time Applications with Socket.io and React',
    excerpt: 'Learn how to create powerful real-time features like live chat, notifications, and collaborative tools using Socket.io and React.',
    content: `
      <p>Real-time applications are becoming increasingly important in modern web development. From chat applications to live dashboards, users expect instant updates and seamless experiences.</p>
      
      <h2>Why Socket.io?</h2>
      <p>Socket.io enables real-time, bidirectional, and event-based communication between the browser and the server. It works on every platform, browser, or device, focusing on reliability and speed.</p>
      
      <h2>Setting Up Socket.io</h2>
      <p>First, install the required packages:</p>
      <pre><code>npm install socket.io socket.io-client</code></pre>
      
      <h2>Server Setup</h2>
      <pre><code>const io = require('socket.io')(server);
io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('message', (data) => {
    io.emit('message', data);
  });
});</code></pre>
      
      <h2>Client Setup</h2>
      <pre><code>import io from 'socket.io-client';
const socket = io('http://localhost:3000');
socket.emit('message', { text: 'Hello World' });
socket.on('message', (data) => {
  console.log(data);
});</code></pre>
      
      <p>With Socket.io, you can build anything from simple chat apps to complex collaborative tools like Google Docs!</p>
    `,
    author: 'Umair Khan',
    authorAvatar: 'https://placehold.co/40x40',
    date: '2024-02-15',
    readTime: '5 min read',
    category: 'Tutorial',
    tags: ['Socket.io', 'React', 'Real-time', 'WebSockets'],
    imageUrl: 'https://placehold.co/800x500/1a1a2e/00F0FF?text=Socket.io+Guide',
    likes: 24,
    comments: 8
  },
  {
    id: '2',
    title: 'Mastering MongoDB Aggregation Pipeline',
    excerpt: 'Deep dive into MongoDB aggregation pipeline for complex data processing and analytics.',
    content: `
      <p>The MongoDB aggregation pipeline is a powerful tool for data processing and analysis. It allows you to transform and combine documents in your collections to produce aggregated results.</p>
      
      <h2>Understanding the Pipeline</h2>
      <p>The aggregation pipeline is a framework for data aggregation modeled on the concept of data processing pipelines. Documents enter a multi-stage pipeline that transforms them into aggregated results.</p>
      
      <h2>Common Stages</h2>
      <ul>
        <li><strong>$match</strong> - Filters documents</li>
        <li><strong>$group</strong> - Groups documents by a specified identifier</li>
        <li><strong>$sort</strong> - Sorts documents</li>
        <li><strong>$project</strong> - Reshapes documents</li>
        <li><strong>$lookup</strong> - Performs left outer join</li>
      </ul>
      
      <h2>Example: Sales Analytics</h2>
      <pre><code>db.sales.aggregate([
  { $match: { date: { $gte: ISODate('2024-01-01') } } },
  { $group: { _id: "$product", total: { $sum: "$amount" } } },
  { $sort: { total: -1 } },
  { $limit: 10 }
])</code></pre>
      
      <p>Mastering aggregation pipeline will take your MongoDB skills to the next level!</p>
    `,
    author: 'Umair Khan',
    authorAvatar: 'https://placehold.co/40x40',
    date: '2024-02-10',
    readTime: '7 min read',
    category: 'Database',
    tags: ['MongoDB', 'Aggregation', 'Database', 'Backend'],
    imageUrl: 'https://placehold.co/800x500/1a1a2e/8B5CF6?text=MongoDB+Guide',
    likes: 18,
    comments: 5
  },
  {
    id: '3',
    title: 'Authentication Best Practices in MERN Stack',
    excerpt: 'Secure your MERN applications with JWT, bcrypt, and best security practices.',
    content: `
      <p>Authentication is crucial for any web application. In this post, I'll share best practices for implementing secure authentication in MERN stack applications.</p>
      
      <h2>Password Hashing with bcrypt</h2>
      <p>Never store plain text passwords! Use bcrypt to hash passwords before storing them in your database.</p>
      <pre><code>const bcrypt = require('bcryptjs');
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);</code></pre>
      
      <h2>JWT for Session Management</h2>
      <p>JSON Web Tokens are perfect for stateless authentication in modern web apps.</p>
      <pre><code>const jwt = require('jsonwebtoken');
const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
  expiresIn: '7d'
});</code></pre>
      
      <h2>Protecting Routes</h2>
      <p>Create middleware to verify JWT tokens and protect your API routes.</p>
      <pre><code>const authMiddleware = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'No token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token' });
  }
};</code></pre>
      
      <p>Remember to always use HTTPS in production and implement rate limiting!</p>
    `,
    author: 'Umair Khan',
    authorAvatar: 'https://placehold.co/40x40',
    date: '2024-02-05',
    readTime: '6 min read',
    category: 'Security',
    tags: ['Authentication', 'JWT', 'Security', 'MERN'],
    imageUrl: 'https://placehold.co/800x500/1a1a2e/EC4899?text=Auth+Guide',
    likes: 32,
    comments: 12
  },
  {
    id: '4',
    title: 'Optimizing React Performance: A Complete Guide',
    excerpt: 'Learn techniques to make your React applications faster and more efficient.',
    content: `
      <p>React is fast by default, but there are many techniques to optimize your applications for better performance.</p>
      
      <h2>Using React.memo</h2>
      <p>Prevent unnecessary re-renders of functional components.</p>
      <pre><code>const MyComponent = React.memo(({ data }) => {
  return <div>{data}</div>;
});</code></pre>
      
      <h2>useCallback and useMemo</h2>
      <p>Memoize functions and values to prevent recreation on every render.</p>
      <pre><code>const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
const memoizedCallback = useCallback(() => doSomething(a, b), [a, b]);</code></pre>
      
      <h2>Code Splitting with React.lazy</h2>
      <p>Split your code into smaller chunks that load on demand.</p>
      <pre><code>const LazyComponent = React.lazy(() => import('./Component'));
&lt;Suspense fallback={<div>Loading...</div>}&gt;
  <LazyComponent />
&lt;/Suspense&gt;</code></pre>
      
      <p>These techniques can significantly improve your app's performance and user experience!</p>
    `,
    author: 'Umair Khan',
    authorAvatar: 'https://placehold.co/40x40',
    date: '2024-01-28',
    readTime: '8 min read',
    category: 'Frontend',
    tags: ['React', 'Performance', 'Optimization', 'JavaScript'],
    imageUrl: 'https://placehold.co/800x500/1a1a2e/00F0FF?text=React+Performance',
    likes: 45,
    comments: 15
  },
  {
    id: '5',
    title: 'Getting Started with Tailwind CSS',
    excerpt: 'Learn why Tailwind CSS is revolutionizing frontend development.',
    content: `
      <p>Tailwind CSS has changed how we think about styling web applications. It's a utility-first CSS framework that makes styling fast and consistent.</p>
      
      <h2>Why Tailwind?</h2>
      <ul>
        <li>No more context switching between HTML and CSS</li>
        <li>Consistent design system</li>
        <li>Small production bundle size</li>
        <li>Highly customizable</li>
      </ul>
      
      <h2>Installation</h2>
      <pre><code>npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p</code></pre>
      
      <h2>Basic Usage</h2>
      <pre><code><div className="flex items-center justify-between p-4 bg-cyber-cyan/10 rounded-lg">
  <h1 className="text-2xl font-bold gradient-text">Hello Tailwind</h1>
  <button className="px-4 py-2 bg-gradient-to-r from-cyber-cyan to-cyber-purple rounded-full">
    Click Me
  </button>
</div></code></pre>
      
      <p>Tailwind makes development faster and more enjoyable. Give it a try!</p>
    `,
    author: 'Umair Khan',
    authorAvatar: 'https://placehold.co/40x40',
    date: '2024-01-20',
    readTime: '4 min read',
    category: 'CSS',
    tags: ['Tailwind CSS', 'CSS', 'Frontend', 'Styling'],
    imageUrl: 'https://placehold.co/800x500/1a1a2e/8B5CF6?text=Tailwind+CSS',
    likes: 28,
    comments: 9
  }
];

export const categories = ['All', 'Tutorial', 'Database', 'Security', 'Frontend', 'CSS'];