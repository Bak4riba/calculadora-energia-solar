'use client';

import { useState } from 'react';
import { SimulationInput } from '../../types';
import { irradiacaoPorCidade } from '../../lib/calculations';
import Input from '../UI/Input';
import Button from '../UI/Button';

interface CalculatorFormProps {
  onCalculate: (data: SimulationInput) => void;
  loading: boolean;
}

export default function CalculatorForm({ onCalculate, loading }: CalculatorFormProps) {
  const [formData, setFormData] = useState({
    consumoMensalKwh: "Consumo Mensal (kWh)",
    valorContaMensal: "Valor da Conta de Luz (R$)*",
    cidade: 'Seleciona a Cidade'
  });

  const [errors, setErrors] = useState({
    consumoMensalKwh: "",
    valorContaMensal: ""
  });

  // Estados para controlar se o input está em foco
  const [inputFocus, setInputFocus] = useState({
    consumoMensalKwh: false,
    valorContaMensal: false
  });

  const cidades = Object.keys(irradiacaoPorCidade);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const consumo = Number(formData.consumoMensalKwh) || 300;
    const valorConta = Number(formData.valorContaMensal) || 350;

    const newErrors = {
      consumoMensalKwh: consumo <= 0 ? "Consumo deve ser maior que 0" : "",
      valorContaMensal: valorConta <= 0 ? "Valor da conta deve ser maior que 0" : ""
    };

    setErrors(newErrors);

    if (!newErrors.consumoMensalKwh && !newErrors.valorContaMensal) {
      onCalculate({
        consumoMensalKwh: consumo,
        valorContaMensal: valorConta,
        cidade: formData.cidade
      });
    }
  };

  /* Handler genérico para inputs */
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };

    // Handler específico para select
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    
    // Marca que o input está em foco
    setInputFocus(prev => ({
      ...prev,
      [name]: true
    }));

    // Se o valor for o default, limpa o input
    if ((name === 'consumoMensalKwh' && formData.consumoMensalKwh === "0") ||
        (name === 'valorContaMensal' && formData.valorContaMensal === "0")) {
      setFormData(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Marca que o input perdeu o foco
    setInputFocus(prev => ({
      ...prev,
      [name]: false
    }));

    // Se o usuário não digitou nada, restaura o valor default
    if (value === "") {
      setFormData(prev => ({
        ...prev,
        [name]: name === 'consumoMensalKwh' ? "0" : "0"
      }));
    }
  };

  // Função para determinar o placeholder
  const getPlaceholder = (fieldName: string) => {
    if (fieldName === 'consumoMensalKwh') return "0";
    if (fieldName === 'valorContaMensal') return "0";
    return "";
  };

  // Função para determinar o valor a ser exibido
  const getDisplayValue = (fieldName: keyof typeof formData) => {
    const value = formData[fieldName];

    // Apenas campos com controle de foco devem acessar inputFocus
    const isFocusTracked = fieldName === 'consumoMensalKwh' || fieldName === 'valorContaMensal';
    const fieldIsFocused = isFocusTracked ? inputFocus[fieldName as keyof typeof inputFocus] : false;
    
    // Se o campo está vazio mas não está em foco, mostra placeholder visual
    if (value === "" && !fieldIsFocused) {
      return getPlaceholder(fieldName as string);
    }
    
    return value;
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Simule sua Economia com Energia Solar
      </h2>

      <div className="space-y-4">
        <div>
          <Input
                label="Consumo Mensal (kWh)"
                type="number"
                name="consumoMensalKwh"
                value={getDisplayValue('consumoMensalKwh')}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                error={errors.consumoMensalKwh}
                required
                min={1}
                max={2000}
                helperText="Média: Residência 300-500 kWh, Comercial 500-2000 kWh"
                />
          {errors.consumoMensalKwh && (
            <p className="text-red-500 text-sm mt-1">{errors.consumoMensalKwh}</p>
          )}
        </div>

        <div>
          <Input
                label="Valor da Conta de Luz (R$)*"
                type="number"
                name="valorContaMensal"
                value={getDisplayValue('valorContaMensal')}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                error={errors.consumoMensalKwh}
                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors 
                    [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                    ${errors 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-gray-300 hover:border-gray-400'
                    }`}
                required
                min={1}
                max={2000}
                />


          {errors.valorContaMensal && (
            <p className="text-red-500 text-sm mt-1">{errors.valorContaMensal}</p>
          )}
        </div>

        <div>
          <label htmlFor="cidade" className="block text-sm font-medium text-gray-700 mb-2">
            Cidade
          </label>
<div className="relative">
        <select
            id="cidade"
            name="cidade"
            value={formData.cidade}
            onChange={handleSelectChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white cursor-pointer text-gray-900"
        >
    {cidades.map((cidade) => (
      <option key={cidade} value={cidade}>
        {cidade.split('-').map((word) => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ')}
      </option>
    ))}
  </select>
  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  </div>
</div>
        </div>
        <Button 
        type="submit" 
        disabled={loading} 
        loading={loading}
        fullWidth
        >
            Calcular Economia
        </Button>
      </div>
    </form>
  );
}

