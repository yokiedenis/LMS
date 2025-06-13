import React from "react";

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  children?: React.ReactNode; // Allow custom labels as children
  id: string;
  name: string;
  onBlur: React.FocusEventHandler<HTMLSelectElement>;
}

const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  children,
  id,
  name,
  onBlur,
}) => {
  return (
    <div>
      {children && <label htmlFor={id} className="text-sm font-medium">{children}</label>}
      <select
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className="input"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export { Select };
