import React, { ChangeEvent } from "react";

interface LabeledInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  required?: boolean;
  numeric?: boolean;
}

const LabeledInput: React.FC<LabeledInputProps> = ({ label, placeholder, value, onChange, name, numeric, required }) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (numeric && isNaN(Number(inputValue))) {
      return;
    }
    onChange(e);
  };

  return (
    <div className="flex flex-col leading-[150%] max-w-[700px]">
      <label htmlFor={`${name}-input`} className="w-full text-base font-semibold tracking-tight text-gray-900">
        {label}
        <div className="relative w-[650px]">
          <input
            id={`${name}-input`}
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={handleInputChange}
            name={name}
            required={required}
            className="justify-center items-start px-10 py-6 mt-4 w-full text-sm font-medium tracking-tight rounded-xl bg-gray-100 text-gray-900"
          />
        </div>
      </label>
    </div>
  );
};

export default LabeledInput;
