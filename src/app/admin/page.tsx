import React from 'react';

export default function DashboardPage() {
  return (
    <div className="w-full lg:ps-64">
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Add your grid and cards here */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Example Card */}
          <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
            <div className="p-4 md:p-5">
              <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">Total Users</h3>
              <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">72,540</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}