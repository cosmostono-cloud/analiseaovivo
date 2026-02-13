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
    ativo: "AGUARDANDO ROBÔ...", 
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
      regraAplicada: "Verifique se o script Python está rodando na porta 5000.",
      contextoMacro: "Tentando conexão local...",
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
    
    const urls = [
      'http://127.0.0.1:5000/sinais',
      'http://localhost:5000/sinais'
    ];

    let success = false;
    let errorMsg = "";

    for (const url of urls) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);

        const response = await fetch(url, {
          mode: 'cors',
          headers: { 'Accept': 'application/json' },
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          setSignals(data);
          if (!connected) toast.success("Robô Conectado!");
          setConnected(true);
          setLastError(null);
          success = true;
          break;
        } else {
          errorMsg = `Erro HTTP: ${response.status}`;
        }
      } catch (e: any) {
        errorMsg = e.name === 'AbortError' ? "Timeout (Robô lento)" : e.message;
      }
    }

    if (!success) {
      setConnected(false);
      setLastError(errorMsg);
    }
    
    setLoading(false);
  };

  useEffect(() => {
    fetchSignals();
    const interval = setInterval(fetchSignals, 4000);
    return () => clearInterval(interval);
  }, []);

  return { signals, loading, connected, lastError, attemptCount, refetch: fetchSignals };
};