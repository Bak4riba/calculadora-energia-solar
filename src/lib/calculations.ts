import { SimulationInput, SimulationResult } from '@/types';

export class SolarCalculator {
  static calcularSistema(input: SimulationInput): SimulationResult {
    const { consumoMensalKwh, valorContaMensal, irradiacaoSolar } = input;
    
    // Cálculo do tamanho do sistema (kWp)
    const horasSolDia = irradiacaoSolar * 3.5; // Fator de conversão
    const tamanhoSistemaKw = consumoMensalKwh / (horasSolDia * 30);
    
    // Número de placas (considerando placas de 550W)
    const numeroPlacas = Math.ceil((tamanhoSistemaKw * 1000) / 550);
    
    // Investimento estimado (R$ 5.000 por kWp)
    const investimentoEstimado = tamanhoSistemaKw * 5000;
    
    // Economia mensal (90% da conta atual)
    const economiaMensal = valorContaMensal * 0.9;
    const economiaAnual = economiaMensal * 12;
    
    // Payback em anos
    const paybackAnos = investimentoEstimado / economiaAnual;
    
    // Geração mensal estimada
    const geracaoMensalEstimada = tamanhoSistemaKw * horasSolDia * 30;

    return {
      tamanhoSistemaKw: Number(tamanhoSistemaKw.toFixed(2)),
      numeroPlacas,
      investimentoEstimado: Math.round(investimentoEstimado),
      economiaMensal: Number(economiaMensal.toFixed(2)),
      economiaAnual: Number(economiaAnual.toFixed(2)),
      paybackAnos: Number(paybackAnos.toFixed(1)),
      geracaoMensalEstimada: Number(geracaoMensalEstimada.toFixed(2))
    };
  }
}

// Dados de irradiação solar por cidade
export const irradiacaoPorCidade: Record<string, number> = {
  'sao-paulo': 4.5,
  'rio-de-janeiro': 4.8,
  'belo-horizonte': 5.2,
  'brasilia': 5.5,
  'salvador': 5.1,
  'fortaleza': 5.4,
  'porto-alegre': 4.3,
  'curitiba': 4.2,
  'recife': 5.3,
  'manaus': 4.4
};