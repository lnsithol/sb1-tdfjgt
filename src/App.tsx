import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@/providers/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { QueryProvider } from '@/providers/query-provider';
import { AuthProvider } from '@/components/auth-provider';
import { TeamProvider } from '@/context/team-context';
import AppRoutes from '@/routes';

function App() {
  return (
    <QueryProvider>
      <ThemeProvider defaultTheme="system" storageKey="ui-theme">
        <Router>
          <AuthProvider>
            <TeamProvider>
              <AppRoutes />
              <Toaster />
            </TeamProvider>
          </AuthProvider>
        </Router>
      </ThemeProvider>
    </QueryProvider>
  );
}

export default App;