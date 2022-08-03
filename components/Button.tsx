import React from "react";

interface IButtonProps {
  children: JSX.Element | string;
  colour?: "primary" | "secondary" | "danger";
  disabled?: boolean;
}

const COLOURS = {
  primary: "bg-blue-800 text-white hover:bg-blue-600",
  secondary: "bg-gray-800 text-white",
  danger: "bg-red-800 text-white hover:bg-red-600",
};

const ACTIVE = {
  active: "",
  inactive: "opacity-50",
};

export default function Button({ children, colour, disabled }: IButtonProps) {
  return (
    <button
      disabled={disabled}
      className={`shadow-sm hover:shadow-lg font-bold rounded-lg px-4 py-2 ${
        COLOURS[colour!] || COLOURS["primary"]
      }
      ${ACTIVE[disabled ? "inactive" : "active"]}`}
    >
      {children}
    </button>
  );
}
