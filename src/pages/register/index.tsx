import { Card, Form, Input, Button, Typography, Divider, Select } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined, BankOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;
const { Option } = Select;

const Register = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Registration attempt:', values);
    // Simulate successful registration
    navigate('/organization-selection');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-accent-light flex items-center justify-center p-4">
      <Card className="w-full max-w-lg shadow-lg">
        <div className="text-center mb-8">
          <Title level={2} className="text-primary mb-2">Create Account</Title>
          <Text type="secondary">Join our healthcare analytics platform</Text>
        </div>

        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[{ required: true, message: 'Please input your first name!' }]}
            >
              <Input 
                prefix={<UserOutlined />} 
                placeholder="First name"
              />
            </Form.Item>

            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[{ required: true, message: 'Please input your last name!' }]}
            >
              <Input 
                prefix={<UserOutlined />} 
                placeholder="Last name"
              />
            </Form.Item>
          </div>

          <Form.Item
            name="email"
            label="Email Address"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input 
              prefix={<MailOutlined />} 
              placeholder="Enter your email"
            />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[{ required: true, message: 'Please input your phone number!' }]}
          >
            <Input 
              prefix={<PhoneOutlined />} 
              placeholder="Enter your phone number"
            />
          </Form.Item>

          <Form.Item
            name="organization"
            label="Organization"
            rules={[{ required: true, message: 'Please input your organization!' }]}
          >
            <Input 
              prefix={<BankOutlined />} 
              placeholder="Enter your organization name"
            />
          </Form.Item>

          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: 'Please select your role!' }]}
          >
            <Select placeholder="Select your role">
              <Option value="admin">Administrator</Option>
              <Option value="manager">Manager</Option>
              <Option value="analyst">Data Analyst</Option>
              <Option value="provider">Healthcare Provider</Option>
              <Option value="coordinator">Care Coordinator</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 8, message: 'Password must be at least 8 characters!' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Create a password"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm your password"
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              className="w-full bg-primary hover:bg-primary-dark"
              size="large"
            >
              Create Account
            </Button>
          </Form.Item>
        </Form>

        <Divider />

        <div className="text-center">
          <Text type="secondary">Already have an account? </Text>
          <Link to="/login" className="text-primary hover:text-primary-dark font-medium">
            Sign in here
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Register;