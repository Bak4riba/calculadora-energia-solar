'use client';

import { useState } from 'react';
import { SimulationInput } from '../../types';
import { irradiacaoPorCidade } from '../../lib/calculations';
import Input from '../UI/Input/Input';
import Button from '../UI/Button';

interface CalculatorFormProps {
  onCalculate: (data: SimulationInput) => void;
  loading: boolean;
}

export default function CalculatorForm({ onCalculate, loading }: CalculatorFormProps) {
  const [formData, setFormData] = useState({
    consumoMensalKwh: "0",
    valorContaMensal: "0",
    cidade: '0'
  });

  const [errors, setErrors] = useState({
    consumoMensalKwh: "",
    valorContaMensal: ""
  });

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    
    setInputFocus(prev => ({
      ...prev,
      [name]: true
    }));

    if ((name === 'consumoMensalKwh' && formData.consumoMensalKwh === "300") ||
        (name === 'valorContaMensal' && formData.valorContaMensal === "350")) {
      setFormData(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setInputFocus(prev => ({
      ...prev,
      [name]: false
    }));

    if (value === "") {
      setFormData(prev => ({
        ...prev,
        [name]: name === 'consumoMensalKwh' ? "300" : "350"
      }));
    }
  };

  const getDisplayValue = (fieldName: keyof typeof formData) => {
    const value = formData[fieldName];
    
    if (value === "" && !inputFocus[fieldName as keyof typeof inputFocus]) {
      return fieldName === 'consumoMensalKwh' ? "300" : "350";
    }
    
    return value;
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-200 dark:bg-gray-800 p-6 rounded-lg .lg:shadow-lg border border-gray-200 dark:border-gray-300">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Simule sua Economia com Energia Solar
      </h2>

      <div className="space-y-4">
        <Input
          label="Consumo Mensal (kWh)"
          type={"number"}
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

        <Input
          label="Valor da Conta de Luz (R$)"
          type="number"
          name="valorContaMensal"
          value={getDisplayValue('valorContaMensal')}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          error={errors.valorContaMensal}
          required
          min={1}
          max={5000}
          step={0.01}
        />

        <div>
          <label htmlFor="cidade" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Cidade
          </label>
          <div className="relative">
            <select
              id="cidade"
              name="cidade"
              value={formData.cidade}
              onChange={handleSelectChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white cursor-pointer"
            >
              {cidades.map((cidade) => (
                <option key={cidade} value={cidade}>
                  {cidade.split('-').map((word) => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
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