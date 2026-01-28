import type { Metadata } from 'next';
import './globals.css';
import { Cairo, Amiri } from 'next/font/google'; // ✅ استيراد الخطوط بطريقة Next.js الحديثة
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { Toaster } from "@/components/ui/toaster";
import GoogleAnalytics from '@/components/GoogleAnalytics';

// إعداد الخطوط لضمان سرعة التحميل وعدم حدوث Layout Shift
const cairo = Cairo({ 
  subsets: ['arabic'], 
  variable: '--font-cairo',
  display: 'swap',
});

const amiri = Amiri({ 
  subsets: ['arabic'], 
  weight: ['400', '700'], 
  variable: '--font-amiri',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'أدعية رمضان – 30 يوم',
  description: 'مساحة هادئة للتأمل والدعاء والمشاركة في أيام شهر رمضان المبارك',
  icons: {
    icon: '/favicon.ico', // تأكدي من وجود ملف favicon
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} ${amiri.variable}`}>
      <body 
        className="font-cairo bg-background text-foreground antialiased overflow-x-hidden" 
        suppressHydrationWarning
      >
        <div className="min-h-screen flex flex-col relative">
          {/* خلفية جمالية خفيفة تليق بأجواء رمضان (اختياري) */}
          <div className="fixed inset-0 bg-[url('/bg-pattern.png')] opacity-5 pointer-events-none -z-10" />
          
          <Navigation />
          
          {/* إضافة padding علوي بسيط للتأكد من أن المحتوى لا يختفي خلف الـ Navigation الثابت */}
          <main className="flex-grow pt-4">
            {children}
          </main>
          
          <Footer />
        </div>
        
        <Toaster />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
