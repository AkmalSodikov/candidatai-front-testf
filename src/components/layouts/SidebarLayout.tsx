// sidebar/SidebarLayout.tsx
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import logo from '@/assets/logo.svg';
import { cn } from '@/lib/utils.ts';
import Support from '@/assets/sidebar/support.svg';
import LogOut from '@/assets/sidebar/log-out.svg';
import JobActive from '@/assets/sidebar/my-job-active.svg';
import JobInactive from '@/assets/sidebar/my-job.svg';
import HistoryActive from '@/assets/sidebar/history-active.svg';
import HistoryInactive from '@/assets/sidebar/history.svg';
import SettingsActive from '@/assets/sidebar/settings-active.svg';
import SettingsInactive from '@/assets/sidebar/settings.svg';
import ProfileActive from '@/assets/sidebar/profile-active.svg';
import ProfileInactive from '@/assets/sidebar/profile.svg';
import PremiumStars from '@/assets/sidebar/premium-starts.svg';
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router';

interface SidebarLayoutProps {
  children: React.ReactNode;
}

const SidebarLayout = ({ children }: SidebarLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Menu items
  const items = [
    {
      title: 'My Jobs',
      url: '/my-jobs',
      icon: JobInactive,
      activeIcon: JobActive,
    },
    {
      title: 'My Profile',
      url: '/profile',
      icon: ProfileInactive,
      activeIcon: ProfileActive,
    },
    {
      title: 'History',
      url: '/history',
      icon: HistoryInactive,
      activeIcon: HistoryActive,
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: SettingsInactive,
      activeIcon: SettingsActive,
    },
  ];

  // Check if current route matches
  const isActiveRoute = (url: string) => {
    return location.pathname === url || location.pathname.startsWith(url + '/');
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Link to="/" className=" py-4 px-1">
            <img className="w-[150px]" alt="logo" src={logo} />
          </Link>
        </SidebarHeader>

        <SidebarContent className=" mx-1">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => {
                  const isActive = isActiveRoute(item.url);
                  return (
                    <SidebarMenuItem
                      className={cn(
                        ' transition-all duration-100 rounded-md',
                        isActive && [
                          'bg-primary text-primary-foreground',
                          'rounded-md border-primary',
                        ]
                      )}
                      key={item.title}
                    >
                      <SidebarMenuButton
                        className={cn(
                          'flex items-center',
                          isActive && 'hover:bg-transparent hover:text-white'
                        )}
                        asChild
                      >
                        <Link to={item.url}>
                          <img
                            className="mr-2 w-6 h-6"
                            alt="Icon"
                            src={isActive ? item.activeIcon : item.icon}
                          />
                          <span className="text-md">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
                <SidebarMenuItem
                  className={cn(
                    'cursor-pointer text-primary rounded-md border-2 mt-8 mx-1 transition-all duration-200',
                    isActiveRoute('/premium')
                      ? 'bg-primary text-white border-primary'
                      : 'border-primary'
                  )}
                >
                  <SidebarMenuButton
                    className={cn(
                      'flex items-center hover:text-primary',
                      isActiveRoute('/premium') &&
                        'hover:bg-transparent hover:text-white'
                    )}
                    asChild
                  >
                    <Link to="/premium">
                      <img className="mr-2" alt="Icon" src={PremiumStars} />
                      <span className="text-md font-medium">
                        Upgrade to premium
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="mx-1 mb-4">
          <SidebarMenu>
            <SidebarMenuItem className={cn('transition-all duration-200')}>
              <SidebarMenuButton className="flex items-center mb-2" asChild>
                <a
                  href="https://support.yourapp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img className="mr-2" alt="Icon" src={Support} />
                  <span className="text-md">Help & Support</span>
                </a>
              </SidebarMenuButton>
              <SidebarMenuButton
                className="cursor-pointer flex items-center"
                onClick={handleLogout}
              >
                <img className="mr-2" alt="Icon" src={LogOut} />
                <span className="text-md">Log out</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset className="px-4 md:px-8">
        <header className="flex h-16 md:h-4 shrink-0 items-center gap-2">
          <SidebarTrigger className="block md:hidden" />
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default SidebarLayout;
