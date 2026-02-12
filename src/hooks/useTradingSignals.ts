"use client";

import { useState, useEffect } from 'react';

export interface TradingSignal {
  ativo: string;
  preco: number;
  sinal: string;
  motivo: string;
  status: 'AGORA' | 'IMINENTE' | 'AGUARDANDO';
}

const MOCK_DATA: TradingSignal[] = [
  { 
    ativo: "ÍNDICE (WIN)", 
    preco: 128450, 
    sinal: "COMPRA", 
    status: "AGORA",
    motivo: "Contexto M15 de alta. Gatilho de entrada confirmado no M2 após teste de Vwap." 
  },
  { 
    ativo: "DÓLAR (WDO)", 
    preco: 5.124, 
    sinal: "VENDA", 
    status: "IMINENTE",
    motivo: "Resistência no H1. Aguardando exaustão de fluxo no M3 para entrada curta." 
  },
  { 
    ativo: "HK50", 
    preco: 16742.50, 
    sinal: "AGUARDANDO", 
    status: "AGUARDANDO",
    motivo: "Aguardando alinhamento do M15 com o M3. Mercado sem direção clara no momento." 
  },
  { 
    ativo: "US500", 
    preco: 5132.25, 
    sinal: "COMPRA", 
    status: "AGORA",
    motivo: "Tendência macro de alta. Micro-pivô rompido no M2 com volume institucional." 
  },
  { 
    ativo: "GOLD (XAUUSD)", 
    preco: 2345.60, 
    sinal: "COMPRA", 
    status: "IMINENTE",
    motivo: "Zona de valor no M30. Monitorando gatilho de reversão no M3 para reduzir stop." 
  },
];

export const useTradingSignals = () => {
  const [signals, setSignals] = useState<TradingSignal[]>(MOCK_DATA);
  const [loading, setLoading] = useState(true);

  const fetchSignals = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:5000/sinais');
      if (response.ok) {
        const data = await response.json();
        setSignals(data);
      }
    } catch (err) {
      // Mantém mocks se a API não estiver rodando
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSignals();
    const interval = setInterval(fetchSignals, 30000);
    return () => clearInterval(interval);
  }, []);

  return { signals, loading, refetch: fetchSignals };
};