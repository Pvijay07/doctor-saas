import React from "react";

const Button = ({
  children,
  onClick,
  variant = "default",
  size = "default",
  className = "",
  ...props
}) => {
  let baseClasses =
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-slate-300";
  let variantClasses = "";
  let sizeClasses = "";

  switch (variant) {
    case "default":
      variantClasses = "bg-blue-600 text-white shadow hover:bg-blue-700/90";
      break;
    case "outline":
      variantClasses =
        "border border-slate-200 bg-white shadow-sm hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50";
      break;
    case "destructive":
      variantClasses = "bg-red-600 text-white shadow-sm hover:bg-red-700/90";
      break;
    case "ghost":
      variantClasses =
        "hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50";
      break;
    case "link":
      variantClasses =
        "text-slate-900 underline-offset-4 hover:underline dark:text-slate-50";
      break;
    case "secondary":
      variantClasses =
        "bg-slate-100 text-slate-900 shadow-sm hover:bg-slate-200/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-700/80";
      break;
  }

  switch (size) {
    case "default":
      sizeClasses = "h-9 px-4 py-2";
      break;
    case "sm":
      sizeClasses = "h-8 rounded-md px-3 text-xs";
      break;
    case "lg":
      sizeClasses = "h-10 rounded-md px-8";
      break;
    case "icon":
      sizeClasses = "h-9 w-9";
      break;
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;