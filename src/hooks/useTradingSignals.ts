"use client";

import { useState, useEffect } from 'react';

export interface TradingSignal {
  ativo: string;
  preco: number;
  sinal: string;
  motivo: string;
}

const MOCK_DATA: TradingSignal[] = [
  { 
    ativo: "ÍNDICE (WIN)", 
    preco: 128450, 
    sinal: "COMPRA", 
    motivo: "Tendência de alta confirmada pelo volume e cruzamento de médias no M5." 
  },
  { 
    ativo: "DÓLAR (WDO)", 
    preco: 5.124, 
    sinal: "VENDA", 
    motivo: "Exaustão de compra em região de resistência histórica com fluxo vendedor." 
  },
  { 
    ativo: "HK50", 
    preco: 16742.50, 
    sinal: "AGUARDANDO", 
    motivo: "Ativo em zona de lateralização. Aguardando rompimento do suporte em 16700." 
  },
  { 
    ativo: "US500", 
    preco: 5132.25, 
    sinal: "COMPRA", 
    motivo: "Rompimento de pivô de alta com alvo na projeção de 161.8% de Fibonacci." 
  },
  { 
    ativo: "GOLD (XAUUSD)", 
    preco: 2345.60, 
    sinal: "COMPRA", 
    motivo: "Setup Águia ativado: Rejeição de fundo com aumento de volatilidade." 
  },
  { 
    ativo: "BTC/USDT", 
    preco: 64250.50, 
    sinal: "AGUARDANDO", 
    motivo: "Aguardando fechamento do candle diário para confirmação de tendência." 
  },
];

export const useTradingSignals = () => {
  const [signals, setSignals] = useState<TradingSignal[]>(MOCK_DATA);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSignals = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/sinais');
      if (response.ok) {
        const data = await response.json();
        setSignals(data);
        setError(null);
      }
    } catch (err) {
      // Mantém os mocks se a API falhar
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSignals();
    const interval = setInterval(fetchSignals, 10000);
    return () => clearInterval(interval);
  }, []);

  return { signals, loading, error, refetch: fetchSignals };
};