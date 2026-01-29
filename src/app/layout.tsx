import type { Metadata } from 'next';
import './globals.css';
import { Cairo, Amiri } from 'next/font/google';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { Toaster } from "@/components/ui/toaster";
import GoogleAnalytics from '@/components/GoogleAnalytics';

// إعداد الخطوط لضمان سرعة التحميل
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

// إعداد الـ Metadata مع حل مشكلة التحقق (Verification)
export const metadata: Metadata = {
  title: 'أدعية رمضان – 30 يوم',
  description: 'مساحة هادئة للتأمل والدعاء والمشاركة في أيام شهر رمضان المبارك',
  verification: {
    // ✅ ضع هنا فقط الجزء الموجود داخل content="..." من الكود الذي أعطاك إياه جوجل
    google: '04Iz04z7UnvFr6OP_sUBi1tOuxHrfvcxF2iTOKyNLNY', 
  },
  icons: {
    icon: '/favicon.ico',
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
