import { getSortedPostsData } from '@/lib/posts';
import Link from 'next/link';

export default function BlogPage() {
  const allPosts = getSortedPostsData();

  return (
    <div className="max-w-4xl mx-auto p-6 text-right" dir="rtl">
      <h1 className="text-3xl font-bold mb-8">مقالاتنا الدينية</h1>
      <div className="grid gap-6">
        {allPosts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.slug} className="block p-4 border rounded-lg hover:shadow-md">
            <h2 className="text-xl font-semibold text-blue-600">{post.title}</h2>
            <p className="text-gray-600">{post.description}</p>
            <span className="text-sm text-gray-400">{post.date}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
