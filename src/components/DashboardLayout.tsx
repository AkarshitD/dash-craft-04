import { Layout, Menu, Dropdown, Avatar, Badge, Button } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  DollarOutlined,
  FileTextOutlined,
  TeamOutlined,
  FolderOutlined,
  UploadOutlined,
  HistoryOutlined,
  SettingOutlined,
  LogoutOutlined,
  BellOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useRole } from '@/contexts/RoleContext';

const { Header, Sider, Content } = Layout;

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const { hasUploadPermission, canSeeAdminPanel, canSeeSuperAdminPanel, currentUser } = useRole();

  // Build menu items based on role
  const getMenuItems = () => {
    const baseItems = [
      {
        key: '/',
        icon: <DashboardOutlined />,
        label: 'Dashboard',
      },
      {
        key: '/provider-summary',
        icon: <UserOutlined />,
        label: 'Provider Summary',
      },
      {
        key: '/reimbursement-summary',
        icon: <DollarOutlined />,
        label: 'Reimbursement Summary',
      },
      {
        key: '/revenue-leakage-summary',
        icon: <FileTextOutlined />,
        label: 'Revenue-Leakage Summary',
      },
      {
        key: '/payers',
        icon: <TeamOutlined />,
        label: 'Payers',
      },
      {
        key: '/records',
        icon: <FolderOutlined />,
        label: 'Records',
      },
      {
        key: '/transaction-history',
        icon: <HistoryOutlined />,
        label: 'Transaction History',
      },
    ];

    // Add upload files if user has permission
    if (hasUploadPermission()) {
      baseItems.splice(6, 0, {
        key: '/upload-files',
        icon: <UploadOutlined />,
        label: 'Upload Files',
      });
    }

    // Add role management based on permissions
    if (canSeeSuperAdminPanel() || canSeeAdminPanel()) {
      const roleManagementItem: any = {
        key: 'role-management',
        label: 'Role Management',
        icon: <SettingOutlined />,
        children: [],
      };

      if (canSeeSuperAdminPanel()) {
        roleManagementItem.children.push({
          key: '/super-admin',
          icon: <UserOutlined />,
          label: 'SuperAdmin Panel',
        });
      }
      
      if (canSeeAdminPanel()) {
        roleManagementItem.children.push({
          key: '/admin-management',
          icon: <TeamOutlined />,
          label: 'Admin Panel',
        });
      }

      baseItems.push(roleManagementItem);
    }

    return baseItems;
  };

  const menuItems = getMenuItems();

  const profileMenu = (
    <Menu
      items={[
        {
          key: 'profile',
          icon: <UserOutlined />,
          label: 'View Profile',
          onClick: () => navigate('/profile'),
        },
        {
          type: 'divider',
        },
        {
          key: 'logout',
          icon: <LogoutOutlined />,
          label: 'Logout',
          onClick: () => navigate('/login'),
        },
      ]}
    />
  );

  const handleMenuClick = (e: any) => {
    navigate(e.key);
  };

  return (
<Layout className="min-h-screen">
  {/* Sidebar (Fixed) */}
  <Sider
    trigger={null}
    collapsible
    collapsed={collapsed}
    className="bg-card shadow-lg fixed left-0 top-0 h-screen"
    width={250}
  >
    <div className="p-4 border-b border-border">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
          <DashboardOutlined className="text-white text-lg" />
        </div>
        {!collapsed && (
          <div>
            <h2 className="text-lg font-bold text-foreground">HealthAnalytics</h2>
            <p className="text-xs text-muted-foreground">Professional Dashboard</p>
          </div>
        )}
      </div>
    </div>

    <Menu
      mode="inline"
      selectedKeys={[location.pathname]}
      items={menuItems}
      onClick={handleMenuClick}
      className="border-none bg-transparent mt-4"
    />
  </Sider>

  {/* Main Layout */}
  <Layout
    style={{
      marginLeft: collapsed ? 80 : 250, // adjust content margin based on sidebar state
      transition: "margin-left 0.2s ease",
    }}
  >
    {/* Header (Fixed) */}
    <Header
      className="bg-card shadow-sm px-6 flex items-center justify-between fixed top-0 right-0"
      style={{
        height: 64,
        left: collapsed ? 80 : 250, // align with sidebar
        transition: "left 0.2s ease",
        zIndex: 100,
        width: `calc(100% - ${collapsed ? 80 : 250}px)`,
      }}
    >
      <div className="flex items-center space-x-4">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          className="text-lg"
        />
        <div>
          <h1 className="text-xl font-semibold text-foreground mb-0">
            {menuItems.find(item => item.key === location.pathname)?.label || 'Dashboard'}
          </h1>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Dropdown overlay={profileMenu} placement="bottomRight">
          <div className="cursor-pointer flex items-center space-x-3 px-3 py-1 rounded-lg hover:bg-secondary">
            <Avatar
              size="small"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
              icon={<UserOutlined />}
            />
            <div className="text-sm">
              <div className="font-medium text-foreground">{currentUser.name}</div>
              <div className="text-muted-foreground">{currentUser.role}</div>
            </div>
          </div>
        </Dropdown>
      </div>
    </Header>

    {/* Content with padding for fixed header */}
    <Content
      className="p-6 bg-background overflow-y-auto"
      style={{ marginTop: 64 }}
    >
      <Outlet />
    </Content>
  </Layout>
</Layout>


  );
};

export default DashboardLayout;