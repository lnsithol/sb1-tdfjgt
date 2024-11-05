import { Outlet } from 'react-router-dom';
import { Search } from '@/components/search';
import { UserNav } from '@/components/user-nav';
import { MainNav } from '@/components/main-nav';
import { TeamSwitcher } from '@/components/team-switcher';
import { ThemeToggle } from '@/components/theme-toggle';

export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-background">
        <div className="flex h-16 items-center px-4">
          <TeamSwitcher />
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <Search />
            <ThemeToggle />
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Outlet />
      </div>
    </div>
  );
}