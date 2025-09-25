import { Card, Table, Row, Col, Statistic, Tag, Progress, Tabs } from 'antd';
import { DollarOutlined, ClockCircleOutlined, PercentageOutlined, FileTextOutlined } from '@ant-design/icons';
import { Column, Line } from '@ant-design/charts';

const { TabPane } = Tabs;

const Payers = () => {
  const payerData = [
    {
      key: '1',
      payerId: 'PAY-001',
      name: 'Medicare',
      type: 'Government',
      totalClaims: 245,
      paidClaims: 220,
      deniedClaims: 15,
      pendingClaims: 10,
      totalAmount: 125000,
      paidAmount: 112000,
      avgProcessingDays: 14,
      reimbursementRate: 89.6,
      status: 'Active',
    },
    {
      key: '2',
      payerId: 'PAY-002',
      name: 'Blue Cross Blue Shield',
      type: 'Commercial',
      totalClaims: 198,
      paidClaims: 185,
      deniedClaims: 8,
      pendingClaims: 5,
      totalAmount: 98000,
      paidAmount: 91000,
      avgProcessingDays: 18,
      reimbursementRate: 92.9,
      status: 'Active',
    },
    {
      key: '3',
      payerId: 'PAY-003',
      name: 'Aetna',
      type: 'Commercial',
      totalClaims: 156,
      paidClaims: 142,
      deniedClaims: 12,
      pendingClaims: 2,
      totalAmount: 87000,
      paidAmount: 79000,
      avgProcessingDays: 16,
      reimbursementRate: 90.8,
      status: 'Active',
    },
    {
      key: '4',
      payerId: 'PAY-004',
      name: 'Medicaid',
      type: 'Government',
      totalClaims: 134,
      paidClaims: 115,
      deniedClaims: 18,
      pendingClaims: 1,
      totalAmount: 65000,
      paidAmount: 55000,
      avgProcessingDays: 22,
      reimbursementRate: 84.6,
      status: 'Active',
    },
  ];

  const performanceTrend = [
    { month: 'Oct', medicare: 88, blueCross: 91, aetna: 89, medicaid: 83 },
    { month: 'Nov', medicare: 89, blueCross: 92, aetna: 90, medicaid: 84 },
    { month: 'Dec', medicare: 90, blueCross: 93, aetna: 91, medicaid: 85 },
    { month: 'Jan', medicare: 90, blueCross: 93, aetna: 91, medicaid: 85 },
  ];

  const processingTimeData = [
    { payer: 'Medicare', days: 14 },
    { payer: 'Blue Cross', days: 18 },
    { payer: 'Aetna', days: 16 },
    { payer: 'Medicaid', days: 22 },
  ];

  const columns = [
    {
      title: 'Payer Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <Tag color={type === 'Government' ? 'blue' : 'green'}>{type}</Tag>
      ),
      filters: [
        { text: 'Government', value: 'Government' },
        { text: 'Commercial', value: 'Commercial' },
      ],
      onFilter: (value: any, record: any) => record.type === value,
    },
    {
      title: 'Total Claims',
      dataIndex: 'totalClaims',
      key: 'totalClaims',
      sorter: (a: any, b: any) => a.totalClaims - b.totalClaims,
    },
    {
      title: 'Paid Claims',
      dataIndex: 'paidClaims',
      key: 'paidClaims',
      sorter: (a: any, b: any) => a.paidClaims - b.paidClaims,
    },
    {
      title: 'Denied Claims',
      dataIndex: 'deniedClaims',
      key: 'deniedClaims',
      render: (denied: number) => (
        <span className={denied > 15 ? 'text-destructive' : 'text-muted-foreground'}>
          {denied}
        </span>
      ),
      sorter: (a: any, b: any) => a.deniedClaims - b.deniedClaims,
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (amount: number) => `$${amount.toLocaleString()}`,
      sorter: (a: any, b: any) => a.totalAmount - b.totalAmount,
    },
    {
      title: 'Reimbursement Rate',
      dataIndex: 'reimbursementRate',
      key: 'reimbursementRate',
      render: (rate: number) => (
        <span className={rate < 85 ? 'text-destructive' : rate < 90 ? 'text-warning' : 'text-success'}>
          {rate.toFixed(1)}%
        </span>
      ),
      sorter: (a: any, b: any) => a.reimbursementRate - b.reimbursementRate,
    },
    {
      title: 'Avg Processing',
      dataIndex: 'avgProcessingDays',
      key: 'avgProcessingDays',
      render: (days: number) => `${days} days`,
      sorter: (a: any, b: any) => a.avgProcessingDays - b.avgProcessingDays,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="text-center bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
            <Statistic
              title="Total Payers"
              value={24}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#1E90FF' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="text-center bg-gradient-to-br from-success/5 to-success/10 border border-success/20">
            <Statistic
              title="Active Payers"
              value={22}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#32CD32' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="text-center bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20">
            <Statistic
              title="Avg Reimbursement Rate"
              value={89.2}
              suffix="%"
              prefix={<PercentageOutlined />}
              valueStyle={{ color: '#00CED1' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="text-center bg-gradient-to-br from-warning/5 to-warning/10 border border-warning/20">
            <Statistic
              title="Avg Processing Time"
              value={17.5}
              suffix="days"
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#FF6347' }}
            />
          </Card>
        </Col>
      </Row>
   <Card title="Payer Details">
            <Table
              columns={columns}
              dataSource={payerData}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} payers`,
              }}
              scroll={{ x: 1200 }}
            />
          </Card>
      {/* <Tabs defaultActiveKey="overview">
        <TabPane tab="Overview" key="overview"> */}
          {/* Performance Charts */}
          {/* <Row gutter={[16, 16]} className="mb-6">
            <Col xs={24} lg={12}>
              <Card title="Processing Time by Payer">
                <Column
                  data={processingTimeData}
                  xField="payer"
                  yField="days"
                  color="#1E90FF"
                  columnWidthRatio={0.6}
                  label={{
                    visible: true,
                    position: 'top',
                    formatter: (v: any) => `${v.days} days`,
                  }}
                />
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card title="Payer Performance Indicators">
                <div className="space-y-4">
                  {payerData.map((payer, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{payer.name}</span>
                        <span className="text-success">
                          {payer.reimbursementRate.toFixed(1)}%
                        </span>
                      </div>
                      <Progress 
                        percent={payer.reimbursementRate} 
                        strokeColor={
                          payer.reimbursementRate >= 90 ? '#52c41a' :
                          payer.reimbursementRate >= 85 ? '#faad14' : '#ff4d4f'
                        }
                      />
                    </div>
                  ))}
                </div>
              </Card>
            </Col>
          </Row> */}

          {/* Payer Table */}
       
        {/* </TabPane> */}
{/* 
        <TabPane tab="Performance Trends" key="trends">
          <Card title="Monthly Reimbursement Rate Trends">
            <Line
              data={performanceTrend.flatMap(item => [
                { month: item.month, payer: 'Medicare', rate: item.medicare },
                { month: item.month, payer: 'Blue Cross', rate: item.blueCross },
                { month: item.month, payer: 'Aetna', rate: item.aetna },
                { month: item.month, payer: 'Medicaid', rate: item.medicaid },
              ])}
              xField="month"
              yField="rate"
              seriesField="payer"
              color={['#1E90FF', '#32CD32', '#00CED1', '#FF6347']}
              smooth
              point={{ size: 4 }}
            />
          </Card>
        </TabPane> */}

        {/* <TabPane tab="Analytics" key="analytics">
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card title="Claim Volume by Payer">
                <Column
                  data={payerData}
                  xField="name"
                  yField="totalClaims"
                  color="#32CD32"
                  columnWidthRatio={0.6}
                />
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card title="Revenue by Payer">
                <Column
                  data={payerData}
                  xField="name"
                  yField="totalAmount"
                  color="#1E90FF"
                  columnWidthRatio={0.6}
                  label={{
                    visible: true,
                    position: 'top',
                    formatter: (v: any) => `$${(v.totalAmount / 1000).toFixed(0)}k`,
                  }}
                />
              </Card>
            </Col>
          </Row>
        </TabPane> */}
      {/* </Tabs> */}
    </div>
  );
};

export default Payers;