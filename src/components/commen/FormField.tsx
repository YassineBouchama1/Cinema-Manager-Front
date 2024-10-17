import { cn } from "@/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
  styleInput?: string;
  styleDiv?: string;
  extraContent?: React.ReactNode; 
}

export function FormField({ extraContent, ...props }: InputProps) {
  return (
    <div className={cn(
      props.styleDiv, "block mb-2 text-sm font-medium text-white w-full")}>
      <label className="mr-1" htmlFor={props.id}>
        {props.title}
        <span className="text-red-500">*</span>
      </label>
      <div className="relative"> 
        <input
          onChange={(e) => e.currentTarget.setCustomValidity("")}
          {...props}
          className={cn(
            props.styleInput,
            " py-3 px-4 block w-full  rounded-md text-sm focus:border-blue-500 disabled:opacity-50 disabled:pointer-events-none bg-slate-900 border-gray-700 text-gray-400 focus:ring-gray-600"
          )}
        />
        {extraContent} 
      </div>
    </div>
  );
}