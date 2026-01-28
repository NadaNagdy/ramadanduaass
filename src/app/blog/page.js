// src/app/blog/page.js
// السطر ده هو اللي ناقص: استدعاء الوظيفة من مجلد lib
import { getSortedPostsData } from '../../lib/posts'; 
import Link from 'next/link';

export default function BlogPage() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="max-w-4xl mx-auto p-8 text-right" dir="rtl">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-emerald-800 mb-4">مدونة رمضان 🌙</h1>
        <p className="text-gray-600">مقالات يومية لزيادة الإيمان والتقرب إلى الله</p>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        {allPostsData.map(({ slug, date, title, description, category }) => (
          <article key={slug} className="border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-shadow bg-white">
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
              {category}
            </span>
            <h2 className="text-2xl font-bold my-3 text-gray-800">
              <Link href={`/blog/${slug}`} className="hover:text-emerald-700">
                {title}
              </Link>
            </h2>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              {description}
            </p>
            <div className="flex justify-between items-center text-xs text-gray-400">
              <span>{date}</span>
              <Link href={`/blog/${slug}`} className="text-emerald-600 font-bold">
                اقرأ المزيد ←
              </Link>
            </div>
          </article>
        ))}
      </div>

      {allPostsData.length === 0 && (
        <p className="text-center text-gray-500 mt-20">قريباً.. أول مقالات رمضان</p>
      )}
    </div>
  );
}
