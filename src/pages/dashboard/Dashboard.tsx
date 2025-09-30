import { Card, Row, Col, Statistic, Select } from 'antd';
import { DollarOutlined, UserOutlined, FileTextOutlined, RiseOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { Line, Column } from '@ant-design/charts';
import { useRole } from '@/contexts/RoleContext';
import { useState, useEffect } from 'react';
import SuperAdminLanding from '../super-admin-landing';
import AdminLanding from '../admin-landing';

const { Option } = Select;

const Dashboard = () => {
  const { currentUser } = useRole();
  const [selectedOrg, setSelectedOrg] = useState<string>('');

  useEffect(() => {
    if (currentUser.role === 'User' && !selectedOrg) {
      setSelectedOrg('Health Corp');
    }
  }, [currentUser, selectedOrg]);

  if (currentUser.role === 'SuperAdmin') {
    return <SuperAdminLanding />;
  }

  if (currentUser.role === 'Admin') {
    return <AdminLanding />;
  }

  const providerData = [
    { provider: 'Dr. Smith', patients: 45 },
    { provider: 'Dr. Johnson', patients: 38 },
    { provider: 'Dr. Williams', patients: 42 },
    { provider: 'Dr. Brown', patients: 35 },
    { provider: 'Dr. Davis', patients: 40 },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {selectedOrg || 'Dashboard Overview'}
            </h2>
            <p className="text-muted-foreground">Welcome back! Here's what's happening with your healthcare analytics.</p>
          </div>
          {currentUser.role === 'User' && (
            <Select
              value={selectedOrg}
              onChange={setSelectedOrg}
              style={{ width: 200 }}
              size="large"
            >
              <Option value="Health Corp">Health Corp</Option>
              <Option value="MedCenter">MedCenter</Option>
              <Option value="Regional Hospital">Regional Hospital</Option>
            </Select>
          )}
        </div>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="text-center bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
            <Statistic
              title="Total Revenue"
              value={342000}
              precision={0}
              valueStyle={{ color: '#1E90FF' }}
              prefix={<DollarOutlined />}
              suffix={
                <span className="text-success text-sm ml-2">
                  <ArrowUpOutlined /> 12.8%
                </span>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="text-center bg-gradient-to-br from-success/5 to-success/10 border border-success/20">
            <Statistic
              title="Active Patients"
              value={1284}
              valueStyle={{ color: '#00CED1' }}
              prefix={<UserOutlined />}
              suffix={
                <span className="text-success text-sm ml-2">
                  <ArrowUpOutlined /> 8.3%
                </span>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="text-center bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20">
            <Statistic
              title="Claims Processed"
              value={856}
              valueStyle={{ color: '#32CD32' }}
              prefix={<FileTextOutlined />}
              suffix={
                <span className="text-destructive text-sm ml-2">
                  <ArrowDownOutlined /> 2.1%
                </span>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="text-center bg-gradient-to-br from-warning/5 to-warning/10 border border-warning/20">
            <Statistic
              title="Revenue Growth"
              value={15.2}
              precision={1}
              suffix="%"
              valueStyle={{ color: '#FF6347' }}
              prefix={<RiseOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Provider Performance">
            <Column
              data={providerData}
              xField="provider"
              yField="patients"
              color="hsl(var(--primary))"
              columnWidthRatio={0.6}
            />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Revenue Trend">
            <Line
              data={[
                { month: 'Jan', revenue: 45000 },
                { month: 'Feb', revenue: 52000 },
                { month: 'Mar', revenue: 48000 },
                { month: 'Apr', revenue: 58000 },
                { month: 'May', revenue: 62000 },
                { month: 'Jun', revenue: 67000 },
              ]}
              xField="month"
              yField="revenue"
              color="hsl(var(--success))"
              smooth
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
