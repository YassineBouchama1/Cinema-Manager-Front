import { SelectProps } from "@/types/forms";
import { cn } from "@/utils";



const FormFieldSelect: React.FC<SelectProps> = ({
    title,
    options,
    name,
    defaultValue,
    ...rest
}) => {

    return (
        <div className="flex flex-col">
            <label className="mr-1" htmlFor={rest.id}>
                {title}
                <span className="text-red-500">*</span>
            </label>
            <select
                {...rest}
                name={name}
                className={cn(
                    " py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                )}
            >
                <option value="">Select</option>
                {options.map((option) => (
                    <option
                        className="py-2.5 px-4 hover:bg-blue-50 text-black text-sm cursor-pointer"
                        selected={defaultValue === option.id}
                        key={option.id}
                        value={option.id}
                    >
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FormFieldSelect;