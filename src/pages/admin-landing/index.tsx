import { Card, Table, Button, Row, Col, Statistic } from 'antd';
import { UserOutlined, ArrowLeftOutlined, DownloadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Line, Column } from '@ant-design/charts';
import * as XLSX from 'xlsx';

const AdminLanding = () => {
  const [selectedOrg, setSelectedOrg] = useState<any>(null);

  const organizations = [
    {
      key: '1',
      id: 'ORG-001',
      name: 'Health Corp - Dept A',
      totalUsers: 25,
      activeUsers: 23,
    },
    {
      key: '2',
      id: 'ORG-002',
      name: 'Health Corp - Dept B',
      totalUsers: 20,
      activeUsers: 18,
    },
  ];

  const users = [
    { key: '1', name: 'Dr. Mike Wilson', email: 'mike@health.com', role: 'User', status: 'Active' },
    { key: '2', name: 'Dr. Lisa Chen', email: 'lisa@health.com', role: 'User', status: 'Active' },
  ];

  const lineData = [
    { month: 'Jan', users: 20 },
    { month: 'Feb', users: 22 },
    { month: 'Mar', users: 25 },
  ];

  const columnData = [
    { category: 'Active', count: 23 },
    { category: 'Inactive', count: 2 },
  ];

  const exportToExcel = (data: any[], filename: string) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
    XLSX.writeFile(workbook, `${filename}.xlsx`);
  };

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
            <Col xs={24} sm={12}>
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
                <Statistic
                  title="Total Users"
                  value={selectedOrg.totalUsers}
                  prefix={<UserOutlined />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12}>
              <Card className="bg-gradient-to-br from-success/10 to-success/5">
                <Statistic
                  title="Active Users"
                  value={selectedOrg.activeUsers}
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
            title="Users"
            extra={
              <Button 
                icon={<DownloadOutlined />}
                onClick={() => exportToExcel(users, 'users')}
              >
                Export
              </Button>
            }
          >
            <Table
              dataSource={users}
              columns={[
                { title: 'Name', dataIndex: 'name', key: 'name' },
                { title: 'Email', dataIndex: 'email', key: 'email' },
                { title: 'Role', dataIndex: 'role', key: 'role' },
                { title: 'Status', dataIndex: 'status', key: 'status' },
              ]}
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-2xl font-bold mb-6">User Overview</h2>
        
        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} sm={8}>
            <Card className="text-center bg-gradient-to-br from-primary/10 to-primary/5">
              <Statistic
                title="Total Organizations"
                value={organizations.length}
                prefix={<UserOutlined />}
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
          <Col xs={24} sm={8}>
            <Card className="text-center bg-gradient-to-br from-accent/10 to-accent/5">
              <Statistic
                title="Active Users"
                value={organizations.reduce((sum, org) => sum + org.activeUsers, 0)}
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
            columns={[
              { title: 'Organization ID', dataIndex: 'id', key: 'id' },
              { title: 'Name', dataIndex: 'name', key: 'name' },
              { title: 'Total Users', dataIndex: 'totalUsers', key: 'totalUsers' },
              { title: 'Active Users', dataIndex: 'activeUsers', key: 'activeUsers' },
              {
                title: 'Actions',
                key: 'actions',
                render: (_: any, record: any) => (
                  <Button type="link" onClick={() => setSelectedOrg(record)}>
                    View Details
                  </Button>
                ),
              },
            ]}
            dataSource={organizations}
            pagination={{ pageSize: 10 }}
          />
        </Card>
      </Card>
    </div>
  );
};

export default AdminLanding;
