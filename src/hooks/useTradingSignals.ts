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
    ativo: "ÍNDICE (WIN)", 
    preco: 128450, 
    sinal: "COMPRA", 
    status: "AGORA",
    metodo: "TENDÊNCIA",
    vacuoLivre: "450 pts até VWAP",
    validacoes: { tendenciaM15: true, volumeConfirmado: true, gatilhoMicro: true, zonaValor: true },
    detalhesTecnicos: {
      stopLoss: 128320,
      takeProfit: 128900,
      payoff: "1:3.5",
      regraAplicada: "Módulo 03: Rastro Institucional",
      contextoMacro: "Tendência de alta no M15.",
      suporteResistencia: "Suporte em 128.200"
    }
  }
];

export const useTradingSignals = () => {
  const [signals, setSignals] = useState<TradingSignal[]>(MOCK_DATA);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);

  const fetchSignals = async () => {
    setLoading(true);
    
    // Tenta primeiro o túnel seguro
    try {
      const response = await fetch('https://ten-carrots-find.loca.lt/sinais', {
        headers: { 'Bypass-Tunnel-Reminder': 'true' }
      });
      
      if (response.ok) {
        const data = await response.json();
        setSignals(data);
        if (!connected) toast.success("Conectado ao Robô via Túnel!");
        setConnected(true);
        setLoading(false);
        return;
      }
    } catch (e) {
      // Falhou túnel, tenta localhost
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/sinais');
      if (response.ok) {
        const data = await response.json();
        setSignals(data);
        if (!connected) toast.success("Conectado ao Robô Local!");
        setConnected(true);
      } else {
        setConnected(false);
      }
    } catch (err) {
      if (connected) toast.error("Conexão com o robô perdida.");
      setConnected(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSignals();
    const interval = setInterval(fetchSignals, 5000);
    return () => clearInterval(interval);
  }, [connected]);

  return { signals, loading, connected, refetch: fetchSignals };
};