import { Card, Table, Row, Col, Statistic, Tag, DatePicker, Select, Input, Button } from 'antd';
import { 
  DollarOutlined, 
  SearchOutlined,
  DownloadOutlined,
  FilterOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined 
} from '@ant-design/icons';
import { Line, Column } from '@ant-design/charts';

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Search } = Input;

const TransactionHistory = () => {
  const transactionData = [
    {
      key: '1',
      transactionId: 'TXN-001',
      patientName: 'John Doe',
      patientId: 'PAT-001',
      provider: 'Dr. Johnson',
      payer: 'Medicare',
      serviceDate: '2024-01-15',
      submissionDate: '2024-01-16',
      amount: 2500,
      paidAmount: 2200,
      status: 'Paid',
      paymentMethod: 'ACH',
      paymentDate: '2024-01-25',
      category: 'Consultation',
    },
    {
      key: '2',
      transactionId: 'TXN-002',
      patientName: 'Jane Smith',
      patientId: 'PAT-002',
      provider: 'Dr. Davis',
      payer: 'Blue Cross',
      serviceDate: '2024-01-14',
      submissionDate: '2024-01-15',
      amount: 1800,
      paidAmount: 0,
      status: 'Pending',
      paymentMethod: 'Check',
      paymentDate: null,
      category: 'Lab Work',
    },
    {
      key: '3',
      transactionId: 'TXN-003',
      patientName: 'Mike Wilson',
      patientId: 'PAT-003',
      provider: 'Dr. Smith',
      payer: 'Aetna',
      serviceDate: '2024-01-13',
      submissionDate: '2024-01-14',
      amount: 3200,
      paidAmount: 2900,
      status: 'Paid',
      paymentMethod: 'ACH',
      paymentDate: '2024-01-20',
      category: 'Surgery',
    },
    {
      key: '4',
      transactionId: 'TXN-004',
      patientName: 'Sarah Brown',
      patientId: 'PAT-004',
      provider: 'Dr. Wilson',
      payer: 'Medicaid',
      serviceDate: '2024-01-12',
      submissionDate: '2024-01-13',
      amount: 1200,
      paidAmount: 0,
      status: 'Rejected',
      paymentMethod: null,
      paymentDate: null,
      category: 'Imaging',
    },
    {
      key: '5',
      transactionId: 'TXN-005',
      patientName: 'David Miller',
      patientId: 'PAT-005',
      provider: 'Dr. Johnson',
      payer: 'Medicare',
      serviceDate: '2024-01-11',
      submissionDate: '2024-01-12',
      amount: 950,
      paidAmount: 850,
      status: 'Paid',
      paymentMethod: 'ACH',
      paymentDate: '2024-01-18',
      category: 'Follow-up',
    },
  ];

  const dailyTransactions = [
    { date: '2024-01-15', amount: 8500, count: 12 },
    { date: '2024-01-16', amount: 12300, count: 18 },
    { date: '2024-01-17', amount: 9800, count: 15 },
    { date: '2024-01-18', amount: 15600, count: 22 },
    { date: '2024-01-19', amount: 11200, count: 16 },
    { date: '2024-01-20', amount: 13400, count: 19 },
  ];

  const categoryData = [
    { category: 'Consultation', amount: 45000 },
    { category: 'Surgery', amount: 89000 },
    { category: 'Lab Work', amount: 23000 },
    { category: 'Imaging', amount: 34000 },
    { category: 'Follow-up', amount: 18000 },
  ];

  const columns = [
    {
      title: 'Transaction ID',
      dataIndex: 'transactionId',
      key: 'transactionId',
      sorter: (a: any, b: any) => a.transactionId.localeCompare(b.transactionId),
    },
    {
      title: 'Patient',
      dataIndex: 'patientName',
      key: 'patientName',
      render: (name: string, record: any) => (
        <div>
          <div className="font-medium">{name}</div>
          <div className="text-xs text-muted-foreground">{record.patientId}</div>
        </div>
      ),
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
      title: 'Service Date',
      dataIndex: 'serviceDate',
      key: 'serviceDate',
      sorter: (a: any, b: any) => new Date(a.serviceDate).getTime() - new Date(b.serviceDate).getTime(),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `$${amount.toLocaleString()}`,
      sorter: (a: any, b: any) => a.amount - b.amount,
    },
    {
      title: 'Paid Amount',
      dataIndex: 'paidAmount',
      key: 'paidAmount',
      render: (amount: number) => amount > 0 ? `$${amount.toLocaleString()}` : '-',
      sorter: (a: any, b: any) => a.paidAmount - b.paidAmount,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusConfig = {
          'Paid': { icon: <CheckCircleOutlined />, color: 'success' },
          'Pending': { icon: <ClockCircleOutlined />, color: 'warning' },
          'Rejected': { icon: <ExclamationCircleOutlined />, color: 'error' },
        };
        const config = statusConfig[status as keyof typeof statusConfig];
        return <Tag color={config.color} icon={config.icon}>{status}</Tag>;
      },
      filters: [
        { text: 'Paid', value: 'Paid' },
        { text: 'Pending', value: 'Pending' },
        { text: 'Rejected', value: 'Rejected' },
      ],
      onFilter: (value: any, record: any) => record.status === value,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      filters: [
        { text: 'Consultation', value: 'Consultation' },
        { text: 'Surgery', value: 'Surgery' },
        { text: 'Lab Work', value: 'Lab Work' },
        { text: 'Imaging', value: 'Imaging' },
        { text: 'Follow-up', value: 'Follow-up' },
      ],
      onFilter: (value: any, record: any) => record.category === value,
    },
    {
      title: 'Payment Date',
      dataIndex: 'paymentDate',
      key: 'paymentDate',
      render: (date: string | null) => date || '-',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="text-center bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
            <Statistic
              title="Total Transactions"
              value={1847}
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#1E90FF' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="text-center bg-gradient-to-br from-success/5 to-success/10 border border-success/20">
            <Statistic
              title="Total Amount"
              value={2450000}
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#32CD32' }}
              formatter={(value) => `$${value?.toLocaleString()}`}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="text-center bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20">
            <Statistic
              title="Paid Transactions"
              value={1654}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#00CED1' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="text-center bg-gradient-to-br from-warning/5 to-warning/10 border border-warning/20">
            <Statistic
              title="Pending Amount"
              value={156000}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#FF6347' }}
              formatter={(value) => `$${value?.toLocaleString()}`}
            />
          </Card>
        </Col>
      </Row>

      {/* Charts */}
      {/* <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title="Daily Transaction Volume">
            <Line
              data={dailyTransactions}
              xField="date"
              yField="amount"
              color="#1E90FF"
              smooth
              point={{ size: 4 }}
              label={{
                visible: true,
                position: 'top',
                formatter: (v: any) => `$${(v.amount / 1000).toFixed(0)}k`,
              }}
            />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Revenue by Category">
            <Column
              data={categoryData}
              xField="category"
              yField="amount"
              color="#32CD32"
              columnWidthRatio={0.8}
              label={{
                visible: true,
                position: 'top',
                formatter: (v: any) => `$${(v.amount / 1000).toFixed(0)}k`,
              }}
            />
          </Card>
        </Col>
      </Row> */}

      {/* Filters and Table */}
      <Card>
        <div className="mb-4">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={8}>
              <Search
                placeholder="Search transactions..."
                prefix={<SearchOutlined />}
                allowClear
              />
            </Col>
            <Col xs={24} sm={6}>
              <Select
                placeholder="Filter by Status"
                className="w-full"
                allowClear
              >
                <Option value="paid">Paid</Option>
                <Option value="pending">Pending</Option>
                <Option value="rejected">Rejected</Option>
              </Select>
            </Col>
            <Col xs={24} sm={6}>
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
            <Col xs={24} sm={4}>
              <Button 
                type="primary" 
                icon={<DownloadOutlined />}
                className="w-full"
              >
                Export
              </Button>
            </Col>
          </Row>
          <Row gutter={16} className="mt-4">
            <Col xs={24} sm={8}>
              <RangePicker className="w-full" />
            </Col>
            <Col xs={24} sm={6}>
              <Select
                placeholder="Filter by Category"
                className="w-full"
                allowClear
              >
                <Option value="consultation">Consultation</Option>
                <Option value="surgery">Surgery</Option>
                <Option value="labwork">Lab Work</Option>
                <Option value="imaging">Imaging</Option>
                <Option value="followup">Follow-up</Option>
              </Select>
            </Col>
            <Col xs={24} sm={6}>
              <Select
                placeholder="Amount Range"
                className="w-full"
                allowClear
              >
                <Option value="0-500">$0 - $500</Option>
                <Option value="500-1000">$500 - $1,000</Option>
                <Option value="1000-5000">$1,000 - $5,000</Option>
                <Option value="5000+">$5,000+</Option>
              </Select>
            </Col>
            <Col xs={24} sm={4}>
              <Button 
                icon={<FilterOutlined />}
                className="w-full"
              >
                Advanced
              </Button>
            </Col>
          </Row>
        </div>

        <Table
          columns={columns}
          dataSource={transactionData}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} transactions`,
          }}
          scroll={{ x: 1400 }}
        />
      </Card>
    </div>
  );
};

export default TransactionHistory;