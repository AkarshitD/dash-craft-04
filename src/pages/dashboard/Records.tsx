import { Card, Table, Row, Col, Statistic, Tag, Input, Select, DatePicker, Button } from 'antd';
import { 
  FileTextOutlined, 
  SearchOutlined, 
  DownloadOutlined, 
  EyeOutlined,
  UserOutlined,
  CalendarOutlined 
} from '@ant-design/icons';

const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

const Records = () => {
  const recordsData = [
    {
      key: '1',
      recordId: 'REC-001',
      patientId: 'PAT-001',
      patientName: 'John Doe',
      provider: 'Dr. Johnson',
      recordType: 'Medical Chart',
      category: 'Cardiology',
      createdDate: '2024-01-15',
      lastModified: '2024-01-20',
      status: 'Complete',
      fileSize: '2.4 MB',
      attachments: 3,
    },
    {
      key: '2',
      recordId: 'REC-002',
      patientId: 'PAT-002',
      patientName: 'Jane Smith',
      provider: 'Dr. Davis',
      recordType: 'Lab Results',
      category: 'Laboratory',
      createdDate: '2024-01-14',
      lastModified: '2024-01-14',
      status: 'Pending Review',
      fileSize: '1.8 MB',
      attachments: 2,
    },
    {
      key: '3',
      recordId: 'REC-003',
      patientId: 'PAT-003',
      patientName: 'Mike Wilson',
      provider: 'Dr. Smith',
      recordType: 'Imaging',
      category: 'Radiology',
      createdDate: '2024-01-13',
      lastModified: '2024-01-18',
      status: 'Complete',
      fileSize: '15.6 MB',
      attachments: 5,
    },
    {
      key: '4',
      recordId: 'REC-004',
      patientId: 'PAT-004',
      patientName: 'Sarah Brown',
      provider: 'Dr. Wilson',
      recordType: 'Prescription',
      category: 'Pharmacy',
      createdDate: '2024-01-12',
      lastModified: '2024-01-12',
      status: 'Active',
      fileSize: '0.5 MB',
      attachments: 1,
    },
    {
      key: '5',
      recordId: 'REC-005',
      patientId: 'PAT-005',
      patientName: 'David Miller',
      provider: 'Dr. Johnson',
      recordType: 'Discharge Summary',
      category: 'Administration',
      createdDate: '2024-01-11',
      lastModified: '2024-01-16',
      status: 'Complete',
      fileSize: '3.2 MB',
      attachments: 4,
    },
  ];

  const columns = [
    {
      title: 'Record ID',
      dataIndex: 'recordId',
      key: 'recordId',
      sorter: (a: any, b: any) => a.recordId.localeCompare(b.recordId),
    },
    {
      title: 'Patient',
      dataIndex: 'patientName',
      key: 'patientName',
      sorter: (a: any, b: any) => a.patientName.localeCompare(b.patientName),
      render: (name: string, record: any) => (
        <div>
          <div className="font-medium">{name}</div>
          <div className="text-xs text-muted-foreground">{record.patientId}</div>
        </div>
      ),
    },
    {
      title: 'Provider',
      dataIndex: 'provider',
      key: 'provider',
    },
    {
      title: 'Record Type',
      dataIndex: 'recordType',
      key: 'recordType',
      filters: [
        { text: 'Medical Chart', value: 'Medical Chart' },
        { text: 'Lab Results', value: 'Lab Results' },
        { text: 'Imaging', value: 'Imaging' },
        { text: 'Prescription', value: 'Prescription' },
        { text: 'Discharge Summary', value: 'Discharge Summary' },
      ],
      onFilter: (value: any, record: any) => record.recordType === value,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => {
        const colors: { [key: string]: string } = {
          'Cardiology': 'blue',
          'Laboratory': 'green',
          'Radiology': 'purple',
          'Pharmacy': 'orange',
          'Administration': 'cyan',
        };
        return <Tag color={colors[category]}>{category}</Tag>;
      },
    },
    {
      title: 'Created Date',
      dataIndex: 'createdDate',
      key: 'createdDate',
      sorter: (a: any, b: any) => new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime(),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colors: { [key: string]: string } = {
          'Complete': 'success',
          'Pending Review': 'warning',
          'Active': 'processing',
        };
        return <Tag color={colors[status]}>{status}</Tag>;
      },
      filters: [
        { text: 'Complete', value: 'Complete' },
        { text: 'Pending Review', value: 'Pending Review' },
        { text: 'Active', value: 'Active' },
      ],
      onFilter: (value: any, record: any) => record.status === value,
    },
    {
      title: 'File Size',
      dataIndex: 'fileSize',
      key: 'fileSize',
      sorter: (a: any, b: any) => {
        const getSize = (size: string) => parseFloat(size.replace(/[^\d.]/g, ''));
        return getSize(a.fileSize) - getSize(b.fileSize);
      },
    },
    {
      title: 'Attachments',
      dataIndex: 'attachments',
      key: 'attachments',
      sorter: (a: any, b: any) => a.attachments - b.attachments,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <div className="space-x-2">
          <Button 
            type="text" 
            icon={<EyeOutlined />} 
            size="small"
            title="View Record"
          />
          <Button 
            type="text" 
            icon={<DownloadOutlined />} 
            size="small"
            title="Download Record"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Records"
              value={12547}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#1E90FF' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Patients"
              value={2834}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#32CD32' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Records This Month"
              value={456}
              prefix={<CalendarOutlined />}
              valueStyle={{ color: '#00CED1' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Pending Review"
              value={23}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#FF6347' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Filter Section */}
      <Card>
        <Row gutter={[16, 16]} className="mb-4">
          <Col xs={24} sm={12} lg={6}>
            <Search
              placeholder="Search records..."
              prefix={<SearchOutlined />}
              allowClear
            />
          </Col>
          <Col xs={24} sm={12} lg={4}>
            <Select
              placeholder="Record Type"
              className="w-full"
              allowClear
            >
              <Option value="medical-chart">Medical Chart</Option>
              <Option value="lab-results">Lab Results</Option>
              <Option value="imaging">Imaging</Option>
              <Option value="prescription">Prescription</Option>
              <Option value="discharge">Discharge Summary</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} lg={4}>
            <Select
              placeholder="Category"
              className="w-full"
              allowClear
            >
              <Option value="cardiology">Cardiology</Option>
              <Option value="laboratory">Laboratory</Option>
              <Option value="radiology">Radiology</Option>
              <Option value="pharmacy">Pharmacy</Option>
              <Option value="administration">Administration</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} lg={4}>
            <Select
              placeholder="Status"
              className="w-full"
              allowClear
            >
              <Option value="complete">Complete</Option>
              <Option value="pending">Pending Review</Option>
              <Option value="active">Active</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <RangePicker className="w-full" />
          </Col>
        </Row>

        {/* Records Table */}
        <Table
          columns={columns}
          dataSource={recordsData}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} records`,
          }}
          scroll={{ x: 1400 }}
        />
      </Card>

      {/* Record Statistics */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Records by Category">
            <div className="space-y-3">
              {[
                { category: 'Medical Charts', count: 4523, color: '#1E90FF' },
                { category: 'Lab Results', count: 3245, color: '#32CD32' },
                { category: 'Imaging', count: 2156, color: '#9932CC' },
                { category: 'Prescriptions', count: 1876, color: '#FF8C00' },
                { category: 'Other Documents', count: 747, color: '#00CED1' },
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="font-medium">{item.category}</span>
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded"
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{item.count.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Storage Usage">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span>Used Storage</span>
                  <span>2.4 TB / 5.0 TB</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full" 
                    style={{ width: '48%' }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Images</div>
                  <div className="font-medium">1.6 TB</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Documents</div>
                  <div className="font-medium">0.8 TB</div>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Records;