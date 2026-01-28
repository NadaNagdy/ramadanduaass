// src/app/blog/[slug]/page.js
import { getPostData } from '../../lib/posts'; // تأكدي من صحة المسار لملف posts

export default async function Post({ params }) {
  // 👇 الخطوة دي إجبارية في Next.js 15
  const { slug } = await params; 
  
  try {
    const postData = await getPostData(slug);

    return (
      <article className="max-w-3xl mx-auto p-6 text-right" dir="rtl">
        <header className="mb-8 border-b pb-4">
          <h1 className="text-4xl font-bold mb-4 text-primary">{postData.title}</h1>
          <div className="text-gray-500 text-sm">
            <span>{postData.date}</span> • <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{postData.category}</span>
          </div>
        </header>
        
        {/* عرض المحتوى */}
        <div 
          className="prose lg:prose-xl max-w-none leading-relaxed"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
        />
      </article>
    );
  } catch (error) {
    // لو المقال مش موجود أو فيه مشكلة
    return <div className="text-center p-20">عذراً، المقال غير موجود حالياً.</div>;
  }
}
