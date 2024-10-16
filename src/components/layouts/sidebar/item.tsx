'use client'
import { useMemo } from "react";
import { LucideIcon } from "lucide-react";
import {
    usePathname,

} from "next/navigation";
import Link from "next/link";
import { useGlobalTheme } from "@/context/GlobalThemeContext";



// Interface for SidebarItem data
interface ISidebarItem {
    name: string;
    path: string;
    icon: LucideIcon;
}



// SidebarItem component with TypeScript types
const SidebarItem: React.FC<{ item: ISidebarItem }> = ({ item }) => {
    const { name, icon: Icon, path } = item;

    const pathname = usePathname();

    const { toggleSidebar, isSidebarOpen } = useGlobalTheme()






    //when path changed 
    const isActive = useMemo(() => {
        toggleSidebar() // close sidebar

        // if pathname has same path  make it active
        return pathname.endsWith(path);
    }, [path, pathname, toggleSidebar]);

    return (
        <>
            <Link
                href={path}
                className={`flex items-center text-white p-3 rounded-lg hover:text-white cursor-pointer hover:bg-blue-900 duration-300 justify-between
     ${isActive && "bg-blue-900 text-white"}
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