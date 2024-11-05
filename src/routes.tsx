import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Dashboard } from '@/pages/dashboard';
import { Billing } from '@/pages/billing';
import { Settings } from '@/pages/settings';
import { Team } from '@/pages/team';
import { Jobs } from '@/pages/jobs';
import { Login } from '@/pages/login';
import { Register } from '@/pages/register';
import { Profile } from '@/pages/profile';
import { KeyboardShortcuts } from '@/pages/keyboard-shortcuts';
import { Support } from '@/pages/support';
import { WorkspaceSettings } from '@/pages/workspace-settings';
import { ForgotPassword } from '@/pages/forgot-password';
import { ResetPassword } from '@/pages/reset-password';
import { VerifyEmail } from '@/pages/verify-email';
import { VerifyEmailNotice } from '@/pages/verify-email-notice';
import { ProtectedRoute } from '@/components/protected-route';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={
          <ProtectedRoute requireAuth={false}>
            <Login />
          </ProtectedRoute>
        }
      />
      <Route
        path="/register"
        element={
          <ProtectedRoute requireAuth={false}>
            <Register />
          </ProtectedRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <ProtectedRoute requireAuth={false}>
            <ForgotPassword />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reset-password"
        element={
          <ProtectedRoute requireAuth={false}>
            <ResetPassword />
          </ProtectedRoute>
        }
      />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route
        path="/verify-email-notice"
        element={
          <ProtectedRoute requireAuth={true} requireVerified={false}>
            <VerifyEmailNotice />
          </ProtectedRoute>
        }
      />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute requireAuth={true} requireVerified={true}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="billing" element={<Billing />} />
        <Route path="settings" element={<Settings />} />
        <Route path="team" element={<Team />} />
        <Route path="workspace-settings" element={<WorkspaceSettings />} />
        <Route path="profile" element={<Profile />} />
        <Route path="keyboard-shortcuts" element={<KeyboardShortcuts />} />
        <Route path="support" element={<Support />} />
      </Route>

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}