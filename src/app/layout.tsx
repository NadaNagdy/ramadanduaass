import type { Metadata } from 'next';
import './globals.css';
import { Cairo, Amiri } from 'next/font/google';
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

// التعديل هنا: إضافة الـ Verification لربط الموقع بجوجل
export const metadata: Metadata = {
  title: 'أدعية رمضان – 30 يوم',
  description: 'مساحة هادئة للتأمل والدعاء والمشاركة في أيام شهر رمضان المبارك',
  icons: {
    icon: '/favicon.ico',
  },
  // 👇 هذا الجزء هو المسؤول عن تفعيل "HTML tag" في Google Search Console
  verification: {
    google: '<meta name="google-site-verification" content="04Iz04z7UnvFr6OP_sUBi1tOuxHrfvcxF2iTOKyNLNY" />', 
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
          {/* خلفية جمالية خفيفة تليق بأجواء رمضان */}
          <div className="fixed inset-0 bg-[url('/bg-pattern.png')] opacity-5 pointer-events-none -z-10" />
          
          <Navigation />
          
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
