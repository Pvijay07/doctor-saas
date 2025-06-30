import React from "react";

const Card = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`rounded-lg border bg-white text-slate-950 shadow-sm dark:bg-slate-950 dark:text-slate-50 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = "" }) => {
  return (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
      {children}
    </div>
  );
};

const CardTitle = ({ children, className = "" }) => {
  return (
    <h3
      className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
    >
      {children}
    </h3>
  );
};

const CardDescription = ({ children, className = "" }) => {
  return (
    <p className={`text-sm text-slate-500 dark:text-slate-400 ${className}`}>
      {children}
    </p>
  );
};

const CardContent = ({ children, className = "" }) => {
  return <div className={`p-6 pt-0 ${className}`}>{children}</div>;
};

export { Card, CardHeader, CardTitle, CardDescription, CardContent };