"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CrescentMoon } from './islamic-decorations';
// تم إضافة Newspaper هنا
import { Menu, X, BookOpen, Calendar, Heart, Users, FolderHeart, Info, Newspaper } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { path: '/', label: 'الرئيسية' },
    { path: '/daily-duas', label: 'أدعية الأيام', icon: Calendar },
    { path: '/categories', label: 'أدعية بالنية', icon: BookOpen },
    { path: '/blog', label: 'مقالات رمضان', icon: Newspaper }, // ✅ الرابط الجديد للمقالات
    { path: '/ai-dua', label: 'اصنع دعاءك', icon: Heart },
    { path: '/community-duas', label: 'دعاء المشاركين', icon: Users },
    { path: '/my-duas', label: 'أدعيتي', icon: FolderHeart },
    { path: '/about', label: 'عن الموقع', icon: Info },
  ];

  const isActive = (path: string) => {
    if (path === '/') return pathname === path;
    return pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-background/80 backdrop-blur-md border-b border-gold/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3">
            <CrescentMoon className="w-10 h-10 text-gold glow-gold" />
            <span className="font-amiri text-2xl text-cream font-bold">أدعية رمضان</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-4">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link 
                  key={link.path} 
                  href={link.path} 
                  className={cn(
                    'font-cairo text-sm transition-colors flex items-center gap-1.5 py-2 whitespace-nowrap',
                    isActive(link.path) 
                      ? 'text-gold font-semibold border-b-2 border-gold' 
                      : 'text-cream/70 hover:text-gold border-b-2 border-transparent'
                  )}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          <button 
            className="md:hidden text-cream p-2" 
            onClick={() => setIsOpen(!isOpen)} 
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-navy border-t border-gold/10 p-4 absolute top-full left-0 right-0 shadow-lg max-h-[80vh] overflow-y-auto">
          <nav className="container mx-auto flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                href={link.path} 
                onClick={() => setIsOpen(false)} 
                className={cn(
                  'block py-3 px-4 text-center rounded-md transition-colors text-lg',
                  isActive(link.path) 
                    ? 'text-navy bg-gold font-semibold' 
                    : 'text-cream hover:text-gold hover:bg-gold/10'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navigation;
