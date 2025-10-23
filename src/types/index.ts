export interface SimulationInput {
  consumoMensalKwh: number;
  valorContaMensal: number;
  cidade: string;
  irradiacaoSolar: number; // kWh/m²/dia
}

export interface SimulationResult {
  tamanhoSistemaKw: number;
  numeroPlacas: number;
  investimentoEstimado: number;
  economiaMensal: number;
  economiaAnual: number;
  paybackAnos: number;
  geracaoMensalEstimada: number;
}