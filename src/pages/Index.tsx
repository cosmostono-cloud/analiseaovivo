"use client";

import React from 'react';
import { MadeWithDyad } from "@/components/made-with-dyad";
import TradingTable from "@/components/TradingTable";
import { useTradingSignals } from "@/hooks/useTradingSignals";
import { Button } from "@/components/ui/button";
import { RefreshCw, TrendingUp, ShieldCheck, Zap, LayoutDashboard, Timer, Target } from "lucide-react";

const Index = () => {
  const { signals, loading, refetch } = useTradingSignals();

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-indigo-500/30">
      {/* Header Section */}
      <header className="bg-slate-950/80 border-b border-slate-800 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-2.5 rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.4)]">
              <TrendingUp className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-white uppercase italic leading-none">
                Scanner <span className="text-indigo-400">Método Águia</span>
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Larissa Sihle • Premium Access</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 text-[10px] font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-full uppercase tracking-tighter">
              <Zap className="h-3 w-3 fill-indigo-400 animate-pulse" />
              Multi-Timeframe Analysis
            </div>
            
            <Button 
              onClick={() => refetch()} 
              disabled={loading}
              variant="outline"
              className="bg-slate-900 border-slate-700 hover:bg-slate-800 text-white gap-2 rounded-xl h-10 px-5 transition-all active:scale-95"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin text-indigo-500' : ''}`} />
              {loading ? 'Atualizando...' : 'Atualizar Agora'}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-10 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest">
              <LayoutDashboard className="h-3 w-3" /> Dashboard de Sinais
            </div>
            <h2 className="text-4xl font-black text-white leading-tight">
              Entradas Sniper <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">M2 & M3 Confirmadas</span>
            </h2>
            <p className="text-slate-400 max-w-xl text-lg leading-relaxed">
              Análise de contexto em tempos maiores com gatilhos de precisão em micro-timeframes para otimização de risco.
            </p>
          </div>
          
          <div className="flex gap-4">
            <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl min-w-[140px] backdrop-blur-sm">
              <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-2">Oportunidades</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-mono font-bold text-white">03</p>
                <span className="text-xs text-emerald-500 font-bold">Ativas</span>
              </div>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl min-w-[140px] backdrop-blur-sm">
              <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-2">Assertividade</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-mono font-bold text-white">82</p>
                <span className="text-xs text-indigo-400 font-bold">%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabela de Sinais */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/30 to-violet-500/30 rounded-2xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
          <TradingTable signals={signals} loading={loading} />
        </div>
        
        {/* Footer Info */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-slate-900/40 border border-slate-800/50 rounded-3xl hover:border-indigo-500/30 transition-colors">
            <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-4">
              <Target className="h-5 w-5 text-indigo-400" />
            </div>
            <h3 className="text-sm font-black text-white uppercase tracking-widest mb-3">Gatilho Sniper</h3>
            <p className="text-sm text-slate-400 leading-relaxed">As entradas são refinadas nos tempos de 2 e 3 minutos. Isso permite um Stop Loss mais curto e um alvo muito mais longo.</p>
          </div>
          <div className="p-8 bg-slate-900/40 border border-slate-800/50 rounded-3xl hover:border-indigo-500/30 transition-colors">
            <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
            </div>
            <h3 className="text-sm font-black text-white uppercase tracking-widest mb-3">Contexto Macro</h3>
            <p className="text-sm text-slate-400 leading-relaxed">O scanner valida a tendência no M15 e H1 antes de buscar o gatilho no micro. Nunca opere contra a tendência principal.</p>
          </div>
          <div className="p-8 bg-slate-900/40 border border-slate-800/50 rounded-3xl hover:border-indigo-500/30 transition-colors">
            <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center mb-4">
              <Timer className="h-5 w-5 text-amber-400" />
            </div>
            <h3 className="text-sm font-black text-white uppercase tracking-widest mb-3">Filtro de Volatilidade</h3>
            <p className="text-sm text-slate-400 leading-relaxed">Em tempos curtos (M2/M3), o volume é crucial. O sinal "AGORA" só aparece quando há agressão institucional confirmada.</p>
          </div>
        </div>
      </main>

      <footer className="py-12 border-t border-slate-900/50 mt-12">
        <MadeWithDyad />
      </footer>
    </div>
  );
};

export default Index;