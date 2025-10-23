'use client';

interface InputProps {
  label: string;
  type?: 'text' | 'number' | 'email' | 'password';
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  helperText?: string;
}

export default function Input({
  label,
  type = 'text',
  name,
  value,
  onChange,
  onFocus,
  onBlur,
  placeholder,
  error,
  required = false,
  min,
  max,
  step,
  helperText
}: InputProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors hover:ring-green-500 ${
          error 
            ? 'border-red-500 bg-red-50' 
            : 'border-gray-300 hover:border-green-900'
        }`}
        required={required}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
      {helperText && !error && (
        <div className="text-xs text-gray-500 mt-1">{helperText}</div>
      )}
    </div>
  );
}