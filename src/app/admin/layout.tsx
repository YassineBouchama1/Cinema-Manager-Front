import TitlePage from "@/components/commen/TitlePage";
import TopNavbarAdmin from "@/components/layouts/TopNavbarAdmin";
import HeaderAdmin from "@/components/layouts/TopNavbarAdmin";
import Sidebar from "@/components/layouts/sidebar";
import MotionWrapper from "@/components/Wrappers/MotionWrapper";
import PageWrapper from "@/components/Wrappers/PageWapper";
import { getSession } from "@/lib/sessions";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getSession()
  return (
    <div className=" flex   max-h-screen w-full bg-white  ">
      <Sidebar />
      <div className="w-full ">
        <TopNavbarAdmin />
        <main className="overflow-x-auto p-4 bg-gray-100">

          {/* <TitlePage /> */}
          {children}
        </main>

      </div>
    </div>
  );
}
