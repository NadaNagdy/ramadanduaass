import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// تحديد مسار مجلد المقالات باستخدام جذر المشروع لضمان الوصول إليه في Vercel
const postsDirectory = path.join(process.cwd(), 'content/articles');

/**
 * 1. وظيفة جلب وترتيب المقالات
 * تقوم بعرض المقالات التي يوافق تاريخها اليوم أو ما قبله فقط
 */
export function getSortedPostsData() {
  // التأكد من وجود المجلد لتجنب انهيار التطبيق
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md')) // تجاهل أي ملفات غير مدعومة
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      // استخدام gray-matter لاستخراج البيانات الوصفية (Front-matter)
      const matterResult = matter(fileContents);

      return {
        slug,
        ...matterResult.data,
      };
    });

  // الحصول على تاريخ اليوم بتنسيق YYYY-MM-DD (مثلاً: 2026-01-29)
  const today = new Date().toISOString().split('T')[0];
  
  return allPostsData
    // نظام النشر التلقائي: يظهر المقال فقط إذا كان تاريخه قد حان
    .filter(post => post.date <= today) 
    // ترتيب تنازلي (الأحدث يظهر أولاً)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/**
 * 2. وظيفة جلب بيانات مقال واحد
 * تحول محتوى الـ Markdown إلى HTML للعرض في صفحة [slug]
 */
export async function getPostData(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    throw new Error(`المقال المطلوب غير موجود: ${slug}`);
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  // معالجة المحتوى لتحويله من Markdown إلى HTML
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
