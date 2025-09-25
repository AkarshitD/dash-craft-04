import { Card, Table, Row, Col, Statistic, Tag, Select } from 'antd';
import { UserOutlined, DollarOutlined, FileTextOutlined, StarOutlined } from '@ant-design/icons';
import { Column, Line } from '@ant-design/charts';

const { Option } = Select;

const ProviderSummary = () => {
  const providerData = [
    {
      key: '1',
      id: 'PRV-001',
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      patients: 245,
      revenue: 125000,
      claims: 189,
      rating: 4.8,
      status: 'Active',
    },
    {
      key: '2',
      id: 'PRV-002',
      name: 'Dr. Michael Smith',
      specialty: 'Orthopedics',
      patients: 198,
      revenue: 98000,
      claims: 156,
      rating: 4.6,
      status: 'Active',
    },
    {
      key: '3',
      id: 'PRV-003',
      name: 'Dr. Emily Davis',
      specialty: 'Pediatrics',
      patients: 312,
      revenue: 87000,
      claims: 298,
      rating: 4.9,
      status: 'Active',
    },
    {
      key: '4',
      id: 'PRV-004',
      name: 'Dr. James Wilson',
      specialty: 'Neurology',
      patients: 156,
      revenue: 145000,
      claims: 134,
      rating: 4.7,
      status: 'Inactive',
    },
  ];

  const performanceData = [
    { provider: 'Dr. Johnson', revenue: 125000 },
    { provider: 'Dr. Smith', revenue: 98000 },
    { provider: 'Dr. Davis', revenue: 87000 },
    { provider: 'Dr. Wilson', revenue: 145000 },
  ];

  const columns = [
    {
      title: 'Provider ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a: any, b: any) => a.id.localeCompare(b.id),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    },
    {
      title: 'Specialty',
      dataIndex: 'specialty',
      key: 'specialty',
      filters: [
        { text: 'Cardiology', value: 'Cardiology' },
        { text: 'Orthopedics', value: 'Orthopedics' },
        { text: 'Pediatrics', value: 'Pediatrics' },
        { text: 'Neurology', value: 'Neurology' },
      ],
      onFilter: (value: any, record: any) => record.specialty === value,
    },
    {
      title: 'Patients',
      dataIndex: 'patients',
      key: 'patients',
      sorter: (a: any, b: any) => a.patients - b.patients,
    },
    {
      title: 'Revenue',
      dataIndex: 'revenue',
      key: 'revenue',
      render: (revenue: number) => `$${revenue.toLocaleString()}`,
      sorter: (a: any, b: any) => a.revenue - b.revenue,
    },
    {
      title: 'Claims',
      dataIndex: 'claims',
      key: 'claims',
      sorter: (a: any, b: any) => a.claims - b.claims,
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating: number) => (
        <span>
          <StarOutlined className="text-warning mr-1" />
          {rating}
        </span>
      ),
      sorter: (a: any, b: any) => a.rating - b.rating,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'Active' ? 'success' : 'default'}>
          {status}
        </Tag>
      ),
      filters: [
        { text: 'Active', value: 'Active' },
        { text: 'Inactive', value: 'Inactive' },
      ],
      onFilter: (value: any, record: any) => record.status === value,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="text-center bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
            <Statistic
              title="Total Providers"
              value={42}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1E90FF' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="text-center bg-gradient-to-br from-success/5 to-success/10 border border-success/20">
            <Statistic
              title="Active Providers"
              value={38}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#32CD32' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="text-center bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20">
            <Statistic
              title="Total Patients"
              value={1245}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#00CED1' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="text-center bg-gradient-to-br from-warning/5 to-warning/10 border border-warning/20">
            <Statistic
              title="Total Revenue"
              value={455000}
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#FF6347' }}
              formatter={(value) => `$${value?.toLocaleString()}`}
            />
          </Card>
        </Col>
      </Row>

      {/* Charts */}
      {/* <Row gutter={[16, 16]}>
        <Col xs={24} lg={24}>
          <Card title="Provider Revenue Performance">
            <Column
              data={performanceData}
              xField="provider"
              yField="revenue"
              color="#1E90FF"
              columnWidthRatio={0.6}
              label={{
                visible: true,
                position: 'top',
                formatter: (v: any) => `$${v.revenue?.toLocaleString()}`,
              }}
            />
          </Card>
        </Col>
      </Row> */}

      {/* Filters */}
      <Card>
        <div className="mb-4">
          <Row gutter={16}>
            <Col xs={24} sm={8}>
              <Select
                placeholder="Filter by Specialty"
                className="w-full"
                allowClear
              >
                <Option value="cardiology">Cardiology</Option>
                <Option value="orthopedics">Orthopedics</Option>
                <Option value="pediatrics">Pediatrics</Option>
                <Option value="neurology">Neurology</Option>
              </Select>
            </Col>
            <Col xs={24} sm={8}>
              <Select
                placeholder="Filter by Status"
                className="w-full"
                allowClear
              >
                <Option value="active">Active</Option>
                <Option value="inactive">Inactive</Option>
              </Select>
            </Col>
          </Row>
        </div>

        {/* Provider Table */}
        <Table
          columns={columns}
          dataSource={providerData}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} providers`,
          }}
          scroll={{ x: 1000 }}
        />
      </Card>
    </div>
  );
};

export default ProviderSummary;