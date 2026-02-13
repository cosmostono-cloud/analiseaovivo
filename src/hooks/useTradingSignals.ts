"use client";

import { useState, useEffect, useCallback } from 'react';
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
      regraAplicada: "Inicie o robô Python para ver os sinais.",
      contextoMacro: "Conexão pendente.",
      suporteResistencia: "---"
    }
  }
];

export const useTradingSignals = () => {
  const [signals, setSignals] = useState<TradingSignal[]>(MOCK_DATA);
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);

  const fetchSignals = useCallback(async (isManual = false) => {
    setLoading(true);
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch('http://127.0.0.1:5000/sinais', {
        method: 'GET',
        mode: 'cors',
        headers: { 'Accept': 'application/json' },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        
        // Só atualiza se houver dados reais
        if (data && Array.isArray(data) && data.length > 0) {
          setSignals(data);
          if (!connected || isManual) {
            toast.success("Dados Sincronizados", { duration: 2000 });
          }
          setConnected(true);
          setLastError(null);
        } else {
          // Se o robô responder OK mas a lista estiver vazia
          setLastError("Robô online, mas sem sinais no momento.");
          setConnected(true); 
        }
      } else {
        setConnected(false);
        setLastError(`Erro ${response.status}`);
      }
    } catch (e: any) {
      setConnected(false);
      setLastError(e.name === 'AbortError' ? "Tempo esgotado" : "Robô Offline");
    } finally {
      setLoading(false);
    }
  }, [connected]);

  useEffect(() => {
    fetchSignals();
    // Atualiza a cada 20 segundos
    const interval = setInterval(() => fetchSignals(false), 20000);
    return () => clearInterval(interval);
  }, [fetchSignals]);

  return { 
    signals, 
    loading, 
    connected, 
    lastError, 
    refetch: () => fetchSignals(true) 
  };
};