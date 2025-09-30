import { Card, Form, Input, Button, Avatar, Tabs } from 'antd';
import { 
  UserOutlined, 
  MailOutlined, 
  PhoneOutlined, 
  LockOutlined
} from '@ant-design/icons';
import { useRole } from '@/contexts/RoleContext';

const { TabPane } = Tabs;

const Profile = () => {
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const { currentUser } = useRole();

  const handlePasswordChange = (values: any) => {
    console.log('Password change:', values);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-lg mb-6">
        <div className="text-center">
          <Avatar
            size={120}
            icon={<UserOutlined />}
            className="border-4 border-primary bg-primary/10"
          />
          <h2 className="text-2xl font-bold mt-4 mb-1">{currentUser.name}</h2>
          <div className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full font-medium">
            {currentUser.role}
          </div>
        </div>
      </Card>

      <Card className="shadow-lg">
        <Tabs defaultActiveKey="1" size="large">
          <TabPane tab="Profile Information" key="1">
            <Form
              form={form}
              layout="vertical"
              initialValues={{
                name: currentUser.name,
                email: currentUser.email,
                organization: currentUser.organization,
                role: currentUser.role,
              }}
              className="max-w-2xl mx-auto"
            >
              <Form.Item
                name="name"
                label="Full Name"
                rules={[{ required: true, message: 'Please enter name!' }]}
              >
                <Input prefix={<UserOutlined />} size="large" />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email Address"
                rules={[{ required: true, type: 'email', message: 'Please enter valid email!' }]}
              >
                <Input prefix={<MailOutlined />} size="large" />
              </Form.Item>

              <Form.Item
                name="phone"
                label="Phone Number"
              >
                <Input prefix={<PhoneOutlined />} size="large" />
              </Form.Item>

              <Form.Item
                name="organization"
                label="Organization"
              >
                <Input disabled size="large" />
              </Form.Item>

              <Form.Item
                name="role"
                label="Role"
              >
                <Input disabled size="large" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" size="large" block>
                  Update Profile
                </Button>
              </Form.Item>
            </Form>
          </TabPane>

          <TabPane tab="Security" key="2">
            <Form
              form={passwordForm}
              layout="vertical"
              onFinish={handlePasswordChange}
              className="max-w-2xl mx-auto"
            >
              <Form.Item
                name="currentPassword"
                label="Current Password"
                rules={[{ required: true, message: 'Please enter current password!' }]}
              >
                <Input.Password prefix={<LockOutlined />} size="large" />
              </Form.Item>

              <Form.Item
                name="newPassword"
                label="New Password"
                rules={[
                  { required: true, message: 'Please enter new password!' },
                  { min: 8, message: 'Password must be at least 8 characters!' }
                ]}
              >
                <Input.Password prefix={<LockOutlined />} size="large" />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                label="Confirm New Password"
                dependencies={['newPassword']}
                rules={[
                  { required: true, message: 'Please confirm new password!' },
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
                <Input.Password prefix={<LockOutlined />} size="large" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" size="large" block>
                  Change Password
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Profile;