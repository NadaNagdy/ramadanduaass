"use client";

import React, { useState } from "react";
import { FloatingStars, CrescentMoon, DecorativeDivider } from "@/components/islamic-decorations";
import { Button } from "@/components/ui/button";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function ShareDuaPage() {
  const [dua, setDua] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submitDua = async () => {
    if (!dua.trim()) return;

    setLoading(true);
    try {
      await addDoc(collection(db, "communityDuas"), {
        text: dua.trim(),
        author: "مشارك",
        likes: 0,
        timestamp: serverTimestamp(),
      });
      router.push("/community-duas");
    } catch (error) {
      console.error(error);
      alert("حدث خطأ، حاول مرة أخرى");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-hero-gradient pt-32 pb-20 px-4">
      <FloatingStars />
      <div className="container mx-auto max-w-xl text-center animate-fade-in">
        <CrescentMoon className="w-16 h-16 text-gold mx-auto mb-4" />

        <h1 className="font-amiri text-4xl text-cream mb-2">
          شارك دعاءك
        </h1>

        <p className="text-cream/60 mb-6">
          شارك بدعاء من قلبك ليؤمِّن عليه إخوانك وأخواتك، ويكون لك مثل أجرهم.
        </p>

        <DecorativeDivider className="mb-8" />

        <textarea
          value={dua}
          onChange={(e) => setDua(e.target.value)}
          maxLength={500}
          placeholder="اكتب دعاءك هنا..."
          className="w-full h-40 p-4 rounded-xl bg-white/90 text-navy focus:outline-none"
        />

        <p className="text-sm text-cream/50 mt-2">
          {dua.length} / 500
        </p>

        <Button
          onClick={submitDua}
          disabled={loading}
          className="mt-6 bg-gold text-navy font-bold py-6 px-10 rounded-2xl hover:bg-gold-light"
        >
          {loading ? "جارٍ الإرسال..." : "نشر الدعاء"}
        </Button>
      </div>
    </div>
  );
}
