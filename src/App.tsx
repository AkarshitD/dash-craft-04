import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConfigProvider } from 'antd';
import { RoleProvider } from "./contexts/RoleContext";
import Login from "./pages/login";
import ForgotPassword from "./pages/forgot-password";
import DashboardLayout from "./components/dashboard-layout";
import Dashboard from "./pages/dashboard/Dashboard";
import ProviderSummary from "./pages/provider-summary";
import ReimbursementSummary from "./pages/reimbursement-summary";
import RevenueLeakageSummary from "./pages/revenue-leakage-summary";
import Payers from "./pages/payers";
import Records from "./pages/records";
import UploadFiles from "./pages/upload-files";
import TransactionHistory from "./pages/transaction-history";
import Profile from "./pages/profile";
import NotFound from "./pages/not-found";
import SuperAdminManagement from "./pages/role-management/super-admin-dashboard";
import AdminManagement from "./pages/role-management/admin-dashboard";
import UserManagement from "./pages/user-management";
import SuperAdminLanding from "./pages/super-admin-landing";
import AdminLanding from "./pages/admin-landing";
import { Provider } from 'react-redux';
import store from "./redux/store";
const queryClient = new QueryClient();

// Ant Design theme configuration
const antdTheme = {
  token: {
    colorPrimary: '#1E90FF', // Professional blue
    colorSuccess: '#10B981', // Green
    colorWarning: '#F59E0B', // Orange (not yellow)
    colorError: '#EF4444', // Red
    colorInfo: '#0EA5E9', // Light blue
    borderRadius: 8,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
};

const App = () => (
  <Provider store={store}>
  <QueryClientProvider client={queryClient}>
    <RoleProvider>
      <ConfigProvider theme={antdTheme}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            <Route path="/" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="provider-summary" element={<ProviderSummary />} />
              <Route path="reimbursement-summary" element={<ReimbursementSummary />} />
              <Route path="revenue-leakage-summary" element={<RevenueLeakageSummary />} />
              <Route path="payers" element={<Payers />} />
              <Route path="records" element={<Records />} />
              <Route path="upload-files" element={<UploadFiles />} />
              <Route path="transaction-history" element={<TransactionHistory />} />
              <Route path="profile" element={<Profile />} />
              <Route path="super-admin-management" element={<SuperAdminManagement />} />
              <Route path="admin-management" element={<AdminManagement />} />
              <Route path="user-management" element={<UserManagement />} />
              <Route path="super-admin-landing" element={<SuperAdminLanding />} />
              <Route path="admin-landing" element={<AdminLanding />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ConfigProvider>
    </RoleProvider>
  </QueryClientProvider>
  </Provider>
);

export default App;