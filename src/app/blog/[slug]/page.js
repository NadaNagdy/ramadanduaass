import { getPostData } from '../../../lib/posts';
import Link from 'next/link';

/**
 * 1. توليد الـ Metadata الديناميكية
 */
export async function generateMetadata({ params }) {
  const { slug } = await params; // فك التغليف لـ params
  try {
    const post = await getPostData(slug);
    const baseUrl = 'https://ramadanduaass.vercel.app';
    
    return {
      title: `${post.title} | أدعية رمضان 2026`,
      description: post.description,
      openGraph: {
        title: post.title,
        description: post.description,
        type: 'article',
        publishedTime: post.date,
        url: `${baseUrl}/blog/${slug}`,
        siteName: 'أدعية رمضان',
        images: [
          {
            url: post.image || `${baseUrl}/og-image.jpg`, // استخدام صورة المقال أو صورة افتراضية
            width: 1200,
            height: 630,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.description,
        images: [post.image || `${baseUrl}/og-image.jpg`],
      },
    };
  } catch (e) {
    return { title: 'مقال غير موجود | أدعية رمضان' };
  }
}

export default async function Post({ params }) {
  const { slug } = await params;
  
  try {
    const postData = await getPostData(slug);
    const baseUrl = 'https://ramadanduaass.vercel.app';

    // 2. إعداد البيانات المنظمة (BlogPosting)
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": postData.title,
      "datePublished": postData.date,
      "dateModified": postData.date,
      "description": postData.description,
      "image": postData.image || `${baseUrl}/og-image.jpg`,
      "author": {
        "@type": "Person",
        "name": "علي النقرشي", // تعزيز السلطة والمصداقية باسمك
        "url": baseUrl
      },
      "publisher": {
        "@type": "Organization",
        "name": "أدعية رمضان",
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/logo.png`
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${baseUrl}/blog/${slug}`
      }
    };

    return (
      <div className="min-h-screen text-white p-6 md:p-12" dir="rtl">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <div className="max-w-3xl mx-auto mb-8">
          <Link href="/blog" className="text-yellow-500 hover:text-yellow-400 flex items-center gap-2 text-sm font-bold transition-colors">
            <span>←</span> العودة لقائمة المقالات
          </Link>
        </div>

        <article className="max-w-3xl mx-auto bg-slate-900/50 p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full -mr-16 -mt-16 blur-3xl" />
          
          <header className="mb-10 border-b border-slate-800 pb-6 relative">
            <span className="text-yellow-500 text-[10px] font-bold uppercase tracking-widest bg-yellow-500/10 px-3 py-1 rounded-full border border-yellow-500/20">
              {postData.category || 'مقالات دينية'}
            </span>
            <h1 className="font-amiri text-4xl md:text-5xl font-bold mt-4 mb-4 text-white leading-tight">
              {postData.title}
            </h1>
            <div className="flex items-center gap-4 text-slate-400 text-xs font-medium">
               <time dateTime={postData.date}>{postData.date}</time>
               <span>•</span>
               <span>بقلم علي النقرشي</span>
            </div>
          </header>
          
          <div 
            className="prose prose-invert prose-yellow lg:prose-xl max-w-none leading-relaxed text-slate-200 font-cairo"
            dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
          />

          <footer className="mt-12 pt-8 border-t border-slate-800 text-center">
            <p className="text-slate-500 text-sm mb-4 italic">أنشر هذه المقالة لتشارك في الأجر والثواب</p>
            <div className="flex justify-center gap-4">
               <a 
                 href={`https://wa.me/?text=${encodeURIComponent(`${postData.title} \n ${baseUrl}/blog/${slug}`)}`}
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="bg-green-600/20 text-green-500 px-6 py-2 rounded-full text-sm font-bold border border-green-600/30 hover:bg-green-600/30 transition-all"
               >
                 مشاركة عبر واتساب
               </a>
            </div>
          </footer>
        </article>
      </div>
    );
  } catch (error) {
    return (
      <div className="text-center py-20 text-white">
        <h2 className="text-2xl font-bold font-amiri">المقال غير موجود حالياً</h2>
        <Link href="/blog" className="text-yellow-500 underline mt-4 inline-block font-cairo">العودة للمدونة</Link>
      </div>
    );
  }
}
