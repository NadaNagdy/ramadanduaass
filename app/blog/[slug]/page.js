import { getPostData } from '@/lib/posts';

export default async function Post({ params }) {
  const postData = await getPostData(params.slug);

  return (
    <article className="max-w-3xl mx-auto p-6 text-right" dir="rtl">
      <h1 className="text-4xl font-bold mb-4">{postData.title}</h1>
      <div className="text-gray-500 mb-8">{postData.date} - {postData.category}</div>
      
      {/* هنا بيتم عرض محتوى الـ Markdown بعد تحويله لـ HTML */}
      <div 
        className="prose lg:prose-xl"
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
      />
    </article>
  );
}
