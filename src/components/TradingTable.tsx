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
import { Loader2 } from 'lucide-react';

interface TradingTableProps {
  signals: TradingSignal[];
  loading: boolean;
  error: string | null;
}

const TradingTable = ({ signals, loading, error }: TradingTableProps) => {
  if (loading && signals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Carregando sinais...</p>
      </div>
    );
  }

  if (error && signals.length === 0) {
    return (
      <div className="p-8 text-center bg-destructive/10 rounded-lg border border-destructive/20">
        <p className="text-destructive font-medium">{error}</p>
      </div>
    );
  }

  return (
    <Card className="overflow-hidden border-none shadow-xl bg-white/50 backdrop-blur-sm">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="font-bold text-slate-700 py-4">Ativo</TableHead>
                <TableHead className="font-bold text-slate-700 py-4">Preço</TableHead>
                <TableHead className="font-bold text-slate-700 py-4 text-right">Sinal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {signals.map((item, index) => (
                <TableRow key={`${item.ativo}-${index}`} className="hover:bg-slate-50/50 transition-colors">
                  <TableCell className="font-semibold text-slate-900 py-4">{item.ativo}</TableCell>
                  <TableCell className="font-mono text-slate-600 py-4">
                    {item.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 5 })}
                  </TableCell>
                  <TableCell className="text-right py-4">
                    <SignalBadge sinal={item.sinal} />
                  </TableCell>
                </TableRow>
              ))}
              {signals.length === 0 && !loading && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                    Nenhum sinal encontrado no momento.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default TradingTable;