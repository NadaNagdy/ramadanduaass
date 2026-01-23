import { StructuredData } from '@/components/seo/structured-data';

export default function DuasIndexPage() {
  return (
    <>
      <StructuredData
        type="WebPage"
        data={{
          name: 'منصة الأدعية - الرئيسية',
          description: 'تصفح جميع الأدعية المكتوبة والمستجابة',
          url: 'https://ramadanduaass.com',
        }}
      />

      <main className="container mx-auto p-4 rtl" dir="rtl">
        <h1 className="text-2xl font-bold mb-6 text-center">قائمة الأدعية المختارة</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* روابط للأدعية */}
          <Link href="/duas/morning-dua" className="block p-6 bg-white border rounded-lg hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2">دعاء الصباح</h2>
            <p className="text-gray-600">اضغط لقراءة الدعاء...</p>
          </Link>

          <Link href="/duas/evening-dua" className="block p-6 bg-white border rounded-lg hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2">دعاء المساء</h2>
            <p className="text-gray-600">اضغط لقراءة الدعاء...</p>
          </Link>
          
          <Link href="/duas/travel-dua" className="block p-6 bg-white border rounded-lg hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2">دعاء السفر</h2>
            <p className="text-gray-600">اضغط لقراءة الدعاء...</p>
          </Link>
        </div>
      </main>
    </>
  );
}
