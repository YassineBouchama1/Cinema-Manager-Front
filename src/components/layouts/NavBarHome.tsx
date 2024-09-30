import Image from "next/image";
import type { FC } from "react";

import Link from "next/link";
import { getSession } from "@/lib/getSessions";
import ThemeSwitcher from "../ui/ThemeSwitcher";


interface NavBarHomeProps { }

const NavBarHome: FC<NavBarHomeProps> = async ({ }) => {

    const session = await getSession();

    return (
        <header className=" py-4 px-4 sm:px-10 z-50 min-h-[70px] shadow-sm shadow-b  shadow-gray-700">
            <div className="  relative flex  justify-between items-center gap-4 flex-wrap">
                <Link
                    href={'/'}
                >
                    <Image
                        src={"https://img.freepik.com/free-vector/bird-colorful-gradient-design-vector_343694-2506.jpg?size=338&ext=jpg&ga=GA1.1.1819120589.1727308800&semt=ais_hybrid"}
                        alt="logo"
                        sizes="20"
                        width="20"
                        height="20"
                        className="h-16 w-auto"
                    />
                </Link>
                <div>
                    <ThemeSwitcher />
                </div>
                <div className="flex ">
                    {session?.token ? (
                        <Link
                            href={"/dashboard"}
                            className="px-6 py-3 rounded-xl text-white bg-theme-color transition-all hover:opacity-85 duration-150"
                        >
                            dashboard
                        </Link>
                    ) : (
                        <Link
                            href={"/login"}
                            className="px-6 py-3 rounded-xl text-white bg-theme-color transition-all hover:opacity-85 duration-150"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};
export default NavBarHome;