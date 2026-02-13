"use client";

import { useState, useEffect } from 'react';
import { toast } from "sonner";

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
    ativo: "AGUARDANDO ROBÔ...", 
    preco: 0, 
    sinal: "AGUARDANDO", 
    status: "AGUARDANDO",
    metodo: "TENDÊNCIA",
    vacuoLivre: "---",
    validacoes: { tendenciaM15: false, volumeConfirmado: false, gatilhoMicro: false, zonaValor: false },
    detalhesTecnicos: {
      stopLoss: 0,
      takeProfit: 0,
      payoff: "1:1",
      regraAplicada: "Inicie o script Python para ver os sinais reais.",
      contextoMacro: "Aguardando conexão...",
      suporteResistencia: "---"
    }
  }
];

export const useTradingSignals = () => {
  const [signals, setSignals] = useState<TradingSignal[]>(MOCK_DATA);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);

  const fetchSignals = async () => {
    setLoading(true);
    
    // Tentamos as duas URLs em paralelo para ganhar velocidade
    const urls = [
      'http://127.0.0.1:5000/sinais',
      'https://ten-carrots-find.loca.lt/sinais'
    ];

    let success = false;

    for (const url of urls) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000); // Timeout de 2s

        const response = await fetch(url, {
          headers: { 'Bypass-Tunnel-Reminder': 'true' },
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          setSignals(data);
          if (!connected) {
            toast.success(`Conectado ao Robô! (${url.includes('127.0.0.1') ? 'Local' : 'Túnel'})`);
          }
          setConnected(true);
          success = true;
          break; // Para no primeiro que funcionar
        }
      } catch (e) {
        // Falha silenciosa para tentar a próxima URL
      }
    }

    if (!success) {
      if (connected) toast.error("Conexão com o robô perdida.");
      setConnected(false);
    }
    
    setLoading(false);
  };

  useEffect(() => {
    fetchSignals();
    const interval = setInterval(fetchSignals, 3000); // Atualiza a cada 3 segundos
    return () => clearInterval(interval);
  }, [connected]);

  return { signals, loading, connected, refetch: fetchSignals };
};