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
      regraAplicada: "Verifique se o script Python está rodando na porta 5000.",
      contextoMacro: "Tentando conexão local...",
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
    
    // Lista de URLs para tentar conexão
    const urls = [
      'http://localhost:5000/sinais',
      'http://127.0.0.1:5000/sinais',
      'https://ten-carrots-find.loca.lt/sinais'
    ];

    let success = false;

    for (const url of urls) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1500);

        const response = await fetch(url, {
          headers: { 'Bypass-Tunnel-Reminder': 'true' },
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          setSignals(data);
          if (!connected) {
            toast.success(`Robô Detectado em: ${url}`);
            console.log(`✅ Conectado com sucesso a: ${url}`);
          }
          setConnected(true);
          success = true;
          break;
        }
      } catch (e: any) {
        console.warn(`Tentativa falhou para ${url}:`, e.message);
      }
    }

    if (!success) {
      if (connected) {
        toast.error("Conexão com o robô perdida.");
        setConnected(false);
      }
    }
    
    setLoading(false);
  };

  useEffect(() => {
    fetchSignals();
    const interval = setInterval(fetchSignals, 3000);
    return () => clearInterval(interval);
  }, [connected]);

  return { signals, loading, connected, refetch: fetchSignals };
};