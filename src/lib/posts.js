import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// تحديد مسار مجلد المقالات (جذر المشروع + content/articles)
const postsDirectory = path.join(process.cwd(), 'content/articles');

// 1. وظيفة لجلب كل المقالات مرتبة بالتاريخ (لصفحة الـ Blog الرئيسية)
export function getSortedPostsData() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  
  // فلترة الملفات التي تنتهي بـ .md فقط وتجاهل الملفات المخفية مثل .gitkeep
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const medicalResult = matter(fileContents);

      return {
        slug,
        ...medicalResult.data,
      };
    });

  // ترتيب المقالات حسب التاريخ (الأحدث أولاً)
  // يمكنك أيضاً تفعيل نظام "مقال كل يوم" هنا بإضافة filter للتاريخ الحالي
  const today = new Date().toISOString().split('T')[0];
  
  return allPostsData
    .filter(post => post.date <= today) // عرض المقالات التي حل موعدها فقط
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

// 2. وظيفة لجلب بيانات مقال واحد بالاسم (لصفحة الـ [slug])
export async function getPostData(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Post not found: ${slug}`);
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  // تحويل الـ Markdown إلى HTML
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    contentHtml,
    ...matterResult.data,
  };
}
