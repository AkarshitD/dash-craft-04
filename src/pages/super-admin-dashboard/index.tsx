import { Card, Typography, Row, Col, Statistic, Table, Button, Space, Tabs, Modal, Form, Input, Select, message } from 'antd';
import { 
  BankOutlined, 
  TeamOutlined, 
  UserOutlined, 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined,
  ExportOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import { useState } from 'react';

const { Title, Text } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

const SuperAdminDashboard = () => {
  const [orgForm] = Form.useForm();
  const [adminForm] = Form.useForm();
  const [isOrgModalVisible, setIsOrgModalVisible] = useState(false);
  const [isAdminModalVisible, setIsAdminModalVisible] = useState(false);
  const [editingOrg, setEditingOrg] = useState<any>(null);
  const [editingAdmin, setEditingAdmin] = useState<any>(null);

  // Mock organizations data
  const [organizations, setOrganizations] = useState([
    {
      key: '1',
      id: 'ORG-001',
      name: 'Health Corp',
      type: 'Hospital',
      address: '123 Medical Way, Health City, HC 12345',
      contactPerson: 'Dr. Michael Smith',
      phone: '+1 (555) 123-4567',
      email: 'contact@healthcorp.com',
      status: 'Active',
      createdDate: '2024-01-10',
      userCount: 15,
      revenue: '$2.4M',
    },
    {
      key: '2',
      id: 'ORG-002',
      name: 'MedCenter',
      type: 'Clinic',
      address: '456 Care Avenue, Med City, MC 67890',
      contactPerson: 'Dr. Sarah Johnson',
      phone: '+1 (555) 987-6543',
      email: 'info@medcenter.com',
      status: 'Active',
      createdDate: '2024-01-08',
      userCount: 12,
      revenue: '$1.8M',
    },
    {
      key: '3',
      id: 'ORG-003',
      name: 'Regional Hospital',
      type: 'Hospital',
      address: '789 Health Street, Care City, CC 54321',
      contactPerson: 'Dr. Robert Wilson',
      phone: '+1 (555) 456-7890',
      email: 'contact@regionalhospital.com',
      status: 'Active',
      createdDate: '2024-01-05',
      userCount: 25,
      revenue: '$3.2M',
    },
  ]);

  // Mock admins data
  const [admins, setAdmins] = useState([
    {
      key: '1',
      id: 'ADM-001',
      name: 'John Smith',
      email: 'john.smith@healthcorp.com',
      organization: 'Health Corp',
      status: 'Active',
      lastLogin: '2024-01-20',
      createdDate: '2024-01-15',
    },
    {
      key: '2',
      id: 'ADM-002',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@medcenter.com',
      organization: 'MedCenter',
      status: 'Active',
      lastLogin: '2024-01-19',
      createdDate: '2024-01-10',
    },
    {
      key: '3',
      id: 'ADM-003',
      name: 'Robert Wilson',
      email: 'robert.wilson@regional.com',
      organization: 'Regional Hospital',
      status: 'Active',
      lastLogin: '2024-01-18',
      createdDate: '2024-01-08',
    },
  ]);

  const handleCreateOrganization = (values: any) => {
    const newOrg = {
      key: (organizations.length + 1).toString(),
      id: `ORG-${String(organizations.length + 1).padStart(3, '0')}`,
      name: values.name,
      type: values.type,
      address: values.address,
      contactPerson: values.contactPerson,
      phone: values.phone,
      email: values.email,
      status: 'Active',
      createdDate: new Date().toISOString().split('T')[0],
      userCount: 0,
      revenue: '$0',
    };
    
    if (editingOrg) {
      setOrganizations(organizations.map(org => org.key === editingOrg.key ? { ...org, ...values } : org));
      message.success('Organization updated successfully');
    } else {
      setOrganizations([...organizations, newOrg]);
      message.success('Organization created successfully');
    }
    
    setIsOrgModalVisible(false);
    setEditingOrg(null);
    orgForm.resetFields();
  };

  const handleCreateAdmin = (values: any) => {
    const newAdmin = {
      key: (admins.length + 1).toString(),
      id: `ADM-${String(admins.length + 1).padStart(3, '0')}`,
      name: values.name,
      email: values.email,
      organization: values.organization,
      status: 'Active',
      lastLogin: 'Never',
      createdDate: new Date().toISOString().split('T')[0],
    };
    
    if (editingAdmin) {
      setAdmins(admins.map(admin => admin.key === editingAdmin.key ? { ...admin, ...values } : admin));
      message.success('Admin updated successfully');
    } else {
      setAdmins([...admins, newAdmin]);
      message.success('Admin created successfully');
    }
    
    setIsAdminModalVisible(false);
    setEditingAdmin(null);
    adminForm.resetFields();
  };

  const handleEditOrganization = (record: any) => {
    setEditingOrg(record);
    orgForm.setFieldsValue(record);
    setIsOrgModalVisible(true);
  };

  const handleEditAdmin = (record: any) => {
    setEditingAdmin(record);
    adminForm.setFieldsValue(record);
    setIsAdminModalVisible(true);
  };

  const handleDeleteOrganization = (id: string) => {
    setOrganizations(organizations.filter(org => org.id !== id));
    message.success('Organization deleted successfully');
  };

  const handleDeleteAdmin = (id: string) => {
    setAdmins(admins.filter(admin => admin.id !== id));
    message.success('Admin deleted successfully');
  };

  const handleResetPassword = (record: any) => {
    message.success(`Password reset email sent to ${record.email}`);
  };

  const handleExportData = (type: string) => {
    message.success(`${type} data exported successfully`);
  };

  const organizationColumns = [
    { title: 'Org ID', dataIndex: 'id', key: 'id' },
    { title: 'Organization Name', dataIndex: 'name', key: 'name' },
    { title: 'Type', dataIndex: 'type', key: 'type' },
    { title: 'Users', dataIndex: 'userCount', key: 'userCount' },
    { title: 'Revenue', dataIndex: 'revenue', key: 'revenue' },
    { 
      title: 'Status', 
      dataIndex: 'status', 
      key: 'status',
      render: (status: string) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {status}
        </span>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record: any) => (
        <Space>
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => handleEditOrganization(record)}
            className="text-blue-600 hover:text-blue-800"
          />
          <Button 
            type="text" 
            icon={<DeleteOutlined />} 
            danger
            onClick={() => handleDeleteOrganization(record.id)}
          />
        </Space>
      ),
    },
  ];

  const adminColumns = [
    { title: 'Admin ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Organization', dataIndex: 'organization', key: 'organization' },
    { title: 'Last Login', dataIndex: 'lastLogin', key: 'lastLogin' },
    { 
      title: 'Status', 
      dataIndex: 'status', 
      key: 'status',
      render: (status: string) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {status}
        </span>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record: any) => (
        <Space>
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => handleEditAdmin(record)}
            className="text-blue-600 hover:text-blue-800"
          />
          <Button 
            type="text" 
            icon={<ReloadOutlined />} 
            onClick={() => handleResetPassword(record)}
            className="text-orange-600 hover:text-orange-800"
          />
          <Button 
            type="text" 
            icon={<DeleteOutlined />} 
            danger
            onClick={() => handleDeleteAdmin(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border">
        <Title level={2} className="text-gray-800 mb-2">Super Admin Dashboard</Title>
        <Text type="secondary">Manage all organizations and administrators</Text>
      </div>

      {/* Key Metrics */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card className="text-center bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
            <Statistic
              title="Total Organizations"
              value={organizations.length}
              valueStyle={{ color: '#1E90FF' }}
              prefix={<BankOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="text-center bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
            <Statistic
              title="Total Admins"
              value={admins.length}
              valueStyle={{ color: '#10B981' }}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="text-center bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
            <Statistic
              title="Total Users"
              value={organizations.reduce((sum, org) => sum + org.userCount, 0)}
              valueStyle={{ color: '#8B5CF6' }}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Management Tabs */}
      <Card className="shadow-lg">
        <Tabs defaultActiveKey="organizations" size="large">
          <TabPane tab="Organization Management" key="organizations">
            <div className="mb-4 flex justify-between items-center">
              <Title level={4} className="mb-0">Manage Organizations</Title>
              <Space>
                <Button 
                  icon={<ExportOutlined />}
                  onClick={() => handleExportData('Organizations')}
                >
                  Export
                </Button>
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />}
                  onClick={() => setIsOrgModalVisible(true)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Create Organization
                </Button>
              </Space>
            </div>
            <Table
              columns={organizationColumns}
              dataSource={organizations}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 1000 }}
            />
          </TabPane>

          <TabPane tab="Admin Management" key="admins">
            <div className="mb-4 flex justify-between items-center">
              <Title level={4} className="mb-0">Manage Admins</Title>
              <Space>
                <Button 
                  icon={<ExportOutlined />}
                  onClick={() => handleExportData('Admins')}
                >
                  Export
                </Button>
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />}
                  onClick={() => setIsAdminModalVisible(true)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Create Admin
                </Button>
              </Space>
            </div>
            <Table
              columns={adminColumns}
              dataSource={admins}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 800 }}
            />
          </TabPane>
        </Tabs>
      </Card>

      {/* Organization Modal */}
      <Modal
        title={editingOrg ? "Edit Organization" : "Create Organization"}
        open={isOrgModalVisible}
        onCancel={() => {
          setIsOrgModalVisible(false);
          setEditingOrg(null);
          orgForm.resetFields();
        }}
        footer={null}
        width={700}
      >
        <Form
          form={orgForm}
          layout="vertical"
          onFinish={handleCreateOrganization}
          className="mt-4"
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Form.Item
                name="name"
                label="Organization Name"
                rules={[{ required: true, message: 'Please enter organization name!' }]}
              >
                <Input prefix={<BankOutlined />} placeholder="Enter organization name" />
              </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
              <Form.Item
                name="type"
                label="Organization Type"
                rules={[{ required: true, message: 'Please select organization type!' }]}
              >
                <Select placeholder="Select type">
                  <Option value="Hospital">Hospital</Option>
                  <Option value="Clinic">Clinic</Option>
                  <Option value="Medical Center">Medical Center</Option>
                  <Option value="Healthcare Network">Healthcare Network</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: 'Please enter address!' }]}
          >
            <Input.TextArea placeholder="Enter full address" rows={2} />
          </Form.Item>

          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Form.Item
                name="contactPerson"
                label="Contact Person"
                rules={[{ required: true, message: 'Please enter contact person!' }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Enter contact person name" />
              </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[{ required: true, message: 'Please enter phone number!' }]}
              >
                <Input placeholder="Enter phone number" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="email"
            label="Email Address"
            rules={[
              { required: true, message: 'Please enter email!' },
              { type: 'email', message: 'Please enter valid email!' }
            ]}
          >
            <Input placeholder="Enter email address" />
          </Form.Item>

          <Form.Item className="mb-0 pt-4">
            <div className="flex justify-end space-x-3">
              <Button onClick={() => {
                setIsOrgModalVisible(false);
                setEditingOrg(null);
                orgForm.resetFields();
              }}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" className="bg-blue-600 hover:bg-blue-700">
                {editingOrg ? 'Update Organization' : 'Create Organization'}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>

      {/* Admin Modal */}
      <Modal
        title={editingAdmin ? "Edit Admin" : "Create Admin"}
        open={isAdminModalVisible}
        onCancel={() => {
          setIsAdminModalVisible(false);
          setEditingAdmin(null);
          adminForm.resetFields();
        }}
        footer={null}
      >
        <Form
          form={adminForm}
          layout="vertical"
          onFinish={handleCreateAdmin}
          className="mt-4"
        >
          <Form.Item
            name="name"
            label="Full Name"
            rules={[{ required: true, message: 'Please enter admin name!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Enter full name" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email Address"
            rules={[
              { required: true, message: 'Please enter email!' },
              { type: 'email', message: 'Please enter valid email!' }
            ]}
          >
            <Input placeholder="Enter email address" />
          </Form.Item>

          <Form.Item
            name="organization"
            label="Assign Organization"
            rules={[{ required: true, message: 'Please select organization!' }]}
          >
            <Select placeholder="Select organization" showSearch>
              {organizations.map(org => (
                <Option key={org.id} value={org.name}>{org.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item className="mb-0 pt-4">
            <div className="flex justify-end space-x-3">
              <Button onClick={() => {
                setIsAdminModalVisible(false);
                setEditingAdmin(null);
                adminForm.resetFields();
              }}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" className="bg-blue-600 hover:bg-blue-700">
                {editingAdmin ? 'Update Admin' : 'Create Admin'}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SuperAdminDashboard;