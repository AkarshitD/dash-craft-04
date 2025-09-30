import { Card, Form, Input, Button, Table, Modal, Select, Typography, Space, Tag } from 'antd';
import { UserAddOutlined, EditOutlined, DeleteOutlined, DownloadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useRole } from '@/contexts/RoleContext';
import * as XLSX from 'xlsx';

const { Title } = Typography;
const { Option } = Select;

const UserManagement = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const { currentUser } = useRole();
  const isSuperAdmin = currentUser.role === 'SuperAdmin';

  const [users, setUsers] = useState([
    {
      key: '1',
      id: 'USR-001',
      name: 'Dr. John Smith',
      email: 'john.smith@health.com',
      role: 'User',
      organization: 'Health Corp',
      status: 'Active',
      createdDate: '2024-01-15',
    },
    {
      key: '2',
      id: 'USR-002',
      name: 'Sarah Johnson',
      email: 'sarah@health.com',
      role: 'Admin',
      organization: 'Health Corp',
      status: 'Active',
      createdDate: '2024-01-10',
    },
  ]);

  const handleCreateUser = (values: any) => {
    const newUser = {
      key: (users.length + 1).toString(),
      id: `USR-${String(users.length + 1).padStart(3, '0')}`,
      name: values.name,
      email: values.email,
      role: values.role,
      organization: values.organization,
      status: 'Active',
      createdDate: new Date().toISOString().split('T')[0],
    };
    
    setUsers([...users, newUser]);
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleEdit = (record: any) => {
    setEditingUser(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (id: string) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(users);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
    XLSX.writeFile(workbook, 'users.xlsx');
  };

  const columns = [
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
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => (
        <Tag color={role === 'Admin' ? 'blue' : 'green'}>{role}</Tag>
      ),
    },
    {
      title: 'Organization',
      dataIndex: 'organization',
      key: 'organization',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'Active' ? 'success' : 'warning'}>{status}</Tag>
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
      render: (_: any, record: any) => (
        <Space>
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => handleEdit(record)}
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
      <Card className="shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <Title level={3} className="mb-0">User Management</Title>
          <Space>
            <Button 
              icon={<DownloadOutlined />}
              onClick={exportToExcel}
            >
              Export to Excel
            </Button>
            <Button 
              type="primary" 
              icon={<UserAddOutlined />}
              onClick={() => {
                setEditingUser(null);
                form.resetFields();
                setIsModalVisible(true);
              }}
            >
              Create New User
            </Button>
          </Space>
        </div>
        <Table
          columns={columns}
          dataSource={users}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 1000 }}
        />
      </Card>

      <Modal
        title={editingUser ? "Edit User" : "Create New User"}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingUser(null);
          form.resetFields();
        }}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreateUser}
          className="mt-4"
        >
          <Form.Item
            name="name"
            label="Full Name"
            rules={[{ required: true, message: 'Please enter name!' }]}
          >
            <Input placeholder="Enter full name" size="large" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email Address"
            rules={[
              { required: true, message: 'Please enter email!' },
              { type: 'email', message: 'Please enter valid email!' }
            ]}
          >
            <Input placeholder="Enter email address" size="large" />
          </Form.Item>

          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: 'Please select role!' }]}
          >
            <Select placeholder="Select role" size="large">
              {isSuperAdmin && <Option value="Admin">Admin</Option>}
              <Option value="User">User</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="organization"
            label="Organization"
            rules={[{ required: true, message: 'Please select organization!' }]}
          >
            <Select placeholder="Select organization" size="large">
              <Option value="Health Corp">Health Corp</Option>
              <Option value="MedCenter">MedCenter</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: !editingUser, message: 'Please enter password!' }]}
          >
            <Input.Password placeholder="Enter password" size="large" />
          </Form.Item>

          <Form.Item className="mb-0">
            <div className="flex justify-end space-x-3 pt-4">
              <Button 
                onClick={() => {
                  setIsModalVisible(false);
                  setEditingUser(null);
                  form.resetFields();
                }}
              >
                Cancel
              </Button>
              <Button 
                type="primary" 
                htmlType="submit"
                icon={<UserAddOutlined />}
              >
                {editingUser ? 'Update User' : 'Create User'}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;
