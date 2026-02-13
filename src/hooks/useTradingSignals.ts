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
      regraAplicada: "Aguardando permissão do navegador para ler o robô local.",
      contextoMacro: "Verifique o cadeado na barra de endereços.",
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
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      // Tentamos primeiro o IP padrão do Flask
      const response = await fetch('http://127.0.0.1:5000/sinais', {
        mode: 'cors',
        headers: { 'Accept': 'application/json' },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        setSignals(data);
        if (!connected) {
          toast.success("Scanner Conectado com Sucesso!", {
            description: "Rastro institucional sendo mapeado em tempo real.",
            duration: 5000,
          });
        }
        setConnected(true);
        setLastError(null);
      } else {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
    } catch (e: any) {
      setConnected(false);
      setLastError(e.name === 'AbortError' ? "Timeout (Robô lento)" : "Bloqueio de Segurança ou Robô Offline");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSignals();
    const interval = setInterval(fetchSignals, 3000); // Atualiza a cada 3 segundos
    return () => clearInterval(interval);
  }, []);

  return { signals, loading, connected, lastError, attemptCount, refetch: fetchSignals };
};