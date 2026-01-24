import { dailyDuas, categoryDuas, categories } from '@/lib/duas';

export default function CategoryPage({ params }: { params: { category: string } }) {
  const { category } = params;

  const objectDuas = dailyDuas.filter(dua =>
    dua.category.includes(category)
  );

  const stringDuas = categoryDuas[category] || [];

  const hasObjectDuas = objectDuas.length > 0;

  return (
    <div className="space-y-6">
      {hasObjectDuas ? (
        objectDuas.map(dua => (
          <div key={dua.id}>
            <h3>{dua.arabicTitle}</h3>
            <p>{dua.dua}</p>
          </div>
        ))
      ) : (
        stringDuas.map((dua, index) => (
          <div key={index}>
            <p>{dua}</p>
          </div>
        ))
      )}

      {!hasObjectDuas && stringDuas.length === 0 && (
        <p>لا توجد أدعية في هذا القسم</p>
      )}
    </div>
  );
}
