"use client";

import { useState, useEffect } from 'react';

export interface TradingSignal {
  ativo: string;
  preco: number;
  sinal: string;
  motivo: string;
  status: 'AGORA' | 'IMINENTE' | 'AGUARDANDO';
  validacoes: {
    tendencia: boolean;
    volume: boolean;
    gatilho: boolean;
  };
}

const MOCK_DATA: TradingSignal[] = [
  { 
    ativo: "ÍNDICE (WIN)", 
    preco: 128450, 
    sinal: "COMPRA", 
    status: "AGORA",
    motivo: "Rastro institucional detectado no M15. Gatilho de exaustão de venda no M2 confirmado.",
    validacoes: { tendencia: true, volume: true, gatilho: true }
  },
  { 
    ativo: "DÓLAR (WDO)", 
    preco: 5.124, 
    sinal: "VENDA", 
    status: "IMINENTE",
    motivo: "Preço em zona de valor do H1. Aguardando entrada de volume vendedor no M3.",
    validacoes: { tendencia: true, volume: false, gatilho: false }
  },
  { 
    ativo: "US500", 
    preco: 5132.25, 
    sinal: "COMPRA", 
    status: "AGORA",
    motivo: "Alinhamento de fractais. Rompimento de micro-pivô com agressão compradora.",
    validacoes: { tendencia: true, volume: true, gatilho: true }
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