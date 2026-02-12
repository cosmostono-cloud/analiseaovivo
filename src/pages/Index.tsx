"use client";

import React from 'react';
import { MadeWithDyad } from "@/components/made-with-dyad";
import TradingTable from "@/components/TradingTable";
import { useTradingSignals } from "@/hooks/useTradingSignals";
import { RefreshCw, TrendingUp, ShieldCheck, Zap } from "lucide-react";

const Index = () => {
  const { signals, loading } = useTradingSignals();

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-indigo-500/30">
      {/* Header Section */}
      <header className="bg-slate-950/80 border-b border-slate-800 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-2.5 rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.4)]">
              <TrendingUp className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-white uppercase italic">
                Scanner <span className="text-indigo-400">Método Águia</span>
              </h1>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Larissa Sihle • Premium Access</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[10px] font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-full uppercase tracking-tighter">
              <Zap className="h-3 w-3 fill-indigo-400" />
              Live Market Data
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin text-indigo-500' : ''}`} />
              <span className="hidden sm:inline">Auto-refresh ativo</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold text-white mb-3">Monitoramento de Alta Precisão</h2>
            <p className="text-slate-400 max-w-2xl text-lg leading-relaxed">
              Análise em tempo real dos principais ativos globais utilizando a metodologia exclusiva de fluxo e tendência.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
              <p className="text-xs text-slate-500 uppercase font-bold mb-1">Sinais Hoje</p>
              <p className="text-2xl font-mono font-bold text-indigo-400">24</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
              <p className="text-xs text-slate-500 uppercase font-bold mb-1">Win Rate</p>
              <p className="text-2xl font-mono font-bold text-emerald-400">82%</p>
            </div>
          </div>
        </div>

        {/* Tabela de Sinais */}
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-violet-500/20 rounded-2xl blur-2xl opacity-20" />
          <TradingTable signals={signals} loading={loading} error={null} />
        </div>
        
        {/* Footer Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl">
            <h3 className="text-sm font-bold text-indigo-400 uppercase mb-2">Estratégia Águia</h3>
            <p className="text-sm text-slate-400">Focada em identificar o rastro dos grandes players institucionais através do volume e price action.</p>
          </div>
          <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl">
            <h3 className="text-sm font-bold text-indigo-400 uppercase mb-2">Gerenciamento</h3>
            <p className="text-sm text-slate-400">Sempre utilize stop loss técnico. O scanner indica a direção, a execução depende do seu plano.</p>
          </div>
          <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl">
            <h3 className="text-sm font-bold text-indigo-400 uppercase mb-2">Suporte</h3>
            <p className="text-sm text-slate-400">Dúvidas sobre os sinais? Consulte o material didático do Método Águia na área de membros.</p>
          </div>
        </div>
      </main>

      <footer className="py-12 border-t border-slate-900 mt-12">
        <MadeWithDyad />
      </footer>
    </div>
  );
};

export default Index;