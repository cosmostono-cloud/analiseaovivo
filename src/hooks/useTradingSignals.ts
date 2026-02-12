"use client";

import { useState, useEffect } from 'react';

export interface TradingSignal {
  ativo: string;
  preco: number;
  sinal: string;
}

// Dados de exemplo para visualização imediata
const MOCK_DATA: TradingSignal[] = [
  { ativo: "BTC/USDT", preco: 64250.50, sinal: "COMPRA" },
  { ativo: "ETH/USDT", preco: 3450.20, sinal: "VENDA" },
  { ativo: "SOL/USDT", preco: 145.80, sinal: "AGUARDANDO" },
  { ativo: "EUR/USD", preco: 1.0854, sinal: "COMPRA" },
];

export const useTradingSignals = () => {
  const [signals, setSignals] = useState<TradingSignal[]>(MOCK_DATA);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSignals = async () => {
    try {
      // Tentativa de buscar dados reais
      const response = await fetch('http://127.0.0.1:5000/sinais');
      if (response.ok) {
        const data = await response.json();
        setSignals(data);
        setError(null);
      } else {
        // Se a API falhar, mantemos os mocks mas avisamos no console
        console.warn("API local não respondeu. Usando dados de demonstração.");
      }
    } catch (err) {
      // Silenciamos o erro para não travar a tela, mantendo os mocks
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