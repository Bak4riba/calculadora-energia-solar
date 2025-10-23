export interface SimulationInput {
  consumoMensalKwh: number;
  valorContaMensal: number;
  cidade: string;
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