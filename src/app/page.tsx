'use client';

import { useState } from 'react';
import { SimulationInput, SimulationResult } from './types';
import { calcularSistema } from './lib/calculations';
import CalculatorForm from './components/CalculatorForm';
import ResultsDisplay from './components/ResultDisplay/ResultDisplay';

export default function Home() {
  const [results, setResults] = useState<SimulationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = async (formData: SimulationInput) => {
    setLoading(true);
    setError(null);

    try {
      // Simulação de delay de API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const resultado = calcularSistema(formData);
      setResults(resultado);
    } catch (err) {
      setError('Erro ao calcular a simulação. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-400 to-white  py-8 px-4 sm:py-12">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8 sm:mb-12 relative">
          <div className="absolute top-0 right-0">
          </div>
          <h1 className="bg-blue-800 p-6 rounded-2xl shadow-gray-900 text-3xl sm:text-4xl font-bold text-indigo-300 dark:text-white mb-4 shadow-lg p  dark:bg-gray-800">
            Calculadora de Energia Solar
          </h1>
          <p className="bg-blue-800 text-lg sm:text-xl shadow-gray-950 text-indigo-300 dark:text-gray-300 p-10 max-w-max mx-auto px-4 py-2 rounded-lg shadow-lg dark:bg-gray-700">
            Descubra quanto você pode economizar com energia solar fotovoltaica
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <CalculatorForm onCalculate={handleCalculate} loading={loading} />
          
          <div className="space-y-6">
            <ResultsDisplay results={results} />
            
            {error && (
              <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-4">
                <p className="text-red-800 dark:text-red-200 font-medium">{error}</p>
              </div>
            )}

            {!results && !loading && !error && (
              <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-lg p-6">
                <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-3 text-lg">
                  💡 Como funciona?
                </h3>
                <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Informe seu consumo mensal de energia em kWh</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Digite o valor atual da sua conta de luz</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Selecione sua cidade para um cálculo preciso</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Veja instantaneamente sua economia potencial</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}