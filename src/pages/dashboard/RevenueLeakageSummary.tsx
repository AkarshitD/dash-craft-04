import { Card, Table, Row, Col, Statistic, Tag, Progress, Alert } from 'antd';
import { 
  ExclamationCircleOutlined, 
  DollarOutlined, 
  FallOutlined, 
  AlertOutlined 
} from '@ant-design/icons';
import { Column, Pie } from '@ant-design/charts';

const RevenueLeakageSummary = () => {
  const leakageData = [
    {
      key: '1',
      category: 'Coding Errors',
      lostRevenue: 45000,
      cases: 23,
      impact: 'High',
      trend: 'Increasing',
      recommendation: 'Staff training required',
    },
    {
      key: '2',
      category: 'Missing Documentation',
      lostRevenue: 32000,
      cases: 18,
      impact: 'Medium',
      trend: 'Stable',
      recommendation: 'Documentation audit',
    },
    {
      key: '3',
      category: 'Denied Claims',
      lostRevenue: 28000,
      cases: 15,
      impact: 'Medium',
      trend: 'Decreasing',
      recommendation: 'Review denial patterns',
    },
    {
      key: '4',
      category: 'Undercoding',
      lostRevenue: 38000,
      cases: 21,
      impact: 'High',
      trend: 'Increasing',
      recommendation: 'Code review process',
    },
    {
      key: '5',
      category: 'Late Submissions',
      lostRevenue: 15000,
      cases: 12,
      impact: 'Low',
      trend: 'Stable',
      recommendation: 'Workflow optimization',
    },
  ];

  const monthlyLeakage = [
    { month: 'Oct', amount: 125000 },
    { month: 'Nov', amount: 138000 },
    { month: 'Dec', amount: 142000 },
    { month: 'Jan', amount: 158000 },
  ];

  const leakageByCategory = [
    { category: 'Coding Errors', amount: 45000 },
    { category: 'Undercoding', amount: 38000 },
    { category: 'Missing Docs', amount: 32000 },
    { category: 'Denied Claims', amount: 28000 },
    { category: 'Late Submissions', amount: 15000 },
  ];

  const columns = [
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      sorter: (a: any, b: any) => a.category.localeCompare(b.category),
    },
    {
      title: 'Lost Revenue',
      dataIndex: 'lostRevenue',
      key: 'lostRevenue',
      render: (amount: number) => `$${amount.toLocaleString()}`,
      sorter: (a: any, b: any) => a.lostRevenue - b.lostRevenue,
    },
    {
      title: 'Cases',
      dataIndex: 'cases',
      key: 'cases',
      sorter: (a: any, b: any) => a.cases - b.cases,
    },
    {
      title: 'Impact',
      dataIndex: 'impact',
      key: 'impact',
      render: (impact: string) => {
        const colors = {
          High: 'error',
          Medium: 'warning',
          Low: 'success',
        };
        return <Tag color={colors[impact as keyof typeof colors]}>{impact}</Tag>;
      },
      filters: [
        { text: 'High', value: 'High' },
        { text: 'Medium', value: 'Medium' },
        { text: 'Low', value: 'Low' },
      ],
      onFilter: (value: any, record: any) => record.impact === value,
    },
    {
      title: 'Trend',
      dataIndex: 'trend',
      key: 'trend',
      render: (trend: string) => {
        const colors = {
          Increasing: 'error',
          Stable: 'warning',
          Decreasing: 'success',
        };
        return <Tag color={colors[trend as keyof typeof colors]}>{trend}</Tag>;
      },
    },
    {
      title: 'Recommendation',
      dataIndex: 'recommendation',
      key: 'recommendation',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Alert */}
      <Alert
        message="Revenue Leakage Alert"
        description="Total revenue leakage has increased by 12% this month. Immediate attention required for coding errors and undercoding issues."
        type="warning"
        icon={<ExclamationCircleOutlined />}
        showIcon
        closable
      />

      {/* Summary Cards */}
      {/* <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Revenue Leakage"
              value={158000}
              prefix={<FallOutlined />}
              valueStyle={{ color: '#ff4d4f' }}
              formatter={(value) => `$${value?.toLocaleString()}`}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="High Impact Cases"
              value={44}
              prefix={<AlertOutlined />}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Recovery Potential"
              value={125000}
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#52c41a' }}
              formatter={(value) => `$${value?.toLocaleString()}`}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Leakage Rate"
              value={8.2}
              suffix="%"
              prefix={<ExclamationCircleOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
      </Row> */}

      {/* Progress Indicators */}
      {/* <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Recovery Progress by Category">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span>Coding Errors</span>
                  <span className="text-destructive">$45k</span>
                </div>
                <Progress percent={75} strokeColor="#ff4d4f" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Undercoding</span>
                  <span className="text-destructive">$38k</span>
                </div>
                <Progress percent={60} strokeColor="#ff4d4f" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Missing Documentation</span>
                  <span className="text-warning">$32k</span>
                </div>
                <Progress percent={45} strokeColor="#faad14" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Denied Claims</span>
                  <span className="text-warning">$28k</span>
                </div>
                <Progress percent={30} strokeColor="#faad14" />
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Leakage Distribution">
            <Pie
              data={leakageByCategory}
              angleField="amount"
              colorField="category"
              radius={0.8}
              label={{
                type: 'outer',
                content: '{name}\n${value}',
              }}
              interactions={[{ type: 'element-active' }]}
            />
          </Card>
        </Col>
      </Row> */}

      {/* Monthly Trend */}
      {/* <Row>
        <Col span={24}>
          <Card title="Monthly Revenue Leakage Trend">
            <Column
              data={monthlyLeakage}
              xField="month"
              yField="amount"
              color="#ff4d4f"
              columnWidthRatio={0.6}
              label={{
                visible: true,
                position: 'top',
                formatter: (v: any) => `$${v.amount?.toLocaleString()}`,
              }}
            />
          </Card>
        </Col>
      </Row> */}

      {/* Leakage Details Table */}
      <Card title="Revenue Leakage Analysis">
        <Table
          columns={columns}
          dataSource={leakageData}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} leakage categories`,
          }}
          scroll={{ x: 1000 }}
        />
      </Card>
    </div>
  );
};

export default RevenueLeakageSummary;