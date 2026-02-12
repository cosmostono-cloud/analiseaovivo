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
    motivo: "Setup Águia confirmado: Rompimento de máxima anterior com volume institucional acima da média." 
  },
  { 
    ativo: "DÓLAR (WDO)", 
    preco: 5.124, 
    sinal: "VENDA", 
    status: "IMINENTE",
    motivo: "Aproximação de zona de exaustão (R1). Aguardando gatilho de reversão no fluxo." 
  },
  { 
    ativo: "HK50", 
    preco: 16742.50, 
    sinal: "AGUARDANDO", 
    status: "AGUARDANDO",
    motivo: "Mercado lateral. Sem direção clara segundo a técnica de canais da Larissa." 
  },
  { 
    ativo: "US500", 
    preco: 5132.25, 
    sinal: "COMPRA", 
    status: "AGORA",
    motivo: "Pullback na média de 20 períodos com rejeição de fundo. Entrada confirmada." 
  },
  { 
    ativo: "GOLD (XAUUSD)", 
    preco: 2345.60, 
    sinal: "COMPRA", 
    status: "IMINENTE",
    motivo: "Formação de pivô de alta no M15. Aguardando fechamento acima da resistência." 
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
      // Mantém mocks
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