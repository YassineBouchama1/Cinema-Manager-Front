import { cn } from "@/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
}

export function FormField({ ...props }: InputProps) {
  return (
    <div className={cn(
        props.style,"block mb-2 text-sm font-medium text-gray-900 dark:text-white"  )}>
      <label className="mr-1" htmlFor={props.id}>
        {props.title}
        <span className="text-red-500">*</span>
      </label>
      <input
        onChange={(e) => e.currentTarget.setCustomValidity("")}
        {...props}
        className={cn(
          props.style,
          "bg-theme-bodyInputs py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
        )}
      />
    </div>
  );
}

