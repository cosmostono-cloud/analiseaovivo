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
import { RefreshCw, TrendingUp, AlertCircle, ExternalLink, ShieldAlert } from "lucide-react";

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
              <div className="p-5 bg-rose-500/5 border border-rose-500/20 rounded-xl space-y-4">
                <h3 className="text-[10px] font-black text-rose-400 uppercase flex items-center gap-2">
                  <ShieldAlert className="h-3 w-3" /> Bloqueio Detectado
                </h3>
                <div className="space-y-2">
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    O aviso de <span className="text-rose-400 font-bold">"Não Seguro"</span> no navegador é normal. 
                    O problema agora é a permissão no seu código Python.
                  </p>
                  <div className="bg-slate-950 p-2 rounded border border-slate-800 font-mono text-[9px] text-emerald-400">
                    pip install flask-cors
                  </div>
                </div>
                
                <div className="pt-2 border-t border-rose-500/10">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full text-[10px] h-8 border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/10"
                    onClick={() => window.open('http://127.0.0.1:5000/sinais', '_blank')}
                  >
                    <ExternalLink className="h-3 w-3 mr-2" /> Abrir Robô no Navegador
                  </Button>
                  <p className="text-[9px] text-slate-500 mt-2 text-center italic">
                    Se abrir o JSON no link acima, o erro é o CORS no Python.
                  </p>
                </div>
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