import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'منصة الأدعية',
  description: 'أدعية إسلامية مكتوبة ومسموعة',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
