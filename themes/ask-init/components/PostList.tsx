import Link from 'next/link';
import { format } from 'date-fns';

interface Post {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  category: string;
  readTime: string;
  image?: string;
}

interface PostListProps {
  posts: Post[];
  title?: string;
  showViewAll?: boolean;
}

export default function PostList({ posts, title = 'Latest Articles', showViewAll = true }: PostListProps) {
  return (
    <section className="py-12 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h2>
          {showViewAll && (
            <Link href="/posts" className="text-primary-600 dark:text-primary-400 hover:underline font-medium">
              View all articles
            </Link>
          )}
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.id} className="group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800">
              <Link href={`/posts/${post.slug}`}>
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={post.image || '/placeholder-image.jpg'} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute top-4 right-4 bg-primary-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                    <time dateTime={post.date}>
                      {format(new Date(post.date), 'MMMM d, yyyy')}
                    </time>
                    <span className="mx-2">•</span>
                    <span>{post.readTime} read</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center text-primary-600 dark:text-primary-400 font-medium group-hover:underline">
                    Read more
                    <svg className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
