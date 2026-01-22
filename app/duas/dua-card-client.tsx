'use client';

interface DuaCardClientProps {
  title: string;
  dua: string;
}

export default function DuaCardClient({ title, dua }: DuaCardClientProps) {
  return (
    <div className="p-6 bg-card rounded-2xl shadow-lg max-w-xl mx-auto mt-10">
      <h1 className="text-3xl text-gold font-bold mb-4">{title}</h1>
      <p className="text-lg">{dua}</p>
    </div>
  );
}
