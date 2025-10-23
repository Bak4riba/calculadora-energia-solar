'use client';

import { useState } from 'react';

// Tipos
interface SimulationInput {
  consumoMensalKwh: number;
  valorContaMensal: number;
  cidade: string;
}

interface SimulationResult {
  tamanhoSistemaKw: number;
  numeroPlacas: number;
  investimentoEstimado: number;
  economiaMensal: number;
  economiaAnual: number;
  paybackAnos: number;
  geracaoMensalEstimada: number;
}

// Dados de irradiação solar
const irradiacaoPorCidade: Record<string, number> = {
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

// Componente do Formulário
function CalculatorForm({ 
  onCalculate, 
  loading 
}: { 
  onCalculate: (data: SimulationInput) => void; 
  loading: boolean; 
}) {
  const [formData, setFormData] = useState<SimulationInput>({
    consumoMensalKwh: 300,
    valorContaMensal: 350,
    cidade: 'sao-paulo'
  });

  const cidades = Object.keys(irradiacaoPorCidade);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'consumoMensalKwh' || name === 'valorContaMensal' 
        ? Number(value) 
        : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Simule sua Economia com Energia Solar
      </h2>

      <div className="space-y-4">
        <div>
          <label htmlFor="consumoMensalKwh" className="block text-sm font-medium text-gray-700 mb-2">
            Consumo Mensal (kWh)
          </label>
          <input
            type="number"
            id="consumoMensalKwh"
            name="consumoMensalKwh"
            value={formData.consumoMensalKwh}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
            min="50"
            max="2000"
            required
          />
          <div className="text-xs text-gray-500 mt-1">
            Média: Residência 300-500 kWh, Comercial 500-2000 kWh
          </div>
        </div>

        <div>
          <label htmlFor="valorContaMensal" className="block text-sm font-medium text-gray-700 mb-2">
            Valor da Conta de Luz (R$)
          </label>
          <input
            type="number"
            id="valorContaMensal"
            name="valorContaMensal"
            value={formData.valorContaMensal}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
            min="50"
            max="5000"
            step="0.01"
            required
          />
        </div>

        <div>
          <label htmlFor="cidade" className="block text-sm font-medium text-gray-700 mb-2">
            Cidade
          </label>
          <select
            id="cidade"
            name="cidade"
            value={formData.cidade}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            {cidades.map((cidade) => (
              <option key={cidade} value={cidade}>
                {cidade.split('-').map((word) => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Calculando...' : 'Calcular Economia'}
        </button>
      </div>
    </form>
  );
}

// Componente de Resultados
function ResultsDisplay({ results }: { results: SimulationResult | null }) {
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

// Lógica de cálculo
function calcularSistema(input: SimulationInput): SimulationResult {
  const { consumoMensalKwh, valorContaMensal, cidade } = input;
  
  const irradiacaoSolar = irradiacaoPorCidade[cidade] || 4.5;
  
  // Cálculo do tamanho do sistema (kWp)
  const horasSolDia = irradiacaoSolar * 3.5;
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

// Página Principal
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4 sm:py-12">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Calculadora de Energia Solar
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Descubra quanto você pode economizar com energia solar fotovoltaica
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <CalculatorForm onCalculate={handleCalculate} loading={loading} />
          
          <div className="space-y-6">
            <ResultsDisplay results={results} />
            
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 font-medium">{error}</p>
              </div>
            )}

            {!results && !loading && !error && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="font-semibold text-yellow-800 mb-3 text-lg">
                  💡 Como funciona?
                </h3>
                <ul className="text-yellow-700 text-sm space-y-2">
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