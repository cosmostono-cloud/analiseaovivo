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
    console.log("Iniciando busca de sinais em http://127.0.0.1:5000/sinais...");
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      const response = await fetch('http://127.0.0.1:5000/sinais', {
        method: 'GET',
        mode: 'cors',
        headers: { 'Accept': 'application/json' },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        console.log("Dados recebidos do Robô:", data);
        
        if (data && Array.isArray(data) && data.length > 0) {
          setSignals(data);
          if (!connected || isManual) {
            toast.success("Scanner Sincronizado!");
          }
          setConnected(true);
          setLastError(null);
        } else {
          console.warn("Robô respondeu, mas a lista de sinais está vazia.");
          setConnected(true);
          // Se estiver conectado mas sem dados, limpamos o "Aguardando"
          if (data && Array.isArray(data)) setSignals([]); 
        }
      } else {
        console.error("Erro na resposta do servidor:", response.status);
        setConnected(false);
      }
    } catch (e: any) {
      console.error("Falha crítica na conexão:", e.message);
      if (e.name === 'AbortError') {
        console.error("O robô demorou demais para responder (Timeout).");
      }
      setConnected(false);
      setLastError(e.message);
    } finally {
      setLoading(false);
    }
  }, [connected]);

  useEffect(() => {
    fetchSignals();
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