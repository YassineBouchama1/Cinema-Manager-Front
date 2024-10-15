'use client'
import { useMemo, useState } from "react";
import { ChevronDown, LucideIcon } from "lucide-react";
import {
    usePathname,
    useRouter,
    useSelectedLayoutSegment,
} from "next/navigation";
import Link from "next/link";



// Interface for SidebarItem data
interface ISidebarItem {
    name: string;
    path: string;
    icon: LucideIcon;
}

// Interface for SubMenuItem data
interface ISubItem {
    name: string;
    path: string;
}

// SidebarItem component with TypeScript types
const SidebarItem: React.FC<{ item: ISidebarItem }> = ({ item }) => {
    const { name, icon: Icon, path } = item;

    const pathname = usePathname();
    const segment = useSelectedLayoutSegment();






    //when path changed 
    const isActive = useMemo(() => {


        // if pathname has same path  make it active
        return pathname.endsWith(path);
    }, [path, pathname]);

    return (
        <>
            <Link
                href={path}
                className={`flex items-center text-white p-3 rounded-lg hover:text-white cursor-pointer hover:bg-[#4880FF] duration-300 justify-between
     ${isActive && "bg-[#4880FF] text-white"}
    `}

            >
                <div className="flex items-center space-x-2 gap-x-2">
                    <Icon size={20} />
                    <p className="text-sm font-semibold">{name} </p>
                </div>

            </Link>

        </>
    );
};

export default SidebarItem;