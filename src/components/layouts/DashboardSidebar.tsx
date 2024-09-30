import React from 'react';

const DashboardSidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white">
      {/* Add dashboard-specific sidebar content */}
      <nav>
        <ul>
          <li>Dashboard Home</li>
          <li>Analytics</li>
          <li>Reports</li>
          {/* Add more dashboard-specific menu items */}
        </ul>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;