import { Card, Form, Input, Button, Table, Modal, Select, Typography, Row, Col, Statistic, Space, Tabs } from 'antd';
import { UserAddOutlined, UserOutlined, TeamOutlined, PlusOutlined, EditOutlined, DeleteOutlined, BankOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Title, Text } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

const SuperAdminDashboard = () => {
  const [form] = Form.useForm();
  const [orgForm] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isOrgModalVisible, setIsOrgModalVisible] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<any>(null);
  const [editingOrg, setEditingOrg] = useState<any>(null);

  // Mock data for organizations
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
    },
  ]);

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
    };
    
    setOrganizations([...organizations, newOrg]);
    setIsOrgModalVisible(false);
    orgForm.resetFields();
  };

  const handleEditOrganization = (record: any) => {
    setEditingOrg(record);
    orgForm.setFieldsValue(record);
    setIsOrgModalVisible(true);
  };

  const handleDeleteOrganization = (id: string) => {
    setOrganizations(organizations.filter(org => org.id !== id));
  };

  const organizationColumns = [
    {
      title: 'Org ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Organization Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Contact Person',
      dataIndex: 'contactPerson',
      key: 'contactPerson',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
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
      title: 'Users',
      dataIndex: 'userCount',
      key: 'userCount',
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
            className="text-primary hover:text-primary-dark"
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

      {/* Management Tabs */}
      <Card className="shadow-lg">
        <Tabs defaultActiveKey="organizations" size="large">
          <TabPane tab="Organization Management" key="organizations">
            <div className="mb-4 flex justify-between items-center">
              <Title level={4} className="mb-0">Manage Organizations</Title>
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={() => setIsOrgModalVisible(true)}
                className="bg-primary hover:bg-primary-dark"
              >
                Create Organization
              </Button>
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
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={() => setIsModalVisible(true)}
                className="bg-primary hover:bg-primary-dark"
              >
                Create New Admin
              </Button>
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
                {organizations.map(org => (
                  <Option key={org.id} value={org.name}>{org.name}</Option>
                ))}
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

      {/* Create/Edit Organization Modal */}
      <Modal
        title={editingOrg ? "Edit Organization" : "Create New Organization"}
        open={isOrgModalVisible}
        onCancel={() => {
          setIsOrgModalVisible(false);
          setEditingOrg(null);
          orgForm.resetFields();
        }}
        footer={null}
        width={700}
        className="top-6"
      >
        <div className="p-4">
          <Form
            form={orgForm}
            layout="vertical"
            onFinish={handleCreateOrganization}
            className="space-y-4"
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} lg={12}>
                <Form.Item
                  name="name"
                  label="Organization Name"
                  rules={[{ required: true, message: 'Please enter organization name!' }]}
                >
                  <Input 
                    prefix={<BankOutlined />} 
                    placeholder="Enter organization name"
                    size="large"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} lg={12}>
                <Form.Item
                  name="type"
                  label="Organization Type"
                  rules={[{ required: true, message: 'Please select organization type!' }]}
                >
                  <Select
                    placeholder="Select type"
                    size="large"
                  >
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
              <Input.TextArea 
                placeholder="Enter full address"
                rows={2}
                size="large"
              />
            </Form.Item>

            <Row gutter={[16, 16]}>
              <Col xs={24} lg={12}>
                <Form.Item
                  name="contactPerson"
                  label="Contact Person"
                  rules={[{ required: true, message: 'Please enter contact person!' }]}
                >
                  <Input 
                    prefix={<UserOutlined />} 
                    placeholder="Enter contact person name"
                    size="large"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} lg={12}>
                <Form.Item
                  name="phone"
                  label="Phone Number"
                  rules={[{ required: true, message: 'Please enter phone number!' }]}
                >
                  <Input 
                    placeholder="Enter phone number"
                    size="large"
                  />
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
              <Input 
                placeholder="Enter email address"
                size="large"
              />
            </Form.Item>

            <Form.Item className="mb-0">
              <div className="flex justify-end space-x-3 pt-4">
                <Button 
                  onClick={() => {
                    setIsOrgModalVisible(false);
                    setEditingOrg(null);
                    orgForm.resetFields();
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  type="primary" 
                  htmlType="submit"
                  icon={<BankOutlined />}
                  className="bg-primary hover:bg-primary-dark"
                >
                  {editingOrg ? 'Update Organization' : 'Create Organization'}
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