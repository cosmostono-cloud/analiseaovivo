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
  },
  { 
    ativo: "US500", 
    preco: 5132.25, 
    sinal: "COMPRA", 
    status: "AGORA",
    metodo: "TENDÊNCIA",
    vacuoLivre: "15 pts (Céu Limpo)",
    validacoes: { tendenciaM15: true, volumeConfirmado: true, gatilhoMicro: true, zonaValor: true },
    detalhesTecnicos: {
      stopLoss: 5126.00,
      takeProfit: 5150.00,
      payoff: "1:3.0",
      regraAplicada: "Módulo 02: Alinhamento M15+M2",
      contextoMacro: "Rompimento com volume.",
      suporteResistencia: "Suporte em 5120.00"
    }
  },
  { 
    ativo: "HK50", 
    preco: 16742, 
    sinal: "AGUARDANDO", 
    status: "AGUARDANDO",
    metodo: "REVERSÃO",
    vacuoLivre: "200 pts até Topo",
    validacoes: { tendenciaM15: false, volumeConfirmado: false, gatilhoMicro: false, zonaValor: true },
    detalhesTecnicos: {
      stopLoss: 16850,
      takeProfit: 16400,
      payoff: "1:3.5",
      regraAplicada: "Módulo 05: Liquidez",
      contextoMacro: "Consolidação lateral.",
      suporteResistencia: "Resistência em 16.800"
    }
  },
  { 
    ativo: "GOLD (XAUUSD)", 
    preco: 2345.6, 
    sinal: "COMPRA", 
    status: "IMINENTE",
    metodo: "TENDÊNCIA",
    vacuoLivre: "30 pts até Resistência",
    validacoes: { tendenciaM15: true, volumeConfirmado: true, gatilhoMicro: false, zonaValor: true },
    detalhesTecnicos: {
      stopLoss: 2338.0,
      takeProfit: 2375.0,
      payoff: "1:4.2",
      regraAplicada: "Módulo 03: Reversão",
      contextoMacro: "Alta forte no diário.",
      suporteResistencia: "Suporte em 2340.0"
    }
  },
  { 
    ativo: "NAS100", 
    preco: 18245, 
    sinal: "VENDA", 
    status: "AGORA",
    metodo: "TENDÊNCIA",
    vacuoLivre: "120 pts até Média 200",
    validacoes: { tendenciaM15: true, volumeConfirmado: true, gatilhoMicro: true, zonaValor: true },
    detalhesTecnicos: {
      stopLoss: 18275,
      takeProfit: 18120,
      payoff: "1:4.1",
      regraAplicada: "Módulo 04: Topo Duplo",
      contextoMacro: "Nasdaq esticada.",
      suporteResistencia: "Resistência em 18.260"
    }
  },
  { 
    ativo: "EURUSD", 
    preco: 1.0845, 
    sinal: "AGUARDANDO", 
    status: "AGUARDANDO",
    metodo: "TENDÊNCIA",
    vacuoLivre: "60 pips",
    validacoes: { tendenciaM15: true, volumeConfirmado: false, gatilhoMicro: false, zonaValor: false },
    detalhesTecnicos: {
      stopLoss: 1.0820,
      takeProfit: 1.0910,
      payoff: "1:2.6",
      regraAplicada: "Módulo 01: Estrutura",
      contextoMacro: "Dólar perdendo força.",
      suporteResistencia: "Suporte em 1.0830"
    }
  },
  { 
    ativo: "BTCUSD", 
    preco: 64230, 
    sinal: "VENDA", 
    status: "IMINENTE",
    metodo: "REVERSÃO",
    vacuoLivre: "2500 pts",
    validacoes: { tendenciaM15: false, volumeConfirmado: true, gatilhoMicro: false, zonaValor: true },
    detalhesTecnicos: {
      stopLoss: 65100,
      takeProfit: 61500,
      payoff: "1:3.1",
      regraAplicada: "Módulo 05: Fakeout",
      contextoMacro: "Resistência psicológica.",
      suporteResistencia: "Resistência em 65.000"
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
      // Mantém mocks se a API não estiver rodando
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSignals();
    const interval = setInterval(fetchSignals, 10000); // Atualiza a cada 10s
    return () => clearInterval(interval);
  }, []);

  return { signals, loading, connected, refetch: fetchSignals };
};