import { Outlet } from 'react-router';
import SidebarLayout from './SidebarLayout';

const DashboardLayout = () => {
  return (
    <SidebarLayout>
      <Outlet />
    </SidebarLayout>
  );
};

export default DashboardLayout;
