

import Image from "next/image";
import Link from "next/link";
import HeaderHome from "@/components/ui/HeaderHome";



const DashboardPage = async () => {

  return (
    <div className="max-w-[1920px] mx-auto">
      <div className="bg-[#f8f9ff] font-[sans-serif] text-[#333] text-[15px]">
        <HeaderHome />
        <div className="relative bg-repeat">
          <div className="px-4 sm:px-10 ">
            <div className="relative mt-16 max-w-4xl mx-auto text-center  z-10">
              <h1
                className={`  md:text-6xl text-4xl font-bold mb-6 md:!leading-[75px]`}
              >
                home_page_main_text
              </h1>




              images Body
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;