import { Card, Form, Input, Button, Table, Modal, Select, Typography, Row, Col, Statistic, Space } from 'antd';
import { UserAddOutlined, UserOutlined, TeamOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Title, Text } = Typography;
const { Option } = Select;

const SuperAdminDashboard = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<any>(null);

  // Mock data for existing admins
  const [admins, setAdmins] = useState([
    {
      key: '1',
      id: 'ADM-001',
      name: 'John Smith',
      email: 'john.smith@company.com',
      organizations: ['Health Corp', 'MedCenter'],
      status: 'Active',
      createdDate: '2024-01-15',
    },
    {
      key: '2',
      id: 'ADM-002',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      organizations: ['Regional Hospital'],
      status: 'Active',
      createdDate: '2024-01-10',
    },
  ]);

  const handleCreateAdmin = (values: any) => {
    const newAdmin = {
      key: (admins.length + 1).toString(),
      id: `ADM-${String(admins.length + 1).padStart(3, '0')}`,
      name: values.name,
      email: values.email,
      organizations: values.organizations || [],
      status: 'Active',
      createdDate: new Date().toISOString().split('T')[0],
    };
    
    setAdmins([...admins, newAdmin]);
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleEdit = (record: any) => {
    setEditingAdmin(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (id: string) => {
    setAdmins(admins.filter(admin => admin.id !== id));
  };

  const columns = [
    {
      title: 'Admin ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Organizations',
      dataIndex: 'organizations',
      key: 'organizations',
      render: (orgs: string[]) => orgs.join(', '),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <span className={status === 'Active' ? 'text-success' : 'text-warning'}>
          {status}
        </span>
      ),
    },
    {
      title: 'Created Date',
      dataIndex: 'createdDate',
      key: 'createdDate',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record: any) => (
        <Space>
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => handleEdit(record)}
            className="text-primary hover:text-primary-dark"
          />
          <Button 
            type="text" 
            icon={<DeleteOutlined />} 
            danger
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 rounded-lg">
        <Title level={2} className="text-foreground mb-2">SuperAdmin Dashboard</Title>
        <Text type="secondary">Manage administrators and system access</Text>
      </div>

      {/* Key Metrics */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card className="text-center bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
            <Statistic
              title="Total Admins"
              value={admins.length}
              valueStyle={{ color: '#1E90FF' }}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="text-center bg-gradient-to-br from-success/5 to-success/10 border border-success/20">
            <Statistic
              title="Active Admins"
              value={admins.filter(admin => admin.status === 'Active').length}
              valueStyle={{ color: 'hsl(var(--success))' }}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="text-center bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20">
            <Statistic
              title="Organizations"
              value={new Set(admins.flatMap(admin => admin.organizations)).size}
              valueStyle={{ color: 'hsl(var(--accent))' }}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Create Admin Section */}
      <Card 
        title="Admin Management" 
        extra={
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => setIsModalVisible(true)}
            className="bg-primary hover:bg-primary-dark"
          >
            Create New Admin
          </Button>
        }
        className="shadow-lg"
      >
        <Table
          columns={columns}
          dataSource={admins}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 800 }}
        />
      </Card>

      {/* Create/Edit Admin Modal */}
      <Modal
        title={editingAdmin ? "Edit Admin" : "Create New Admin"}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingAdmin(null);
          form.resetFields();
        }}
        footer={null}
        className="top-6"
      >
        <div className="p-4">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleCreateAdmin}
            className="space-y-4"
          >
            <Form.Item
              name="name"
              label="Full Name"
              rules={[{ required: true, message: 'Please enter admin name!' }]}
            >
              <Input 
                prefix={<UserOutlined />} 
                placeholder="Enter full name"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email Address"
              rules={[
                { required: true, message: 'Please enter email!' },
                { type: 'email', message: 'Please enter valid email!' }
              ]}
            >
              <Input 
                placeholder="Enter email address"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="organizations"
              label="Assign Organizations"
            >
              <Select
                mode="multiple"
                placeholder="Select organizations"
                size="large"
              >
                <Option value="Health Corp">Health Corp</Option>
                <Option value="MedCenter">MedCenter</Option>
                <Option value="Regional Hospital">Regional Hospital</Option>
                <Option value="City Clinic">City Clinic</Option>
                <Option value="Metro Medical">Metro Medical</Option>
              </Select>
            </Form.Item>

            <Form.Item className="mb-0">
              <div className="flex justify-end space-x-3 pt-4">
                <Button 
                  onClick={() => {
                    setIsModalVisible(false);
                    setEditingAdmin(null);
                    form.resetFields();
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  type="primary" 
                  htmlType="submit"
                  icon={<UserAddOutlined />}
                  className="bg-primary hover:bg-primary-dark"
                >
                  {editingAdmin ? 'Update Admin' : 'Create Admin'}
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default SuperAdminDashboard;