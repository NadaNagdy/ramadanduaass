import type { Metadata, Viewport } from 'next'; // أضفنا Viewport
import './globals.css';
import { Cairo, Amiri } from 'next/font/google';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { Toaster } from "@/components/ui/toaster";
import GoogleAnalytics from '@/components/GoogleAnalytics';

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

// إعداد لون شريط المتصفح (مهم جداً للـ PWA والموبايل)
export const viewport: Viewport = {
  themeColor: '#4f46e5', // استبدله بلون موقعك الرئيسي (مثلاً لون الـ Navy أو الـ Gold)
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: 'أدعية رمضان 2026 – 30 يوم من الطاعات',
    template: '%s | أدعية رمضان' // لجعل العناوين الفرعية تظهر بشكل احترافي
  },
  description: 'موسوعة أدعية رمضان 2026. مساحة هادئة للتأمل، أدعية مستجابة يومية، ومشاركة الخواطر الإيمانية في الشهر الفضيل.',
  applicationName: 'أدعية رمضان',
  authors: [{ name: 'Aly Elnokrashy' }],
  verification: {
    google: '04Iz04z7UnvFr6OP_sUBi1tOuxHrfvcxF2iTOKyNLNY', 
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png', // مهم جداً لمستخدمي الآيفون
  },
  // إضافة الكلمات المفتاحية هنا أيضاً كـ Fallback
  keywords: ['أدعية رمضان', 'دعاء رمضان 2026', 'أدعية إسلامية', '30 دعاء لرمضان'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} ${amiri.variable}`} suppressHydrationWarning>
      <body 
        className="font-cairo bg-background text-foreground antialiased overflow-x-hidden selection:bg-gold/30" 
      >
        {/* تحسين الخلفية: استخدام CSS pattern بدلاً من صورة إذا أمكن، أو التأكد من صغر حجم الصورة */}
        <div className="min-h-screen flex flex-col relative">
          <div 
            className="fixed inset-0 opacity-[0.03] pointer-events-none -z-10 bg-repeat"
            style={{ backgroundImage: "url('/bg-pattern.png')", backgroundSize: '200px' }} 
          />
          
          <Navigation />
          
          {/* تم تقليل الـ pt لضمان عدم وجود مساحة بيضاء كبيرة في الموبايل */}
          <main className="flex-grow pt-2">
            <GoogleAnalytics />
            {children}
          </main>
          
          <Footer />
        </div>
        
        <Toaster />
      </body>
    </html>
  );
}
