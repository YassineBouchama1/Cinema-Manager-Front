import TitleDashboard from "@/components/commen/TitleDashboard";
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
    <div className=" flex h-screen bg-gray-900 text-white">
      <Sidebar />
      <main className="flex-1 overflow-auto ">
        <DashboardHeader />
        <div className=" p-6">
          <TitleDashboard />

          {children}

        </div>

      </main>
    </div>
  );
}


