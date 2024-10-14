import TitlePage from "@/components/commen/TitlePage";
import DashboardHeader from "@/components/layouts/DashboardHeader";
import Sidebar from "@/components/layouts/sidebar";
import { getSession } from "@/lib/sessions";



export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession()



  if (!session) {
    return <p>Access Denied</p>;
  }


  return (
    <div className=" flex h-screen bg-gray-100 text-black">
      <Sidebar />
      <main className="flex-1 overflow-auto ">
        {/* <DashboardHeader /> */}
        <TitlePage />
        <div className=" p-6">

          {children}

        </div>

      </main>
    </div>
  );
}


