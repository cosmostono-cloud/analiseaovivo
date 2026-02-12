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
import { Loader2, Info, Timer, Zap } from 'lucide-react';

interface TradingTableProps {
  signals: TradingSignal[];
  loading: boolean;
}

const TradingTable = ({ signals, loading }: TradingTableProps) => {
  if (loading && signals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-20 space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-500" />
        <p className="text-slate-400 animate-pulse font-medium">Escaneando oportunidades...</p>
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
                <TableHead className="font-bold text-slate-400 py-5">Status</TableHead>
                <TableHead className="font-bold text-slate-400 py-5">Sinal</TableHead>
                <TableHead className="font-bold text-slate-400 py-5">Preço</TableHead>
                <TableHead className="font-bold text-slate-400 py-5 px-6">Análise Técnica</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {signals.map((item, index) => {
                const isOpportunity = item.status === 'AGORA';
                const isImminent = item.status === 'IMINENTE';

                return (
                  <TableRow 
                    key={`${item.ativo}-${index}`} 
                    className={`border-slate-800 transition-all duration-300 group ${isOpportunity ? 'bg-indigo-500/5' : ''}`}
                  >
                    <TableCell className="py-5 px-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-1.5 h-6 rounded-full transition-all duration-500 ${
                          isOpportunity ? 'bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)] scale-y-125' : 
                          isImminent ? 'bg-amber-500' : 'bg-slate-700'
                        }`} />
                        <span className={`font-black tracking-tight transition-all duration-300 ${
                          isOpportunity ? 'text-white text-lg' : 'text-slate-300'
                        }`}>
                          {item.ativo}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-5">
                      {isOpportunity ? (
                        <Badge className="bg-indigo-600 hover:bg-indigo-600 text-white animate-pulse flex items-center gap-1 w-fit">
                          <Zap className="h-3 w-3 fill-white" /> AGORA
                        </Badge>
                      ) : isImminent ? (
                        <Badge variant="outline" className="border-amber-500/50 text-amber-500 flex items-center gap-1 w-fit">
                          <Timer className="h-3 w-3" /> IMINENTE
                        </Badge>
                      ) : (
                        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Aguardando</span>
                      )}
                    </TableCell>
                    <TableCell className="py-5">
                      <SignalBadge sinal={item.sinal} />
                    </TableCell>
                    <TableCell className="font-mono text-slate-300 py-5">
                      {item.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 5 })}
                    </TableCell>
                    <TableCell className="py-5 px-6">
                      <div className="flex items-start gap-2 max-w-md">
                        <Info className={`h-4 w-4 mt-0.5 shrink-0 ${isOpportunity ? 'text-indigo-400' : 'text-slate-500'}`} />
                        <span className={`text-sm leading-relaxed ${isOpportunity ? 'text-slate-200 font-medium' : 'text-slate-400'}`}>
                          {item.motivo}
                        </span>
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