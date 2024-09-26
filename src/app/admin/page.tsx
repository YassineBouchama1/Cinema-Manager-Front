

import Image from "next/image";
import Link from "next/link";
import HeaderHome from "@/components/ui/HeaderHome";



const AdminPage = async () => {

    return (
        <div className="max-w-[1920px] mx-auto">
            <div className="bg-[#f8f9ff] font-[sans-serif] text-[#333] text-[15px]">
                <HeaderHome />
                <h1>Admin</h1>
            </div>
        </div>
    );
};

export default AdminPage;