import { getPostData } from '../../../lib/posts';
import Link from 'next/link';

export default async function Post({ params }) {
  const { slug } = await params;
  
  try {
    const postData = await getPostData(slug);

    return (
      <div className="min-h-screen text-white p-6 md:p-12" dir="rtl">
        {/* رابط العودة - Navigation */}
        <div className="max-w-3xl mx-auto mb-8">
          <Link href="/blog" className="text-yellow-500 hover:text-yellow-400 flex items-center gap-2 text-sm font-bold">
            <span>←</span> العودة لقائمة المقالات
          </Link>
        </div>

        <article className="max-w-3xl mx-auto bg-slate-900/50 p-8 rounded-3xl border border-slate-800 shadow-2xl">
          <header className="mb-10 border-b border-slate-800 pb-6">
            <span className="text-yellow-500 text-xs font-bold uppercase tracking-widest bg-yellow-500/10 px-3 py-1 rounded-full">
              {postData.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-black mt-4 mb-4 text-white leading-tight">
              {postData.title}
            </h1>
            <p className="text-slate-400 text-sm">{postData.date}</p>
          </header>
          
          {/* المحتوى مع ضمان ظهور النص باللون الأبيض */}
          <div 
            className="prose prose-invert prose-yellow lg:prose-xl max-w-none leading-relaxed text-slate-200"
            dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
          />
        </article>
      </div>
    );
  } catch (error) {
    return (
      <div className="text-center py-20 text-white">
        <h2 className="text-2xl font-bold">المقال غير موجود حالياً</h2>
        <Link href="/blog" className="text-yellow-500 underline mt-4 inline-block">العودة للمدونة</Link>
      </div>
    );
  }
}
