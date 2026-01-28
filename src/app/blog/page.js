import { getSortedPostsData } from '../../lib/posts';
import Link from 'next/link';

export default function BlogPage() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="min-h-screen text-white p-8 md:p-16" dir="rtl">
      <header className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-5xl font-black text-yellow-500 mb-6">موسوعة رمضان 🌙</h1>
        <p className="text-slate-400 text-lg">كل ما تحتاجه من أدعية وأذكار ومقالات إيمانية طوال الشهر الكريم</p>
      </header>

      <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {allPostsData.map(({ slug, title, category, description }) => (
          <Link href={`/blog/${slug}`} key={slug} className="group">
            <div className="h-full bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-yellow-500/50 hover:bg-slate-800/50 transition-all duration-300">
              <span className="text-[10px] font-bold text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded-md uppercase">
                {category}
              </span>
              <h2 className="text-xl font-bold mt-4 mb-2 group-hover:text-yellow-500 transition-colors">
                {title}
              </h2>
              <p className="text-slate-500 text-sm line-clamp-2">
                {description}
              </p>
              <div className="mt-6 text-yellow-500 text-xs font-bold flex items-center gap-1">
                اقرأ المزيد <span>←</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
