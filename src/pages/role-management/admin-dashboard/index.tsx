import { Card, Form, Input, Button, Table, Modal, Select, Typography, Row, Col, Statistic, Space, Tabs, Switch } from 'antd';
import { UserAddOutlined, UserOutlined, TeamOutlined, PlusOutlined, EditOutlined, DeleteOutlined, BankOutlined, UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Title, Text } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

const AdminDashboard = () => {
  const [userForm] = Form.useForm();
  const [assignForm] = Form.useForm();
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  const [isAssignModalVisible, setIsAssignModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);

  // Mock data for users
  const [users, setUsers] = useState([
    {
      key: '1',
      id: 'USR-001',
      name: 'Alice Brown',
      email: 'alice.brown@healthcare.com',
      organization: 'Health Corp',
      role: 'Analyst',
      status: 'Active',
      hasUploadAccess: true,
      createdDate: '2024-01-20',
    },
    {
      key: '2',
      id: 'USR-002',
      name: 'Bob Wilson',
      email: 'bob.wilson@healthcare.com',
      organization: 'MedCenter',
      role: 'Manager',
      status: 'Active',
      hasUploadAccess: false,
      createdDate: '2024-01-18',
    },
  ]);

  // Mock organizations
  const organizations = [
    { id: 'org-1', name: 'Health Corp', users: 15, type: 'Hospital' },
    { id: 'org-2', name: 'MedCenter', users: 12, type: 'Clinic' },
    { id: 'org-3', name: 'Regional Hospital', users: 28, type: 'Hospital' },
    { id: 'org-4', name: 'City Clinic', users: 8, type: 'Clinic' },
  ];

  const handleCreateUser = (values: any) => {
    const newUser = {
      key: (users.length + 1).toString(),
      id: `USR-${String(users.length + 1).padStart(3, '0')}`,
      name: values.name,
      email: values.email,
      organization: values.organization,
      role: values.role,
      status: 'Active',
      hasUploadAccess: false, // Default to no upload access
      createdDate: new Date().toISOString().split('T')[0],
    };
    
    setUsers([...users, newUser]);
    setIsUserModalVisible(false);
    userForm.resetFields();
  };

  const handleAssignUser = (values: any) => {
    const updatedUsers = users.map(user => 
      user.id === values.userId 
        ? { ...user, organization: values.organization }
        : user
    );
    setUsers(updatedUsers);
    setIsAssignModalVisible(false);
    assignForm.resetFields();
  };

  const handleEditUser = (record: any) => {
    setEditingUser(record);
    userForm.setFieldsValue(record);
    setIsUserModalVisible(true);
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleToggleUploadAccess = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, hasUploadAccess: !user.hasUploadAccess }
        : user
    ));
  };

  const userColumns = [
    {
      title: 'User ID',
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
      title: 'Organization',
      dataIndex: 'organization',
      key: 'organization',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
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
      title: 'Upload Access',
      dataIndex: 'hasUploadAccess',
      key: 'hasUploadAccess',
      render: (hasAccess: boolean, record: any) => (
        <div className="flex items-center space-x-2">
          <Switch
            checked={hasAccess}
            onChange={() => handleToggleUploadAccess(record.id)}
            size="small"
          />
          <span className={hasAccess ? 'text-success' : 'text-muted-foreground'}>
            {hasAccess ? 'Enabled' : 'Disabled'}
          </span>
        </div>
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
            onClick={() => handleEditUser(record)}
            className="text-primary hover:text-primary-dark"
          />
          <Button 
            type="text" 
            icon={<DeleteOutlined />} 
            danger
            onClick={() => handleDeleteUser(record.id)}
          />
        </Space>
      ),
    },
  ];

  const organizationColumns = [
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
      title: 'Total Users',
      dataIndex: 'users',
      key: 'users',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record: any) => (
        <Button 
          type="primary" 
          size="small"
          onClick={() => setIsAssignModalVisible(true)}
          className="bg-accent hover:bg-accent-dark text-white"
        >
          Assign Users
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-accent/10 to-primary/10 p-6 rounded-lg">
        <Title level={2} className="text-foreground mb-2">Admin Dashboard</Title>
        <Text type="secondary">Manage users and organization assignments</Text>
      </div>

      {/* Key Metrics */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={6}>
          <Card className="text-center bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
            <Statistic
              title="Total Users"
              value={users.length}
              valueStyle={{ color: '#1E90FF' }}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card className="text-center bg-gradient-to-br from-success/5 to-success/10 border border-success/20">
            <Statistic
              title="Active Users"
              value={users.filter(user => user.status === 'Active').length}
              valueStyle={{ color: 'hsl(var(--success))' }}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card className="text-center bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20">
            <Statistic
              title="Organizations"
              value={organizations.length}
              valueStyle={{ color: 'hsl(var(--accent))' }}
              prefix={<BankOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card className="text-center bg-gradient-to-br from-warning/5 to-warning/10 border border-warning/20">
            <Statistic
              title="Avg Users/Org"
              value={Math.round(users.length / organizations.length)}
              valueStyle={{ color: 'hsl(var(--warning))' }}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Management Tabs */}
      <Card className="shadow-lg">
        <Tabs defaultActiveKey="users" size="large">
          <TabPane tab="User Management" key="users">
            <div className="mb-4 flex justify-between items-center">
              <Title level={4} className="mb-0">User Management</Title>
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={() => setIsUserModalVisible(true)}
                className="bg-primary hover:bg-primary-dark"
              >
                Create New User
              </Button>
            </div>
            <Table
              columns={userColumns}
              dataSource={users}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 800 }}
            />
          </TabPane>
          
          <TabPane tab="File Upload Permissions" key="permissions">
            <div className="mb-4">
              <Title level={4} className="mb-2">File Upload Access Control</Title>
              <Text type="secondary">Grant or revoke file upload permissions for users</Text>
            </div>
            
            <Card className="mb-4 bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10">
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={8}>
                  <Statistic
                    title="Users with Upload Access"
                    value={users.filter(user => user.hasUploadAccess).length}
                    suffix={`/ ${users.length}`}
                    valueStyle={{ color: 'hsl(var(--primary))' }}
                    prefix={<UploadOutlined />}
                  />
                </Col>
                <Col xs={24} sm={8}>
                  <Statistic
                    title="Access Granted Today"
                    value={2}
                    valueStyle={{ color: 'hsl(var(--success))' }}
                    prefix={<UserAddOutlined />}
                  />
                </Col>
                <Col xs={24} sm={8}>
                  <Statistic
                    title="Pending Requests"
                    value={1}
                    valueStyle={{ color: 'hsl(var(--warning))' }}
                    prefix={<TeamOutlined />}
                  />
                </Col>
              </Row>
            </Card>

            <Table
              columns={userColumns}
              dataSource={users}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 1000 }}
            />
          </TabPane>

          <TabPane tab="Organization Assignment" key="organizations">
            <div className="mb-4">
              <Title level={4} className="mb-2">Organization Management</Title>
              <Text type="secondary">Manage user assignments to organizations</Text>
            </div>
            <Table
              columns={organizationColumns}
              dataSource={organizations}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 600 }}
            />
          </TabPane>
        </Tabs>
      </Card>

      {/* Create/Edit User Modal */}
      <Modal
        title={editingUser ? "Edit User" : "Create New User"}
        open={isUserModalVisible}
        onCancel={() => {
          setIsUserModalVisible(false);
          setEditingUser(null);
          userForm.resetFields();
        }}
        footer={null}
        className="top-6"
      >
        <div className="p-4">
          <Form
            form={userForm}
            layout="vertical"
            onFinish={handleCreateUser}
            className="space-y-4"
          >
            <Form.Item
              name="name"
              label="Full Name"
              rules={[{ required: true, message: 'Please enter user name!' }]}
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
              name="organization"
              label="Organization"
              rules={[{ required: true, message: 'Please select organization!' }]}
            >
              <Select
                placeholder="Select organization"
                size="large"
              >
                {organizations.map(org => (
                  <Option key={org.id} value={org.name}>{org.name}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="role"
              label="Role"
              rules={[{ required: true, message: 'Please select role!' }]}
            >
              <Select
                placeholder="Select user role"
                size="large"
              >
                <Option value="Analyst">Analyst</Option>
                <Option value="Manager">Manager</Option>
                <Option value="Coordinator">Coordinator</Option>
                <Option value="Specialist">Specialist</Option>
              </Select>
            </Form.Item>

            <Form.Item className="mb-0">
              <div className="flex justify-end space-x-3 pt-4">
                <Button 
                  onClick={() => {
                    setIsUserModalVisible(false);
                    setEditingUser(null);
                    userForm.resetFields();
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
                  {editingUser ? 'Update User' : 'Create User'}
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </Modal>

      {/* Assign User Modal */}
      <Modal
        title="Assign User to Organization"
        open={isAssignModalVisible}
        onCancel={() => {
          setIsAssignModalVisible(false);
          assignForm.resetFields();
        }}
        footer={null}
      >
        <div className="p-4">
          <Form
            form={assignForm}
            layout="vertical"
            onFinish={handleAssignUser}
            className="space-y-4"
          >
            <Form.Item
              name="userId"
              label="Select User"
              rules={[{ required: true, message: 'Please select user!' }]}
            >
              <Select
                placeholder="Select user to assign"
                size="large"
              >
                {users.map(user => (
                  <Option key={user.id} value={user.id}>
                    {user.name} ({user.email})
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="organization"
              label="Assign to Organization"
              rules={[{ required: true, message: 'Please select organization!' }]}
            >
              <Select
                placeholder="Select organization"
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
                    setIsAssignModalVisible(false);
                    assignForm.resetFields();
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  type="primary" 
                  htmlType="submit"
                  icon={<TeamOutlined />}
                  className="bg-accent hover:bg-accent-dark text-white"
                >
                  Assign User
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default AdminDashboard;