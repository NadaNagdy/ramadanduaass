"use client";

interface DuaCardClientProps {
  title: string;
  dua: string;
}

export default function DuaCardClient({ title, dua }: DuaCardClientProps) {
  return (
    <div>
      <h1>{title}</h1>
      <p>{dua}</p>
    </div>
  );
}


