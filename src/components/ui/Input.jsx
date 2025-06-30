import React from "react";

const Input = ({
  type = "text",
  placeholder = "",
  className = "",
  ...props
}) => {
  return (
    <input
      type={type}
      className={`flex h-9 w-full rounded-md border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:placeholder:text-slate-400 ${className}`}
      placeholder={placeholder}
      {...props}
    />
  );
};

export default Input;