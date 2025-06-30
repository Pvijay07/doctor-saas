import React from "react";
import Button from "./Button";

const Dialog = ({ children, open, onOpenChange }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="relative z-50 w-full max-w-lg rounded-lg border bg-white p-6 shadow-lg">
        {children}
      </div>
    </div>
  );
};

const DialogHeader = ({ children }) => (
  <div className="flex flex-col space-y-1.5 text-center sm:text-left">
    {children}
  </div>
);

const DialogTitle = ({ children }) => (
  <h3 className="text-lg font-semibold leading-none tracking-tight">
    {children}
  </h3>
);

const DialogDescription = ({ children }) => (
  <p className="text-sm text-slate-500">{children}</p>
);

const DialogContent = ({ children, className = "" }) => (
  <div className={`py-4 ${className}`}>{children}</div>
);

const DialogFooter = ({ children }) => (
  <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-4">
    {children}
  </div>
);

const DialogClose = ({ children, onClick }) => (
  <Button variant="outline" onClick={onClick}>
    {children}
  </Button>
);

export {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
  DialogFooter,
  DialogClose,
};