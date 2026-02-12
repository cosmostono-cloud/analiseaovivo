"use client";

import React from 'react';
import { Badge } from "@/components/ui/badge";

interface SignalBadgeProps {
  sinal: string;
}

const SignalBadge = ({ sinal }: SignalBadgeProps) => {
  const normalizedSignal = sinal.toUpperCase();
  
  let colorClass = "bg-gray-400 hover:bg-gray-500 text-white"; // AGUARDANDO
  
  if (normalizedSignal === 'COMPRA') {
    colorClass = "bg-emerald-500 hover:bg-emerald-600 text-white";
  } else if (normalizedSignal === 'VENDA') {
    colorClass = "bg-rose-500 hover:bg-rose-600 text-white";
  }

  return (
    <Badge className={`${colorClass} font-bold px-3 py-1 rounded-full transition-colors`}>
      {normalizedSignal}
    </Badge>
  );
};

export default SignalBadge;