

import HeaderHome from "@/components/navbar/NavBarHome";



const UserPage = async () => {

    return (
        <div className="max-w-[1920px] mx-auto">
            <div className="bg-[#f8f9ff] font-[sans-serif] text-[#333] text-[15px]">
                <HeaderHome />
                <h1>User</h1>
            </div>
        </div>
    );
};

export default UserPage;