const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const outputDir = path.join(process.cwd(), 'content/articles');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

console.log('⏳ جاري البدء في توليد المقالات...');

fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (row) => {
    // تنظيف أسماء العواميد (Headers) عشان لو فيه مسافات مخفية
    const cleanRow = {};
    Object.keys(row).forEach(key => {
        cleanRow[key.trim().toLowerCase()] = row[key];
    });

    // التأكد إن فيه Slug وفيه محتوى (Content)
    if (!cleanRow.slug || !cleanRow.content) {
        return; // تخطي السطر لو البيانات ناقصة
    }

    const fileName = `${cleanRow.slug}.md`;
    const filePath = path.join(outputDir, fileName);
    
    // تحويل المحتوى لنص بأمان والتعامل مع السطر الجديد
    const body = String(cleanRow.content).replace(/\\n/g, '\n');

    const markdownContent = `---
title: "${cleanRow.title || ''}"
slug: "${cleanRow.slug}"
category: "${cleanRow.category || ''}"
date: "${cleanRow.date || ''}"
description: "${cleanRow.description || ''}"
---

${body}
`;

    fs.writeFileSync(filePath, markdownContent);
    console.log(`✅ تم إنشاء: ${fileName}`);
  })
  .on('end', () => {
    console.log('🚀 المهمة تمت بنجاح! المقالات الآن في مجلد content/articles');
  })
  .on('error', (err) => {
    console.error('❌ خطأ في القراءة:', err.message);
  });
