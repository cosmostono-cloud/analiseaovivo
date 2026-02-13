"use client";

import { useState, useEffect } from 'react';
import { toast } from "sonner";

export interface TradingSignal {
  ativo: string;
  preco: number;
  sinal: string;
  status: 'AGORA' | 'IMINENTE' | 'AGUARDANDO';
  metodo: 'GORJETA' | 'TENDÊNCIA' | 'REVERSÃO';
  vacuoLivre: string;
  validacoes: {
    tendenciaM15: boolean;
    volumeConfirmado: boolean;
    gatilhoMicro: boolean;
    zonaValor: boolean;
  };
  detalhesTecnicos: {
    stopLoss: number;
    takeProfit: number;
    payoff: string;
    regraAplicada: string;
    contextoMacro: string;
    suporteResistencia: string;
  };
}

const MOCK_DATA: TradingSignal[] = [
  { 
    ativo: "CONECTANDO...", 
    preco: 0, 
    sinal: "AGUARDANDO", 
    status: "AGUARDANDO",
    metodo: "TENDÊNCIA",
    vacuoLivre: "---",
    validacoes: { tendenciaM15: false, volumeConfirmado: false, gatilhoMicro: false, zonaValor: false },
    detalhesTecnicos: {
      stopLoss: 0,
      takeProfit: 0,
      payoff: "1:1",
      regraAplicada: "Verificando conexão com o robô local...",
      contextoMacro: "Aguardando resposta do servidor Flask.",
      suporteResistencia: "---"
    }
  }
];

export const useTradingSignals = () => {
  const [signals, setSignals] = useState<TradingSignal[]>(MOCK_DATA);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);
  const [attemptCount, setAttemptCount] = useState(0);

  const fetchSignals = async () => {
    setLoading(true);
    setAttemptCount(prev => prev + 1);
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      const response = await fetch('http://127.0.0.1:5000/sinais', {
        method: 'GET',
        mode: 'cors',
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        setSignals(data);
        if (!connected) {
          toast.success("Scanner Conectado!", {
            description: "Sinais sincronizados com sucesso.",
            duration: 3000,
          });
        }
        setConnected(true);
        setLastError(null);
      } else {
        setLastError(`Erro do Servidor (${response.status})`);
        setConnected(false);
      }
    } catch (e: any) {
      setConnected(false);
      if (e.name === 'AbortError') {
        setLastError("Tempo esgotado (Robô lento)");
      } else if (e.message.includes('Failed to fetch')) {
        setLastError("Bloqueio de CORS ou Navegador. Verifique o Python.");
      } else {
        setLastError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSignals();
    const interval = setInterval(fetchSignals, 4000);
    return () => clearInterval(interval);
  }, []);

  return { signals, loading, connected, lastError, attemptCount, refetch: fetchSignals };
};