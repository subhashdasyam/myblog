import { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../../components/Layout';
import Hero from '../../components/Hero';
import Features from '../../components/Features';
import PostList from '../../components/PostList';
import Newsletter from '../../components/Newsletter';

// Sample post data - in a real app, this would come from an API or CMS
const samplePosts = [
  {
    id: '1',
    title: 'Getting Started with Next.js and TypeScript',
    excerpt: 'Learn how to set up a new Next.js project with TypeScript and configure it for optimal development experience.',
    date: '2023-06-15',
    slug: 'nextjs-typescript-guide',
    category: 'Development',
    readTime: '5 min read',
    image: '/placeholder-1.jpg'
  },
  {
    id: '2',
    title: 'The Future of Web Development in 2023',
    excerpt: 'Explore the latest trends and technologies shaping the future of web development this year and beyond.',
    date: '2023-06-10',
    slug: 'future-web-dev-2023',
    category: 'Technology',
    readTime: '7 min read',
    image: '/placeholder-2.jpg'
  },
  {
    id: '3',
    title: 'Building Accessible Web Applications',
    excerpt: 'A comprehensive guide to creating web applications that are accessible to all users, including those with disabilities.',
    date: '2023-06-05',
    slug: 'accessible-web-apps',
    category: 'Accessibility',
    readTime: '8 min read',
    image: '/placeholder-3.jpg'
  },
  {
    id: '4',
    title: 'Mastering CSS Grid Layout',
    excerpt: 'Learn how to create complex, responsive layouts with CSS Grid and take your web design skills to the next level.',
    date: '2023-05-28',
    slug: 'css-grid-mastery',
    category: 'CSS',
    readTime: '6 min read',
    image: '/placeholder-4.jpg'
  },
  {
    id: '5',
    title: 'State Management in React',
    excerpt: 'Compare different state management solutions for React applications and choose the right one for your project.',
    date: '2023-05-20',
    slug: 'react-state-management',
    category: 'React',
    readTime: '9 min read',
    image: '/placeholder-5.jpg'
  },
  {
    id: '6',
    title: 'Optimizing Web Performance',
    excerpt: 'Proven techniques to improve your website\'s loading speed and overall performance for better user experience.',
    date: '2023-05-15',
    slug: 'web-performance-optimization',
    category: 'Performance',
    readTime: '7 min read',
    image: '/placeholder-6.jpg'
  },
];

const Home: NextPage = () => {
  return (
    <Layout 
      title="Ask Init - Modern Blog Theme" 
      description="A modern blog theme built with Next.js, TypeScript, Tailwind CSS, and Font Awesome"
    >
      <Hero 
        title="Welcome to Ask Init"
        subtitle="Discover insightful articles about technology, development, and innovation"
      />
      
      <Features />
      
      <PostList 
        posts={samplePosts.slice(0, 3)} 
        title="Featured Articles"
      />
      
      <Newsletter />
      
      <PostList 
        posts={samplePosts.slice(3)} 
        title="More Articles"
        showViewAll={false}
      />
    </Layout>
  );
};

export default Home;
