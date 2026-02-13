"use client";

import { useState, useEffect } from 'react';

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
  },
  { 
    ativo: "DÓLAR (WDO)", 
    preco: 5.124, 
    sinal: "VENDA", 
    status: "IMINENTE",
    metodo: "GORJETA",
    vacuoLivre: "8 pts até Ajuste",
    validacoes: { tendenciaM15: true, volumeConfirmado: false, gatilhoMicro: false, zonaValor: true },
    detalhesTecnicos: {
      stopLoss: 5.132,
      takeProfit: 5.115,
      payoff: "1:1.5",
      regraAplicada: "Método Gorjeta: Exaustão",
      contextoMacro: "Dólar esticado no H1.",
      suporteResistencia: "Resistência em 5.140"
    }
  }
];

export const useTradingSignals = () => {
  const [signals, setSignals] = useState<TradingSignal[]>(MOCK_DATA);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);

  const fetchSignals = async () => {
    setLoading(true);
    
    // Prioridade 1: Localtunnel (HTTPS - Evita bloqueio do navegador)
    const tunnelUrl = 'https://ten-carrots-find.loca.lt/sinais';
    
    try {
      const response = await fetch(tunnelUrl, {
        headers: { 'Bypass-Tunnel-Reminder': 'true' }
      });
      
      if (response.ok) {
        const data = await response.json();
        setSignals(data);
        setConnected(true);
        setLoading(false);
        return;
      }
    } catch (e) {
      console.log("Localtunnel offline, tentando localhost...");
    }

    // Prioridade 2: Localhost (Pode ser bloqueado pelo navegador se o site for HTTPS)
    try {
      const response = await fetch('http://127.0.0.1:5000/sinais');
      if (response.ok) {
        const data = await response.json();
        setSignals(data);
        setConnected(true);
      } else {
        setConnected(false);
      }
    } catch (err) {
      setConnected(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSignals();
    const interval = setInterval(fetchSignals, 5000);
    return () => clearInterval(interval);
  }, []);

  return { signals, loading, connected, refetch: fetchSignals };
};