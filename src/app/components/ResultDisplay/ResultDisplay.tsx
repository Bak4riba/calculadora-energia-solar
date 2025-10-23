'use client';

import { SimulationResult } from '../../types';

interface ResultsDisplayProps {
  results: SimulationResult | null;
}

export default function ResultsDisplay({ results }: ResultsDisplayProps) {
  if (!results) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Resultado da Simulação</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-800">Sistema Necessário</h3>
            <p className="text-2xl font-bold text-green-600">
              {results.tamanhoSistemaKw} kWp
            </p>
            <p className="text-sm text-green-700">
              {results.numeroPlacas} placas solares
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-800">Investimento Estimado</h3>
            <p className="text-2xl font-bold text-blue-600">
              R$ {results.investimentoEstimado.toLocaleString('pt-BR')}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <h3 className="font-semibold text-orange-800">Economia Mensal</h3>
            <p className="text-2xl font-bold text-orange-600">
              R$ {results.economiaMensal.toLocaleString('pt-BR')}
            </p>
            <p className="text-sm text-orange-700">
              R$ {results.economiaAnual.toLocaleString('pt-BR')} por ano
            </p>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h3 className="font-semibold text-purple-800">Retorno do Investimento</h3>
            <p className="text-2xl font-bold text-purple-600">
              {results.paybackAnos} anos
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="font-semibold text-gray-800 mb-2">Resumo</h3>
        <p className="text-gray-600">
          Com um sistema de {results.tamanhoSistemaKw} kWp, você pode economizar até{' '}
          <strong>R$ {results.economiaMensal.toLocaleString('pt-BR')}</strong> por mês na sua conta de luz, 
          pagando o investimento em aproximadamente {results.paybackAnos} anos.
        </p>
      </div>
    </div>
  );
}