import { Card, Form, Input, Button, Typography, Divider, message, Alert } from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useRole } from '@/contexts/RoleContext';

const { Title, Text } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useRole();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Mock users for testing
  const mockUsers = [
    {
      id: 'super-1',
      name: 'Super Administrator',
      email: 'superadmin@test.com',
      role: 'SuperAdmin' as const,
      organization: 'System Administration',
      hasUploadAccess: true,
    },
    {
      id: 'admin-1', 
      name: 'Healthcare Admin',
      email: 'admin@test.com',
      role: 'Admin' as const,
      organization: 'Health Corp',
      hasUploadAccess: true,
    },
    {
      id: 'user-1',
      name: 'Dr. Sarah Johnson',
      email: 'user@test.com', 
      role: 'User' as const,
      organization: 'Health Corp',
      hasUploadAccess: true,
    },
  ];

  const onFinish = (values: { email: string; password: string }) => {
    setLoading(true);
    
    // Find user by email
    const user = mockUsers.find(u => u.email === values.email);
    
    if (user && values.password === 'password123') {
      setCurrentUser(user);
      message.success(`Welcome ${user.name}!`);
      setTimeout(() => {
        setLoading(false);
        navigate('/dashboard');
      }, 1000);
    } else {
      setLoading(false);
      message.error('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-accent-light flex items-center justify-center p-4">
      <div className="w-full max-w-lg shadow-lg">
        <Card className="shadow-2xl border-0 bg-card/95 backdrop-blur-sm">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <UserOutlined className="text-white text-2xl" />
            </div>
            <Title level={2} className="text-foreground mb-2">Welcome Back</Title>
            <Text type="secondary">Sign in to your healthcare analytics dashboard</Text>
          </div>

          <Alert
            message="Demo Credentials"
            description={
              <div className="text-sm">
                <div><strong>SuperAdmin:</strong> superadmin@test.com / password123</div>
                <div><strong>Admin:</strong> admin@test.com / password123</div>
                <div><strong>User:</strong> user@test.com / password123</div>
              </div>
            }
            type="info"
            className="mb-6"
          />

        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="email"
            label="Email Address"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Enter your email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your password"
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              className="w-full bg-primary hover:bg-primary-dark"
              size="large"
              loading={loading}
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>

        <Divider />

        <div className="text-center space-y-3">
          <div>
            <Link to="/forgot-password" className="text-primary hover:text-primary-dark">
              Forgot your password?
            </Link>
          </div>
          <div>
            <Text type="secondary">Don't have an account? </Text>
            <Link to="/register" className="text-primary hover:text-primary-dark font-medium">
              Sign up here
            </Link>
          </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;