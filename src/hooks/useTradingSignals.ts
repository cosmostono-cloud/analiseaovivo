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
  detalhesTecnicos: {
    stopLoss: number;
    takeProfit: number;
    payoff: string;
    regraAplicada: string;
    contextoMacro: string;
  };
}

const MOCK_DATA: TradingSignal[] = [
  { 
    ativo: "ÍNDICE (WIN)", 
    preco: 128450, 
    sinal: "COMPRA", 
    status: "AGORA",
    motivo: "Rastro institucional detectado no M15. Gatilho de exaustão de venda no M2 confirmado.",
    validacoes: { tendencia: true, volume: true, gatilho: true },
    detalhesTecnicos: {
      stopLoss: 128320,
      takeProfit: 128850,
      payoff: "1:3.3",
      regraAplicada: "Módulo 03: Exaustão de Venda + Vwap",
      contextoMacro: "H1 em tendência de alta, preço acima da média de 200."
    }
  },
  { 
    ativo: "DÓLAR (WDO)", 
    preco: 5.124, 
    sinal: "VENDA", 
    status: "IMINENTE",
    motivo: "Preço em zona de valor do H1. Aguardando entrada de volume vendedor no M3.",
    validacoes: { tendencia: true, volume: false, gatilho: false },
    detalhesTecnicos: {
      stopLoss: 5.135,
      takeProfit: 5.090,
      payoff: "1:3.0",
      regraAplicada: "Módulo 04: Rejeição de Topo H1",
      contextoMacro: "Dólar testando máxima semanal com divergência de volume."
    }
  },
  { 
    ativo: "US500", 
    preco: 5132.25, 
    sinal: "COMPRA", 
    status: "AGORA",
    motivo: "Alinhamento de fractais. Rompimento de micro-pivô com agressão compradora.",
    validacoes: { tendencia: true, volume: true, gatilho: true },
    detalhesTecnicos: {
      stopLoss: 5125.00,
      takeProfit: 5155.00,
      payoff: "1:3.1",
      regraAplicada: "Módulo 02: Alinhamento de Fractais",
      contextoMacro: "S&P500 em forte rali institucional após abertura de NY."
    }
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