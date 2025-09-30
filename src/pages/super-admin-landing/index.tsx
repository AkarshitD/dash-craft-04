import { Card, Table, Button, Row, Col, Statistic, Space } from 'antd';
import { BankOutlined, TeamOutlined, UserOutlined, ArrowLeftOutlined, DownloadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Line, Column } from '@ant-design/charts';
import * as XLSX from 'xlsx';

const SuperAdminLanding = () => {
  const [selectedOrg, setSelectedOrg] = useState<any>(null);

  const organizations = [
    {
      key: '1',
      id: 'ORG-001',
      name: 'Health Corp',
      totalAdmins: 5,
      totalUsers: 45,
      status: 'Active',
    },
    {
      key: '2',
      id: 'ORG-002',
      name: 'MedCenter',
      totalAdmins: 3,
      totalUsers: 32,
      status: 'Active',
    },
    {
      key: '3',
      id: 'ORG-003',
      name: 'Regional Hospital',
      totalAdmins: 4,
      totalUsers: 38,
      status: 'Active',
    },
  ];

  const orgDetails = {
    admins: [
      { key: '1', name: 'John Smith', email: 'john@health.com', status: 'Active' },
      { key: '2', name: 'Sarah Johnson', email: 'sarah@health.com', status: 'Active' },
    ],
    users: [
      { key: '1', name: 'Dr. Mike Wilson', email: 'mike@health.com', role: 'User' },
      { key: '2', name: 'Dr. Lisa Chen', email: 'lisa@health.com', role: 'User' },
    ],
  };

  const lineData = [
    { month: 'Jan', users: 30 },
    { month: 'Feb', users: 35 },
    { month: 'Mar', users: 42 },
    { month: 'Apr', users: 45 },
  ];

  const columnData = [
    { category: 'Active', count: 40 },
    { category: 'Inactive', count: 5 },
  ];

  const exportToExcel = (data: any[], filename: string) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
    XLSX.writeFile(workbook, `${filename}.xlsx`);
  };

  const orgColumns = [
    {
      title: 'Organization ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Organization Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Total Admins',
      dataIndex: 'totalAdmins',
      key: 'totalAdmins',
    },
    {
      title: 'Total Users',
      dataIndex: 'totalUsers',
      key: 'totalUsers',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Button type="link" onClick={() => setSelectedOrg(record)}>
          View Details
        </Button>
      ),
    },
  ];

  if (selectedOrg) {
    return (
      <div className="space-y-6">
        <Card>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Button 
                icon={<ArrowLeftOutlined />} 
                onClick={() => setSelectedOrg(null)}
              >
                Back
              </Button>
              <h2 className="text-2xl font-bold mb-0">{selectedOrg.name}</h2>
            </div>
          </div>

          <Row gutter={[16, 16]} className="mb-6">
            <Col xs={24} sm={8}>
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
                <Statistic
                  title="Total Admins"
                  value={selectedOrg.totalAdmins}
                  prefix={<TeamOutlined />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card className="bg-gradient-to-br from-success/10 to-success/5">
                <Statistic
                  title="Total Users"
                  value={selectedOrg.totalUsers}
                  prefix={<UserOutlined />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card className="bg-gradient-to-br from-accent/10 to-accent/5">
                <Statistic
                  title="Active Users"
                  value={40}
                  prefix={<UserOutlined />}
                />
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]} className="mb-6">
            <Col xs={24} lg={12}>
              <Card title="User Growth">
                <Line
                  data={lineData}
                  xField="month"
                  yField="users"
                  smooth
                  color="hsl(var(--primary))"
                />
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card title="User Status">
                <Column
                  data={columnData}
                  xField="category"
                  yField="count"
                  color="hsl(var(--success))"
                />
              </Card>
            </Col>
          </Row>

          <Card 
            title="Admins" 
            extra={
              <Button 
                icon={<DownloadOutlined />}
                onClick={() => exportToExcel(orgDetails.admins, 'admins')}
              >
                Export
              </Button>
            }
            className="mb-4"
          >
            <Table
              dataSource={orgDetails.admins}
              columns={[
                { title: 'Name', dataIndex: 'name', key: 'name' },
                { title: 'Email', dataIndex: 'email', key: 'email' },
                { title: 'Status', dataIndex: 'status', key: 'status' },
              ]}
              pagination={false}
            />
          </Card>

          <Card 
            title="Users"
            extra={
              <Button 
                icon={<DownloadOutlined />}
                onClick={() => exportToExcel(orgDetails.users, 'users')}
              >
                Export
              </Button>
            }
          >
            <Table
              dataSource={orgDetails.users}
              columns={[
                { title: 'Name', dataIndex: 'name', key: 'name' },
                { title: 'Email', dataIndex: 'email', key: 'email' },
                { title: 'Role', dataIndex: 'role', key: 'role' },
              ]}
              pagination={false}
            />
          </Card>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-2xl font-bold mb-6">System Overview</h2>
        
        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} sm={8}>
            <Card className="text-center bg-gradient-to-br from-primary/10 to-primary/5">
              <Statistic
                title="Total Organizations"
                value={organizations.length}
                prefix={<BankOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card className="text-center bg-gradient-to-br from-accent/10 to-accent/5">
              <Statistic
                title="Total Admins"
                value={organizations.reduce((sum, org) => sum + org.totalAdmins, 0)}
                prefix={<TeamOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card className="text-center bg-gradient-to-br from-success/10 to-success/5">
              <Statistic
                title="Total Users"
                value={organizations.reduce((sum, org) => sum + org.totalUsers, 0)}
                prefix={<UserOutlined />}
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} lg={12}>
            <Card title="Organization Growth">
              <Line
                data={lineData}
                xField="month"
                yField="users"
                smooth
                color="hsl(var(--primary))"
              />
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card title="User Distribution">
              <Column
                data={columnData}
                xField="category"
                yField="count"
                color="hsl(var(--success))"
              />
            </Card>
          </Col>
        </Row>

        <Card 
          title="Organizations"
          extra={
            <Button 
              icon={<DownloadOutlined />}
              onClick={() => exportToExcel(organizations, 'organizations')}
            >
              Export to Excel
            </Button>
          }
        >
          <Table
            columns={orgColumns}
            dataSource={organizations}
            pagination={{ pageSize: 10 }}
          />
        </Card>
      </Card>
    </div>
  );
};

export default SuperAdminLanding;
