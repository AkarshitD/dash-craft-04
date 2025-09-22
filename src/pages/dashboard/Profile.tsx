import { Card, Form, Input, Button, Avatar, Upload, Row, Col, Tabs, Table, Tag } from 'antd';
import { 
  UserOutlined, 
  MailOutlined, 
  PhoneOutlined, 
  BankOutlined, 
  CameraOutlined,
  KeyOutlined,
  BellOutlined,
  SecurityScanOutlined,
  HistoryOutlined 
} from '@ant-design/icons';
import { useState } from 'react';

const { TabPane } = Tabs;

const Profile = () => {
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();

  const activityData = [
    {
      key: '1',
      action: 'Login',
      timestamp: '2024-01-20 09:15:00',
      ipAddress: '192.168.1.100',
      device: 'Chrome on Windows',
      status: 'Success',
    },
    {
      key: '2',
      action: 'Profile Update',
      timestamp: '2024-01-19 14:30:00',
      ipAddress: '192.168.1.100',
      device: 'Chrome on Windows',
      status: 'Success',
    },
    {
      key: '3',
      action: 'Password Change',
      timestamp: '2024-01-18 11:45:00',
      ipAddress: '192.168.1.100',
      device: 'Chrome on Windows',
      status: 'Success',
    },
    {
      key: '4',
      action: 'Failed Login',
      timestamp: '2024-01-17 16:20:00',
      ipAddress: '10.0.0.50',
      device: 'Safari on iOS',
      status: 'Failed',
    },
  ];

  const activityColumns = [
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
    },
    {
      title: 'IP Address',
      dataIndex: 'ipAddress',
      key: 'ipAddress',
    },
    {
      title: 'Device',
      dataIndex: 'device',
      key: 'device',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'Success' ? 'success' : 'error'}>
          {status}
        </Tag>
      ),
    },
  ];

  const onFinish = (values: any) => {
    console.log('Profile update:', values);
  };

  const onPasswordChange = (values: any) => {
    console.log('Password change:', values);
  };

  const uploadProps = {
    name: 'avatar',
    listType: 'picture-card' as const,
    showUploadList: false,
    beforeUpload: (file: any) => {
      console.log('Upload avatar:', file);
      return false;
    },
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Tabs defaultActiveKey="profile">
        <TabPane tab="Profile Information" key="profile">
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={8}>
              <Card className="text-center">
                <div className="mb-4">
                  <Avatar
                    size={120}
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face"
                    icon={<UserOutlined />}
                  />
                </div>
                <Upload {...uploadProps}>
                  <Button icon={<CameraOutlined />}>
                    Change Avatar
                  </Button>
                </Upload>
                <div className="mt-4 space-y-2">
                  <h3 className="text-lg font-semibold">Dr. Sarah Johnson</h3>
                  <p className="text-muted-foreground">Administrator</p>
                  <p className="text-muted-foreground">Mercy Health System</p>
                </div>
              </Card>
            </Col>

            <Col xs={24} lg={16}>
              <Card title="Personal Information">
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={onFinish}
                  initialValues={{
                    firstName: 'Sarah',
                    lastName: 'Johnson',
                    email: 'sarah.johnson@mercyhealth.com',
                    phone: '+1 (555) 123-4567',
                    organization: 'Mercy Health System',
                    role: 'Administrator',
                    department: 'Healthcare Analytics',
                  }}
                >
                  <Row gutter={[16, 0]}>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="firstName"
                        label="First Name"
                        rules={[{ required: true, message: 'Please input your first name!' }]}
                      >
                        <Input prefix={<UserOutlined />} />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="lastName"
                        label="Last Name"
                        rules={[{ required: true, message: 'Please input your last name!' }]}
                      >
                        <Input prefix={<UserOutlined />} />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    name="email"
                    label="Email Address"
                    rules={[
                      { required: true, message: 'Please input your email!' },
                      { type: 'email', message: 'Please enter a valid email!' }
                    ]}
                  >
                    <Input prefix={<MailOutlined />} />
                  </Form.Item>

                  <Form.Item
                    name="phone"
                    label="Phone Number"
                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                  >
                    <Input prefix={<PhoneOutlined />} />
                  </Form.Item>

                  <Form.Item
                    name="organization"
                    label="Organization"
                    rules={[{ required: true, message: 'Please input your organization!' }]}
                  >
                    <Input prefix={<BankOutlined />} />
                  </Form.Item>

                  <Row gutter={[16, 0]}>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="role"
                        label="Role"
                      >
                        <Input disabled />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="department"
                        label="Department"
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item>
                    <Button type="primary" htmlType="submit" size="large">
                      Update Profile
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="Security" key="security">
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={12}>
              <Card title="Change Password">
                <Form
                  form={passwordForm}
                  layout="vertical"
                  onFinish={onPasswordChange}
                >
                  <Form.Item
                    name="currentPassword"
                    label="Current Password"
                    rules={[{ required: true, message: 'Please input your current password!' }]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item
                    name="newPassword"
                    label="New Password"
                    rules={[
                      { required: true, message: 'Please input your new password!' },
                      { min: 8, message: 'Password must be at least 8 characters!' }
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item
                    name="confirmPassword"
                    label="Confirm New Password"
                    dependencies={['newPassword']}
                    rules={[
                      { required: true, message: 'Please confirm your new password!' },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('newPassword') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('Passwords do not match!'));
                        },
                      }),
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Update Password
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card title="Security Settings">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Two-Factor Authentication</div>
                      <div className="text-sm text-muted-foreground">
                        Add an extra layer of security
                      </div>
                    </div>
                    <Button type="primary" size="small">
                      Enable
                    </Button>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Login Notifications</div>
                      <div className="text-sm text-muted-foreground">
                        Get notified of login attempts
                      </div>
                    </div>
                    <Button size="small">
                      Enabled
                    </Button>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Session Timeout</div>
                      <div className="text-sm text-muted-foreground">
                        Auto logout after inactivity
                      </div>
                    </div>
                    <Button size="small">
                      30 minutes
                    </Button>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="Notifications" key="notifications">
          <Card title="Notification Preferences">
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">Email Notifications</h4>
                <div className="space-y-3">
                  {[
                    'System alerts and maintenance',
                    'New transaction notifications',
                    'Weekly summary reports',
                    'Account security alerts',
                    'Payment reminders',
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span>{item}</span>
                      <Button size="small" type={index < 2 ? 'primary' : 'default'}>
                        {index < 2 ? 'Enabled' : 'Disabled'}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Push Notifications</h4>
                <div className="space-y-3">
                  {[
                    'Urgent system alerts',
                    'Failed transactions',
                    'Security notifications',
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span>{item}</span>
                      <Button size="small" type="primary">
                        Enabled
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </TabPane>

        <TabPane tab="Activity Log" key="activity">
          <Card title="Recent Activity">
            <Table
              columns={activityColumns}
              dataSource={activityData}
              pagination={{
                pageSize: 10,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} activities`,
              }}
            />
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Profile;