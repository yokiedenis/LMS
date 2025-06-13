// @/components/sort.tsx
import React from "react";

interface SortProps<T> {
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
  id: string;
  name: string;
  onBlur?: () => void;
  className?: string; // Optional className for additional styling
}

export function Sort<T>({
  value,
  onChange,
  options,
  id,
  name,
  onBlur,
  className = "",
}: SortProps<T>) {
  return (
    <select
      value={value as string} // Cast to string for HTML compatibility
      onChange={(e) => onChange(e.target.value as T)} // Cast back to generic type T
      id={id}
      name={name}
      onBlur={onBlur}
      className={`w-full bg-transparent border-none text-gray-700 focus:outline-none focus:ring-0 ${className}`}
    >
      {options.map((option) => (
        <option key={option.value as string} value={option.value as string}>
          {option.label}
        </option>
      ))}
    </select>
  );
}