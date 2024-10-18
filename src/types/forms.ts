import { LucideIcon } from "lucide-react";

export type ItemType = {
    title: string;
    data: string;
    icon: LucideIcon;
    color: string;
    bgColor: string;
};



export interface Option {
    id: string;
    name: string;
    disabled?: boolean;

}


export interface SelectorType {
    id: string;
    name: string;
}


// selector
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    title: string;
    name: string;
    options: Option[];

    defaultValue?: string | number;
}