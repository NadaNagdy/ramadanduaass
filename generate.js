const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const outputDir = path.join(__dirname, 'content/articles');

// التأكد من وجود المجلد
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// قراءة ملف الـ CSV
fs.createReadStream('data.csv') // تأكد إن اسم الملف صح
  .pipe(csv())
  .on('data', (row) => {
    const fileName = `${row.slug}.md`;
    const filePath = path.join(outputDir, fileName);

    // بناء محتوى ملف الـ Markdown
    const markdownContent = `---
title: "${row.title}"
slug: "${row.slug}"
category: "${row.category}"
date: "${row.date}"
description: "${row.description}"
---

${row.content.replace(/\\n/g, '\n')}
`;

    fs.writeFileSync(filePath, markdownContent);
    console.log(`✅ تم إنشاء: ${fileName}`);
  })
  .on('end', () => {
    console.log('🚀 تمت المهمة بنجاح.. المقالات جاهزة للنشر!');
  });
