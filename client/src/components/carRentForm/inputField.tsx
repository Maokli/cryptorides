import React, { ChangeEvent } from "react";
import { TextField } from "@mui/material";

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
    <TextField
      id={`${name}-input`}
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={handleInputChange}
      name={name}
      required={required}
      variant="outlined"
      fullWidth
      type={numeric ? "number" : "text"}
    />
  );
};

export default LabeledInput;