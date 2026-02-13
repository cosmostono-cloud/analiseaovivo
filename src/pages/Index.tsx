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
import { RefreshCw, TrendingUp, GraduationCap, Sparkles, Wifi, WifiOff, AlertCircle } from "lucide-react";

const Index = () => {
  const { signals = [], loading, connected, lastError, attemptCount, refetch } = useTradingSignals();
  const [trainingMode, setTrainingMode] = useState(true);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans">
      <header className="bg-slate-950/80 border-b border-slate-800 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-indigo-600 p-2 rounded-xl">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black text-white uppercase italic">
                Scanner <span className="text-indigo-400">Método Águia</span>
              </h1>
              <div className="flex items-center gap-2">
                {connected ? (
                  <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-[9px]">ONLINE</Badge>
                ) : (
                  <Badge className="bg-rose-500/10 text-rose-500 border-rose-500/20 text-[9px]">OFFLINE</Badge>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800">
              <Label htmlFor="training-mode" className="text-[10px] font-bold uppercase">Treino</Label>
              <Switch id="training-mode" checked={trainingMode} onCheckedChange={setTrainingMode} />
            </div>
            <Button onClick={() => refetch()} disabled={loading} size="sm" className="bg-indigo-600 hover:bg-indigo-700">
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Sincronizar
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <TradingTable signals={signals} loading={loading} />
          </div>

          <div className="space-y-6">
            {!connected && (
              <div className="p-4 bg-rose-500/5 border border-rose-500/20 rounded-xl">
                <h3 className="text-[10px] font-black text-rose-400 uppercase mb-2 flex items-center gap-2">
                  <AlertCircle className="h-3 w-3" /> Status da Conexão
                </h3>
                <p className="text-[10px] text-slate-400">Tentativas: {attemptCount}</p>
                <p className="text-[10px] text-rose-400 font-bold mt-1">Erro: {lastError || "Aguardando..."}</p>
              </div>
            )}

            {trainingMode && signals.filter(s => s.status === 'AGORA').map((signal, idx) => (
              <TradePlanCard key={idx} signal={signal} />
            ))}
          </div>
        </div>
      </main>
      <MadeWithDyad />
    </div>
  );
};

export default Index;