"use client";

import React from 'react';
import { MadeWithDyad } from "@/components/made-with-dyad";
import TradingTable from "@/components/TradingTable";
import { useTradingSignals } from "@/hooks/useTradingSignals";
import { RefreshCw, TrendingUp } from "lucide-react";

const Index = () => {
  const { signals, loading, error } = useTradingSignals();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100">
      {/* Header Section */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg shadow-lg shadow-indigo-200">
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
            Atualizando a cada 10s
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-slate-700 mb-2">Monitoramento em Tempo Real</h2>
          <p className="text-slate-500 text-sm">
            Acompanhe os sinais de entrada e saída baseados na estratégia Método Águia.
          </p>
        </div>

        <TradingTable signals={signals} loading={loading} error={error} />
        
        {error && (
          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
            <div className="text-amber-600 mt-0.5">⚠️</div>
            <p className="text-sm text-amber-800">
              <strong>Nota:</strong> Certifique-se de que sua API local está rodando em <code className="bg-amber-100 px-1 rounded">http://127.0.0.1:5000/sinais</code> para visualizar os dados reais.
            </p>
          </div>
        )}
      </main>

      <footer className="mt-auto py-8">
        <MadeWithDyad />
      </footer>
    </div>
  );
};

export default Index;