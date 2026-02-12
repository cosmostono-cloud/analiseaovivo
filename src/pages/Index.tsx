"use client";

import React from 'react';
import { MadeWithDyad } from "@/components/made-with-dyad";
import TradingTable from "@/components/TradingTable";
import { useTradingSignals } from "@/hooks/useTradingSignals";
import { RefreshCw, TrendingUp, AlertCircle } from "lucide-react";

const Index = () => {
  const { signals, loading, error } = useTradingSignals();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Header Section */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg shadow-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
                Scanner Método Águia
              </h1>
              <p className="text-sm font-medium text-indigo-600">Larissa Sihle</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
            <RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
            Atualizando em tempo real
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-slate-700 mb-2">Monitoramento de Ativos</h2>
          <p className="text-slate-500 text-sm">
            Sinais de entrada e saída baseados na estratégia Método Águia.
          </p>
        </div>

        {/* Tabela de Sinais */}
        <div className="min-h-[300px]">
          <TradingTable signals={signals} loading={loading} error={error} />
        </div>
        
        {/* Aviso de API Local */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
          <div className="text-sm text-blue-800">
            <p className="font-bold mb-1">Modo de Demonstração Ativo</p>
            <p>Para ver seus sinais reais, certifique-se de que seu servidor Python/Flask está rodando em: <code className="bg-blue-100 px-1 rounded font-mono">http://127.0.0.1:5000/sinais</code></p>
          </div>
        </div>
      </main>

      <footer className="py-8">
        <MadeWithDyad />
      </footer>
    </div>
  );
};

export default Index;