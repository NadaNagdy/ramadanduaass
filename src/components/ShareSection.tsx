"use client";

import { useEffect, useState } from "react";

export default function ShareSection({ title }: { title: string }) {
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const shareWhatsApp = () => {
    const text = encodeURIComponent(`${title}\nاقرأ المزيد في موقع أدعية رمضان:\n${currentUrl}`);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const shareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, "_blank");
  };

  return (
    <div className="text-center mt-16 bg-gradient-to-r from-cyan-600 to-teal-600 rounded-3xl shadow-2xl p-10 text-white relative overflow-hidden">
      <h3 className="text-3xl font-bold mb-4">أنشر هذا الخير وشارك الأجر</h3>
      <p className="text-xl mb-8 opacity-90">قال رسول الله ﷺ: "الدال على الخير كفاعله"</p>
      <div className="flex justify-center gap-4 flex-wrap relative z-10">
        <button 
          onClick={shareWhatsApp} 
          className="bg-[#25D366] text-white px-8 py-4 rounded-full font-bold shadow-lg hover:scale-105 transition-all"
        >
          مشاركة عبر واتساب
        </button>
        <button 
          onClick={shareFacebook} 
          className="bg-[#1877F2] text-white px-8 py-4 rounded-full font-bold shadow-lg hover:scale-105 transition-all"
        >
          مشاركة عبر فيسبوك
        </button>
      </div>
    </div>
  );
}
