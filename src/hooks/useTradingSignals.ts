"use client";

import { useState, useEffect } from 'react';

export interface TradingSignal {
  ativo: string;
  preco: number;
  sinal: string;
}

export const useTradingSignals = () => {
  const [signals, setSignals] = useState<TradingSignal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSignals = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/sinais');
      if (!response.ok) {
        throw new Error('Falha ao buscar dados da API');
      }
      const data = await response.json();
      setSignals(data);
      setError(null);
    } catch (err) {
      setError('Erro ao conectar com a API. Verifique se o servidor local está rodando.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSignals();
    const interval = setInterval(fetchSignals, 10000); // 10 segundos

    return () => clearInterval(interval);
  }, []);

  return { signals, loading, error, refetch: fetchSignals };
};