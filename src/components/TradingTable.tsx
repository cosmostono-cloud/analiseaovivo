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
import SignalBadge from './SignalBadge';
import { TradingSignal } from '@/hooks/useTradingSignals';
import { Loader2, Info } from 'lucide-react';

interface TradingTableProps {
  signals: TradingSignal[];
  loading: boolean;
  error: string | null;
}

const TradingTable = ({ signals, loading, error }: TradingTableProps) => {
  if (loading && signals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-20 space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-500" />
        <p className="text-slate-400 animate-pulse">Sincronizando com o mercado...</p>
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
                <TableHead className="font-bold text-slate-400 py-5">Preço</TableHead>
                <TableHead className="font-bold text-slate-400 py-5">Sinal</TableHead>
                <TableHead className="font-bold text-slate-400 py-5 px-6">Análise Técnica (Motivo)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {signals.map((item, index) => (
                <TableRow key={`${item.ativo}-${index}`} className="border-slate-800 hover:bg-slate-800/30 transition-all duration-200 group">
                  <TableCell className="font-bold text-white py-5 px-6">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-4 bg-indigo-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item.ativo}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-slate-300 py-5">
                    {item.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 5 })}
                  </TableCell>
                  <TableCell className="py-5">
                    <SignalBadge sinal={item.sinal} />
                  </TableCell>
                  <TableCell className="py-5 px-6">
                    <div className="flex items-start gap-2 max-w-md">
                      <Info className="h-4 w-4 text-indigo-400 mt-0.5 shrink-0 opacity-60" />
                      <span className="text-sm text-slate-400 leading-relaxed">
                        {item.motivo}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default TradingTable;