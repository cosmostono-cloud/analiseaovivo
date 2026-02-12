"use client";

import { useState, useEffect } from 'react';

export interface TradingSignal {
  ativo: string;
  preco: number;
  sinal: string;
}

// Dados de exemplo com os ativos solicitados
const MOCK_DATA: TradingSignal[] = [
  { ativo: "ÍNDICE (WIN)", preco: 128450, sinal: "COMPRA" },
  { ativo: "DÓLAR (WDO)", preco: 5.124, sinal: "VENDA" },
  { ativo: "HK50", preco: 16742.50, sinal: "AGUARDANDO" },
  { ativo: "US500", preco: 5132.25, sinal: "COMPRA" },
  { ativo: "GOLD (XAUUSD)", preco: 2345.60, sinal: "COMPRA" },
  { ativo: "BTC/USDT", preco: 64250.50, sinal: "AGUARDANDO" },
];

export const useTradingSignals = () => {
  const [signals, setSignals] = useState<TradingSignal[]>(MOCK_DATA);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSignals = async () => {
    try {
      // Tentativa de buscar dados reais da API local
      const response = await fetch('http://127.0.0.1:5000/sinais');
      if (response.ok) {
        const data = await response.json();
        setSignals(data);
        setError(null);
      } else {
        console.warn("API local não respondeu. Usando dados de demonstração.");
      }
    } catch (err) {
      console.log("Aguardando API local... Usando dados de demonstração.");
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