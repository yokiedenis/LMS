// app/components/ui/select.tsx

import React from "react";

// Use a generic type T to allow flexible typing of the value
interface SelectProps<T extends string> {
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
  children?: React.ReactNode; // Allow custom labels as children
  id: string;
  name: string;
  onBlur: React.FocusEventHandler<HTMLSelectElement>;
  className?: string; // Add className as an optional prop

}

const Select = <T extends string>({
  value,
  onChange,
  options,
  children,
  id,
  name,
  onBlur,
}: SelectProps<T>) => {
  return (
    <div>
      {children && <label htmlFor={id} className="text-sm font-medium">{children}</label>}
      <select
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
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