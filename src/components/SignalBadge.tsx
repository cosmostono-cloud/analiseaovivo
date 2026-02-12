"use client";

import React from 'react';
import { Badge } from "@/components/ui/badge";

interface SignalBadgeProps {
  sinal: string;
}

const SignalBadge = ({ sinal }: SignalBadgeProps) => {
  const normalizedSignal = sinal.toUpperCase();
  
  let colorClass = "bg-slate-800 text-slate-400 border-slate-700"; // AGUARDANDO
  
  if (normalizedSignal === 'COMPRA') {
    colorClass = "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
  } else if (normalizedSignal === 'VENDA') {
    colorClass = "bg-rose-500/10 text-rose-400 border-rose-500/20";
  }

  return (
    <Badge variant="outline" className={`${colorClass} font-bold px-3 py-1 rounded-md transition-all duration-300 shadow-sm`}>
      {normalizedSignal}
    </Badge>
  );
};

export default SignalBadge;