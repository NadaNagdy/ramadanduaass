"use client";

import React, { useEffect, useState } from 'react';
import DuaOfTheDay from '@/components/DuaOfTheDay';
import { dailyDuas, Dua } from '@/lib/duas';
import { getRamadanDay } from '@/lib/date-helper';

const RamadanDuaClient: React.FC = () => {
  const [ramadanDay, setRamadanDay] = useState<number | null>(null);

  useEffect(() => {
    const d = getRamadanDay();
    setRamadanDay(d);
  }, []);

  // Fall back to the first day if not in Ramadan or if day couldn't be determined yet
  const todayDua: Dua | undefined = ramadanDay ? dailyDuas.find((d) => d.day === ramadanDay) : dailyDuas[0];

  if (!todayDua) return null;

  return <DuaOfTheDay dua={todayDua} />;
};

export default RamadanDuaClient;
