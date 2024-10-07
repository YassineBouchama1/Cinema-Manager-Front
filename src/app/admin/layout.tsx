import TitlePage from "@/components/commen/TitlePage";
import TopNavbarAdmin from "@/components/layouts/HeaderAdmin";
import HeaderAdmin from "@/components/layouts/HeaderAdmin";
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
    <div className=" md:flex  h-full w-full bg-gray-100  ">
      <Sidebar />
      <main className="flex-1">
        <TopNavbarAdmin />
        <TitlePage />
        {children}

      </main>
    </div>
  );
}
