import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConfigProvider } from 'antd';
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import OrganizationSelection from "./pages/OrganizationSelection";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import ProviderSummary from "./pages/dashboard/ProviderSummary";
import ReimbursementSummary from "./pages/dashboard/ReimbursementSummary";
import RevenueLeakageSummary from "./pages/dashboard/RevenueLeakageSummary";
import Payers from "./pages/dashboard/Payers";
import Records from "./pages/dashboard/Records";
import UploadFiles from "./pages/dashboard/UploadFiles";
import TransactionHistory from "./pages/dashboard/TransactionHistory";
import Profile from "./pages/dashboard/Profile";
import NotFound from "./pages/NotFound";
import SuperAdminDashboard from "./pages/role-management/SuperAdminDashboard";
import AdminDashboard from "./pages/role-management/AdminDashboard";

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
  <QueryClientProvider client={queryClient}>
    <ConfigProvider theme={antdTheme}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Authentication routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/organization-selection" element={<OrganizationSelection />} />
            
            {/* Dashboard routes */}
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
              
              {/* Role Management routes */}
              <Route path="super-admin" element={<SuperAdminDashboard />} />
              <Route path="admin-management" element={<AdminDashboard />} />
            </Route>
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ConfigProvider>
  </QueryClientProvider>
);

export default App;