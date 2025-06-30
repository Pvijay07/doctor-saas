import React from "react";

const Table = ({ children, className = "" }) => {
  return (
    <div className="relative w-full overflow-auto">
      <table className={`w-full caption-bottom text-sm ${className}`}>
        {children}
      </table>
    </div>
  );
};

const TableHeader = ({ children, className = "" }) => {
  return <thead className={`[&_tr]:border-b ${className}`}>{children}</thead>;
};

const TableBody = ({ children, className = "" }) => {
  return (
    <tbody className={`[&_tr:last-child]:border-0 ${className}`}>
      {children}
    </tbody>
  );
};

const TableRow = ({ children, className = "" }) => {
  return (
    <tr
      className={`border-b transition-colors hover:bg-slate-100/50 data-[state=selected]:bg-slate-100 dark:hover:bg-slate-800/50 dark:data-[state=selected]:bg-slate-800 ${className}`}
    >
      {children}
    </tr>
  );
};

const TableHead = ({ children, className = "" }) => {
  return (
    <th
      className={`h-10 px-2 text-left align-middle font-medium text-slate-500 [&:has([role=checkbox])]:pr-0 [&_span]:line-clamp-1 dark:text-slate-400 ${className}`}
    >
      {children}
    </th>
  );
};

const TableCell = ({ children, className = "" }) => {
  return (
    <td
      className={`p-2 align-middle [&:has([role=checkbox])]:pr-0 ${className}`}
    >
      {children}
    </td>
  );
};

export {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
};