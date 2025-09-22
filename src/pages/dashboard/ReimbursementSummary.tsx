import { Card, Table, Row, Col, Statistic, Tag, DatePicker, Select } from 'antd';
import { DollarOutlined, ClockCircleOutlined, CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Column, Area } from '@ant-design/charts';

const { RangePicker } = DatePicker;
const { Option } = Select;

const ReimbursementSummary = () => {
  const reimbursementData = [
    {
      key: '1',
      claimId: 'CLM-001',
      patientName: 'John Doe',
      provider: 'Dr. Johnson',
      payer: 'Medicare',
      claimAmount: 2500,
      reimbursedAmount: 2200,
      status: 'Paid',
      submissionDate: '2024-01-10',
      paymentDate: '2024-01-25',
      daysToPay: 15,
    },
    {
      key: '2',
      claimId: 'CLM-002',
      patientName: 'Jane Smith',
      provider: 'Dr. Davis',
      payer: 'Blue Cross',
      claimAmount: 1800,
      reimbursedAmount: 1650,
      status: 'Pending',
      submissionDate: '2024-01-15',
      paymentDate: null,
      daysToPay: null,
    },
    {
      key: '3',
      claimId: 'CLM-003',
      patientName: 'Mike Wilson',
      provider: 'Dr. Smith',
      payer: 'Aetna',
      claimAmount: 3200,
      reimbursedAmount: 2900,
      status: 'Paid',
      submissionDate: '2024-01-08',
      paymentDate: '2024-01-20',
      daysToPay: 12,
    },
    {
      key: '4',
      claimId: 'CLM-004',
      patientName: 'Sarah Brown',
      provider: 'Dr. Wilson',
      payer: 'Medicaid',
      claimAmount: 1200,
      reimbursedAmount: 0,
      status: 'Denied',
      submissionDate: '2024-01-12',
      paymentDate: null,
      daysToPay: null,
    },
  ];

  const monthlyTrend = [
    { month: 'Oct', submitted: 85000, reimbursed: 78000 },
    { month: 'Nov', submitted: 92000, reimbursed: 84000 },
    { month: 'Dec', submitted: 88000, reimbursed: 81000 },
    { month: 'Jan', submitted: 95000, reimbursed: 87000 },
  ];

  const payerPerformance = [
    { payer: 'Medicare', avgDays: 14, reimbursementRate: 88 },
    { payer: 'Blue Cross', avgDays: 18, reimbursementRate: 92 },
    { payer: 'Aetna', avgDays: 16, reimbursementRate: 91 },
    { payer: 'Medicaid', avgDays: 22, reimbursementRate: 85 },
  ];

  const columns = [
    {
      title: 'Claim ID',
      dataIndex: 'claimId',
      key: 'claimId',
      sorter: (a: any, b: any) => a.claimId.localeCompare(b.claimId),
    },
    {
      title: 'Patient',
      dataIndex: 'patientName',
      key: 'patientName',
      sorter: (a: any, b: any) => a.patientName.localeCompare(b.patientName),
    },
    {
      title: 'Provider',
      dataIndex: 'provider',
      key: 'provider',
    },
    {
      title: 'Payer',
      dataIndex: 'payer',
      key: 'payer',
      filters: [
        { text: 'Medicare', value: 'Medicare' },
        { text: 'Blue Cross', value: 'Blue Cross' },
        { text: 'Aetna', value: 'Aetna' },
        { text: 'Medicaid', value: 'Medicaid' },
      ],
      onFilter: (value: any, record: any) => record.payer === value,
    },
    {
      title: 'Claim Amount',
      dataIndex: 'claimAmount',
      key: 'claimAmount',
      render: (amount: number) => `$${amount.toLocaleString()}`,
      sorter: (a: any, b: any) => a.claimAmount - b.claimAmount,
    },
    {
      title: 'Reimbursed',
      dataIndex: 'reimbursedAmount',
      key: 'reimbursedAmount',
      render: (amount: number) => `$${amount.toLocaleString()}`,
      sorter: (a: any, b: any) => a.reimbursedAmount - b.reimbursedAmount,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colors = {
          Paid: 'success',
          Pending: 'warning',
          Denied: 'error',
        };
        return <Tag color={colors[status as keyof typeof colors]}>{status}</Tag>;
      },
      filters: [
        { text: 'Paid', value: 'Paid' },
        { text: 'Pending', value: 'Pending' },
        { text: 'Denied', value: 'Denied' },
      ],
      onFilter: (value: any, record: any) => record.status === value,
    },
    {
      title: 'Days to Pay',
      dataIndex: 'daysToPay',
      key: 'daysToPay',
      render: (days: number | null) => days ? `${days} days` : '-',
      sorter: (a: any, b: any) => (a.daysToPay || 0) - (b.daysToPay || 0),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Claims"
              value={1247}
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#1E90FF' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Reimbursed"
              value={2890000}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#32CD32' }}
              formatter={(value) => `$${value?.toLocaleString()}`}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Avg Processing Time"
              value={16.8}
              suffix="days"
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#00CED1' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Reimbursement Rate"
              value={89.2}
              suffix="%"
              prefix={<ExclamationCircleOutlined />}
              valueStyle={{ color: '#FF6347' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Charts */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title="Monthly Reimbursement Trend">
            <Area
              data={monthlyTrend.flatMap(item => [
                { month: item.month, type: 'Submitted', value: item.submitted },
                { month: item.month, type: 'Reimbursed', value: item.reimbursed },
              ])}
              xField="month"
              yField="value"
              seriesField="type"
            />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Payer Performance">
            <div className="space-y-4">
              {payerPerformance.map((payer, index) => (
                <div key={index} className="border-b pb-3 last:border-b-0">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{payer.payer}</span>
                    <span className="text-success">{payer.reimbursementRate}%</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Avg. processing: {payer.avgDays} days
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      {/* Filters and Table */}
      <Card>
        <div className="mb-4">
          <Row gutter={16}>
            <Col xs={24} sm={8}>
              <RangePicker className="w-full" />
            </Col>
            <Col xs={24} sm={8}>
              <Select
                placeholder="Filter by Payer"
                className="w-full"
                allowClear
              >
                <Option value="medicare">Medicare</Option>
                <Option value="bluecross">Blue Cross</Option>
                <Option value="aetna">Aetna</Option>
                <Option value="medicaid">Medicaid</Option>
              </Select>
            </Col>
            <Col xs={24} sm={8}>
              <Select
                placeholder="Filter by Status"
                className="w-full"
                allowClear
              >
                <Option value="paid">Paid</Option>
                <Option value="pending">Pending</Option>
                <Option value="denied">Denied</Option>
              </Select>
            </Col>
          </Row>
        </div>

        <Table
          columns={columns}
          dataSource={reimbursementData}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} claims`,
          }}
          scroll={{ x: 1200 }}
        />
      </Card>
    </div>
  );
};

export default ReimbursementSummary;