"use client";

import { useState, useEffect } from 'react';

export interface TradingSignal {
  ativo: string;
  preco: number;
  sinal: string;
  status: 'AGORA' | 'IMINENTE' | 'AGUARDANDO';
  metodo: 'GORJETA' | 'TENDÊNCIA' | 'REVERSÃO';
  vacuoLivre: string; // Espaço até o próximo obstáculo
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
    vacuoLivre: "450 pts até VWAP Diária",
    validacoes: { tendenciaM15: true, volumeConfirmado: true, gatilhoMicro: true, zonaValor: true },
    detalhesTecnicos: {
      stopLoss: 128320,
      takeProfit: 128900,
      payoff: "1:3.5",
      regraAplicada: "Módulo 03: Rastro Institucional + Vácuo Livre",
      contextoMacro: "Tendência de alta no M15 confirmada. Preço acima da média de 20.",
      suporteResistencia: "Suporte em 128.200 (Mínima anterior)"
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
      regraAplicada: "Método Gorjeta: Scalp em Zona de Exaustão",
      contextoMacro: "Dólar esticado no H1, buscando retorno à média.",
      suporteResistencia: "Resistência em 5.140 (Topo do dia)"
    }
  },
  { 
    ativo: "US500", 
    preco: 5132.25, 
    sinal: "COMPRA", 
    status: "AGORA",
    metodo: "TENDÊNCIA",
    vacuoLivre: "15 pts de Vácuo (Céu Limpo)",
    validacoes: { tendenciaM15: true, volumeConfirmado: true, gatilhoMicro: true, zonaValor: true },
    detalhesTecnicos: {
      stopLoss: 5126.00,
      takeProfit: 5150.00,
      payoff: "1:3.0",
      regraAplicada: "Módulo 02: Alinhamento de Fractais (M15 + M2)",
      contextoMacro: "S&P500 rompeu consolidação com volume institucional.",
      suporteResistencia: "Suporte em 5120.00 (VWAP)"
    }
  }
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