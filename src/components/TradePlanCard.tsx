"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TradingSignal } from '@/hooks/useTradingSignals';
import { Target, ShieldAlert, TrendingUp, BookOpen } from 'lucide-react';

interface TradePlanCardProps {
  signal: TradingSignal;
}

const TradePlanCard = ({ signal }: TradePlanCardProps) => {
  return (
    <Card className="bg-slate-950 border-indigo-500/30 shadow-[0_0_30px_rgba(79,70,229,0.15)] overflow-hidden">
      <CardHeader className="bg-indigo-500/10 border-b border-indigo-500/20 py-3">
        <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-indigo-400 flex items-center gap-2">
          <BookOpen className="h-3.5 w-3.5" /> Plano de Trade: {signal.ativo}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-5 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-[10px] text-slate-500 uppercase font-bold">Stop Loss (M2/M3)</p>
            <div className="flex items-center gap-2 text-rose-400 font-mono font-bold">
              <ShieldAlert className="h-3.5 w-3.5" /> {signal.detalhesTecnicos.stopLoss}
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] text-slate-500 uppercase font-bold">Alvo Institucional</p>
            <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold">
              <Target className="h-3.5 w-3.5" /> {signal.detalhesTecnicos.takeProfit}
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-800">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] text-slate-500 uppercase font-bold">Relação Risco:Retorno</span>
            <Badge className="bg-indigo-500/20 text-indigo-400 border-indigo-500/30 font-mono">
              {signal.detalhesTecnicos.payoff}
            </Badge>
          </div>
          <p className="text-xs text-slate-400 italic leading-relaxed">
            <span className="text-indigo-400 font-bold">Regra:</span> {signal.detalhesTecnicos.regraAplicada}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

import { Badge } from "@/components/ui/badge";
export default TradePlanCard;