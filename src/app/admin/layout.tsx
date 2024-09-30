import DashboardSidebar from '@/components/layouts/DashboardSidebar';
import TopNavbar from '@/components/layouts/TopNavbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-white dark:bg-gray-900">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-800 p-6 no-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}