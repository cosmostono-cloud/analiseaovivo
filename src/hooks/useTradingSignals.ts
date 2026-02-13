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
    try {
      // Tenta acessar o túnel
      const response = await fetch('https://ten-carrots-find.loca.lt/sinais', {
        method: 'GET',
        headers: {
          'Bypass-Tunnel-Reminder': 'true',
          'Accept': 'application/json'
        },
        mode: 'cors'
      });
      
      if (response.ok) {
        const data = await response.json();
        setSignals(data);
        setConnected(true);
      } else {
        console.warn("Robô respondeu com erro:", response.status);
        setConnected(false);
      }
    } catch (err) {
      console.error("Erro de conexão com o robô:", err);
      setConnected(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSignals();
    const interval = setInterval(fetchSignals, 10000);
    return () => clearInterval(interval);
  }, []);

  return { signals, loading, connected, refetch: fetchSignals };
};