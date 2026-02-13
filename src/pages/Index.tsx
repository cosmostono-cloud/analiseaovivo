"use client";

import React, { useState } from 'react';
import { MadeWithDyad } from "@/components/made-with-dyad";
import TradingTable from "@/components/TradingTable";
import TradePlanCard from "@/components/TradePlanCard";
import { useTradingSignals } from "@/hooks/useTradingSignals";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, TrendingUp, ShieldCheck, Zap, LayoutDashboard, Timer, Target, GraduationCap, Sparkles, Wifi, WifiOff } from "lucide-react";

const Index = () => {
  const { signals, loading, connected, refetch } = useTradingSignals();
  const [trainingMode, setTrainingMode] = useState(true);

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
              <div className="flex items-center gap-3 mt-1">
                <div className="flex items-center gap-1.5">
                  {connected ? (
                    <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-[9px] px-1.5 py-0 h-4">
                      <Wifi className="h-2.5 w-2.5 mr-1" /> ROBÔ ONLINE
                    </Badge>
                  ) : (
                    <Badge className="bg-rose-500/10 text-rose-500 border-rose-500/20 text-[9px] px-1.5 py-0 h-4">
                      <WifiOff className="h-2.5 w-2.5 mr-1" /> ROBÔ OFFLINE
                    </Badge>
                  )}
                </div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Larissa Sihle • Premium</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center space-x-3 bg-slate-900/50 border border-slate-800 px-4 py-2 rounded-full">
              <GraduationCap className={`h-4 w-4 ${trainingMode ? 'text-indigo-400' : 'text-slate-600'}`} />
              <Label htmlFor="training-mode" className="text-[10px] font-black uppercase tracking-widest cursor-pointer">Modo Treino</Label>
              <Switch 
                id="training-mode" 
                checked={trainingMode} 
                onCheckedChange={setTrainingMode}
                className="data-[state=checked]:bg-indigo-600"
              />
            </div>
            
            <Button 
              onClick={() => refetch()} 
              disabled={loading}
              variant="outline"
              className="bg-slate-900 border-slate-700 hover:bg-slate-800 text-white gap-2 rounded-xl h-10 px-5 transition-all active:scale-95"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin text-indigo-500' : ''}`} />
              {loading ? 'Sincronizando...' : 'Sincronizar Robô'}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-10 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest">
              <Sparkles className="h-3 w-3" /> {trainingMode ? 'Modo Deus Ativado' : 'Dashboard de Sinais'}
            </div>
            <h2 className="text-4xl font-black text-white leading-tight">
              Monitoramento <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">Multi-Ativos Sniper</span>
            </h2>
            <p className="text-slate-400 max-w-xl text-lg leading-relaxed">
              {connected 
                ? "Conectado ao robô de análise institucional. Dados em tempo real."
                : "Robô não detectado em 127.0.0.1:5000. Exibindo dados de simulação para treino."}
            </p>
          </div>
          
          <div className="flex gap-4">
            <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl min-w-[140px] backdrop-blur-sm">
              <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-2">Ativos</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-mono font-bold text-white">{signals.length}</p>
                <span className="text-xs text-indigo-400 font-bold">Monitorados</span>
              </div>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl min-w-[140px] backdrop-blur-sm">
              <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-2">Status Robô</p>
              <div className="flex items-baseline gap-2">
                <p className={`text-sm font-bold ${connected ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {connected ? 'CONECTADO' : 'OFFLINE'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/30 to-violet-500/30 rounded-2xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
            <TradingTable signals={signals} loading={loading} />
          </div>

          <div className="space-y-6">
            {trainingMode && signals.filter(s => s.status === 'AGORA').slice(0, 2).map((signal, idx) => (
              <TradePlanCard key={idx} signal={signal} />
            ))}
            
            <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl">
              <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <GraduationCap className="h-3 w-3" /> Dica da Larissa
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                "Se o robô estiver offline, certifique-se de que o script Python está rodando na porta 5000. O Scanner precisa desse rastro para validar o vácuo livre."
              </p>
            </div>
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