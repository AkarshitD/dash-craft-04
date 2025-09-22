import { Row, Col, Card, Statistic, Progress, Table } from 'antd';
import { 
  ArrowUpOutlined, 
  ArrowDownOutlined, 
  DollarOutlined, 
  UserOutlined, 
  FileTextOutlined, 
  TeamOutlined 
} from '@ant-design/icons';
import { Line, Column, Pie } from '@ant-design/charts';

const Dashboard = () => {
  // Mock data for charts
  const revenueData = [
    { month: 'Jan', revenue: 45000 },
    { month: 'Feb', revenue: 52000 },
    { month: 'Mar', revenue: 48000 },
    { month: 'Apr', revenue: 58000 },
    { month: 'May', revenue: 62000 },
    { month: 'Jun', revenue: 67000 },
  ];

  const payerData = [
    { payer: 'Medicare', amount: 45, color: '#1E90FF' },
    { payer: 'Medicaid', amount: 25, color: '#00CED1' },
    { payer: 'Blue Cross', amount: 20, color: '#32CD32' },
    { pager: 'Aetna', amount: 10, color: '#FF6347' },
  ];

  const providerData = [
    { provider: 'Dr. Smith', patients: 45 },
    { provider: 'Dr. Johnson', patients: 38 },
    { provider: 'Dr. Williams', patients: 42 },
    { provider: 'Dr. Brown', patients: 35 },
    { provider: 'Dr. Davis', patients: 40 },
  ];

  const recentTransactions = [
    {
      key: '1',
      id: 'TXN-001',
      patient: 'John Doe',
      amount: 1250,
      date: '2024-01-15',
      status: 'Completed',
      payer: 'Medicare',
    },
    {
      key: '2',
      id: 'TXN-002',
      patient: 'Jane Smith',
      amount: 890,
      date: '2024-01-14',
      status: 'Pending',
      payer: 'Blue Cross',
    },
    {
      key: '3',
      id: 'TXN-003',
      patient: 'Mike Johnson',
      amount: 2100,
      date: '2024-01-13',
      status: 'Completed',
      payer: 'Aetna',
    },
  ];

  const transactionColumns = [
    {
      title: 'Transaction ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Patient',
      dataIndex: 'patient',
      key: 'patient',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `$${amount.toLocaleString()}`,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Payer',
      dataIndex: 'payer',
      key: 'payer',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <span className={status === 'Completed' ? 'text-success' : 'text-warning'}>
          {status}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
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
          <Card>
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
          <Card>
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
          <Card>
            <Statistic
              title="Active Providers"
              value={42}
              valueStyle={{ color: '#FF6347' }}
              prefix={<TeamOutlined />}
              suffix={
                <span className="text-success text-sm ml-2">
                  <ArrowUpOutlined /> 5.2%
                </span>
              }
            />
          </Card>
        </Col>
      </Row>

      {/* Charts Row */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title="Revenue Trend" className="h-96">
            <Line
              data={revenueData}
              xField="month"
              yField="revenue"
              color="#1E90FF"
              smooth
              point={{ size: 5, shape: 'diamond' }}
            />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Payer Distribution" className="h-96">
            <Pie
              data={payerData}
              angleField="amount"
              colorField="payer"
              radius={0.8}
              label={{
                type: 'outer',
                content: '{name} {percentage}',
              }}
            />
          </Card>
        </Col>
      </Row>

      {/* Performance Metrics */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Provider Performance" className="h-80">
            <Column
              data={providerData}
              xField="provider"
              yField="patients"
              color="#32CD32"
              columnWidthRatio={0.6}
            />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Key Performance Indicators" className="h-80">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span>Claims Approval Rate</span>
                  <span className="font-semibold text-success">94.2%</span>
                </div>
                <Progress percent={94.2} strokeColor="#32CD32" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Revenue Collection</span>
                  <span className="font-semibold text-primary">87.8%</span>
                </div>
                <Progress percent={87.8} strokeColor="#1E90FF" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Patient Satisfaction</span>
                  <span className="font-semibold text-accent">91.5%</span>
                </div>
                <Progress percent={91.5} strokeColor="#00CED1" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Processing Efficiency</span>
                  <span className="font-semibold text-warning">76.3%</span>
                </div>
                <Progress percent={76.3} strokeColor="#F59E0B" />
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Recent Transactions */}
      <Row>
        <Col span={24}>
          <Card title="Recent Transactions">
            <Table
              columns={transactionColumns}
              dataSource={recentTransactions}
              pagination={{ pageSize: 5 }}
              scroll={{ x: 800 }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;