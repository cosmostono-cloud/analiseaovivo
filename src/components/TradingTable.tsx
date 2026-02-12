"use client";

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SignalBadge from './SignalBadge';
import { TradingSignal } from '@/hooks/useTradingSignals';
import { Loader2, Info, Timer, Zap, CheckCircle2, Circle, ArrowRightCircle } from 'lucide-react';

interface TradingTableProps {
  signals: TradingSignal[];
  loading: boolean;
}

const TradingTable = ({ signals, loading }: TradingTableProps) => {
  if (loading && signals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-20 space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-500" />
        <p className="text-slate-400 animate-pulse font-medium">Escaneando rastro institucional...</p>
      </div>
    );
  }

  return (
    <Card className="overflow-hidden border border-slate-800 bg-slate-900/50 backdrop-blur-xl shadow-2xl">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-950/50">
              <TableRow className="border-slate-800 hover:bg-transparent">
                <TableHead className="font-bold text-slate-400 py-5 px-6">Ativo</TableHead>
                <TableHead className="font-bold text-slate-400 py-5">Estratégia</TableHead>
                <TableHead className="font-bold text-slate-400 py-5">Sinal</TableHead>
                <TableHead className="font-bold text-slate-400 py-5">Vácuo Livre</TableHead>
                <TableHead className="font-bold text-slate-400 py-5">Checklist Larissa</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {signals.map((item, index) => {
                const isOpportunity = item.status === 'AGORA';
                
                return (
                  <TableRow 
                    key={`${item.ativo}-${index}`} 
                    className={`border-slate-800 transition-all duration-300 group ${isOpportunity ? 'bg-indigo-500/5' : ''}`}
                  >
                    <TableCell className="py-5 px-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-1.5 h-6 rounded-full transition-all duration-500 ${
                          isOpportunity ? 'bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)] scale-y-125' : 'bg-slate-700'
                        }`} />
                        <span className={`font-black tracking-tight transition-all duration-300 ${
                          isOpportunity ? 'text-white text-lg' : 'text-slate-300'
                        }`}>
                          {item.ativo}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-5">
                      <Badge variant="outline" className={`${
                        item.metodo === 'GORJETA' ? 'border-amber-500/50 text-amber-400' : 'border-indigo-500/50 text-indigo-400'
                      } font-bold text-[10px]`}>
                        {item.metodo}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-5">
                      <SignalBadge sinal={item.sinal} />
                    </TableCell>
                    <TableCell className="py-5">
                      <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
                        <ArrowRightCircle className="h-3 w-3" />
                        {item.vacuoLivre}
                      </div>
                    </TableCell>
                    <TableCell className="py-5">
                      <div className="flex gap-3">
                        <div className="flex flex-col items-center gap-1">
                          {item.validacoes.tendenciaM15 ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <Circle className="h-4 w-4 text-slate-700" />}
                          <span className="text-[8px] font-bold text-slate-500 uppercase">M15</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          {item.validacoes.zonaValor ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <Circle className="h-4 w-4 text-slate-700" />}
                          <span className="text-[8px] font-bold text-slate-500 uppercase">Zona</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          {item.validacoes.volumeConfirmado ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <Circle className="h-4 w-4 text-slate-700" />}
                          <span className="text-[8px] font-bold text-slate-500 uppercase">Vol</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          {item.validacoes.gatilhoMicro ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <Circle className="h-4 w-4 text-slate-700" />}
                          <span className="text-[8px] font-bold text-slate-500 uppercase">M2/3</span>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default TradingTable;