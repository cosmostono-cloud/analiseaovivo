"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TradingSignal } from '@/hooks/useTradingSignals';
import { Target, ShieldAlert, BookOpen, MapPin, Zap } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface TradePlanCardProps {
  signal: TradingSignal;
}

const TradePlanCard = ({ signal }: TradePlanCardProps) => {
  return (
    <Card className="bg-slate-950 border-indigo-500/30 shadow-[0_0_30px_rgba(79,70,229,0.15)] overflow-hidden">
      <CardHeader className="bg-indigo-500/10 border-b border-indigo-500/20 py-3">
        <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-indigo-400 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-3.5 w-3.5" /> Plano: {signal.ativo}
          </div>
          {signal.metodo === 'GORJETA' && (
            <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-[9px]">MÉTODO GORJETA</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-5 space-y-4">
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <MapPin className="h-3.5 w-3.5 text-slate-500 mt-0.5" />
            <div>
              <p className="text-[10px] text-slate-500 uppercase font-bold">Contexto de Valor</p>
              <p className="text-xs text-slate-300 font-medium">{signal.detalhesTecnicos.suporteResistencia}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <Zap className="h-3.5 w-3.5 text-emerald-500 mt-0.5" />
            <div>
              <p className="text-[10px] text-emerald-500/70 uppercase font-bold">Vácuo Livre Detectado</p>
              <p className="text-xs text-emerald-400 font-bold">{signal.vacuoLivre}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="space-y-1">
            <p className="text-[10px] text-slate-500 uppercase font-bold">Stop Loss</p>
            <div className="text-rose-400 font-mono font-bold text-sm">
              {signal.detalhesTecnicos.stopLoss}
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] text-slate-500 uppercase font-bold">Alvo Sniper</p>
            <div className="text-emerald-400 font-mono font-bold text-sm">
              {signal.detalhesTecnicos.takeProfit}
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-800">
          <p className="text-[10px] text-indigo-400 font-bold uppercase mb-1">Regra de Ouro:</p>
          <p className="text-[11px] text-slate-400 leading-relaxed italic">
            "{signal.detalhesTecnicos.regraAplicada}"
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TradePlanCard;