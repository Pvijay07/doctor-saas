const Input = ({ type = 'text', placeholder = '', className = '', ...props }) => {
  return (
    <input
      type={type}
      className={`flex h-9 w-full rounded-md border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:placeholder:text-slate-400 ${className}`}
      placeholder={placeholder}
      {...props}
    />
  );
};

const Label = ({ children, htmlFor, className = '' }) => {
  return (
    <label htmlFor={htmlFor} className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}>
      {children}
    </label>
  );
};

const Card = ({ children, className = '', ...props }) => {
  return (
    <div className={`rounded-lg border bg-white text-slate-950 shadow-sm dark:bg-slate-950 dark:text-slate-50 ${className}`} {...props}>
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = '' }) => {
  return (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
      {children}
    </div>
  );
};

const CardTitle = ({ children, className = '' }) => {
  return (
    <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>
      {children}
    </h3>
  );
};

const CardDescription = ({ children, className = '' }) => {
  return (
    <p className={`text-sm text-slate-500 dark:text-slate-400 ${className}`}>
      {children}
    </p>
  );
};

const CardContent = ({ children, className = '' }) => {
  return (
    <div className={`p-6 pt-0 ${className}`}>
      {children}
    </div>
  );
};

const Table = ({ children, className = '' }) => {
  return (
    <div className="relative w-full overflow-auto">
      <table className={`w-full caption-bottom text-sm ${className}`}>
        {children}
      </table>
    </div>
  );
};

const TableHeader = ({ children, className = '' }) => {
  return (
    <thead className={`[&_tr]:border-b ${className}`}>
      {children}
    </thead>
  );
};

const TableBody = ({ children, className = '' }) => {
  return (
    <tbody className={`[&_tr:last-child]:border-0 ${className}`}>
      {children}
    </tbody>
  );
};

const TableRow = ({ children, className = '' }) => {
  return (
    <tr className={`border-b transition-colors hover:bg-slate-100/50 data-[state=selected]:bg-slate-100 dark:hover:bg-slate-800/50 dark:data-[state=selected]:bg-slate-800 ${className}`}>
      {children}
    </tr>
  );
};

const TableHead = ({ children, className = '' }) => {
  return (
    <th className={`h-10 px-2 text-left align-middle font-medium text-slate-500 [&:has([role=checkbox])]:pr-0 [&_span]:line-clamp-1 dark:text-slate-400 ${className}`}>
      {children}
    </th>
  );
};

const TableCell = ({ children, className = '' }) => {
  return (
    <td className={`p-2 align-middle [&:has([role=checkbox])]:pr-0 ${className}`}>
      {children}
    </td>
  );
};

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

const DialogHeader = ({ children }) => <div className="flex flex-col space-y-1.5 text-center sm:text-left">{children}</div>;
const DialogTitle = ({ children }) => <h3 className="text-lg font-semibold leading-none tracking-tight">{children}</h3>;
const DialogDescription = ({ children }) => <p className="text-sm text-slate-500">{children}</p>;
const DialogContent = ({ children, className = '' }) => <div className={`py-4 ${className}`}>{children}</div>;
const DialogFooter = ({ children }) => <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-4">{children}</div>;
const DialogClose = ({ children, onClick }) => <Button variant="outline" onClick={onClick}>{children}</Button>;