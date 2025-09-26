import { Card, Form, Input, Button, Typography, Divider, message, Alert } from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useRole } from '@/contexts/RoleContext';
import { AuthServices } from '@/services';
import { AppDisptach } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { login } from '@/redux/slice';
import { setLocalStorage } from '@/utils/common';

const { Title, Text } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useRole();
  const dispatch = useDispatch<AppDisptach>();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

    const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    const res = await AuthServices.Login({bodyData:values})
    if(res?.status==200){
    setLocalStorage('accessToken',res?.data?.accessToken)
    setLocalStorage('refreshToken',res?.data?.refreshToken)
    dispatch(login(res?.data?.user))
    navigate('/')
      message.success(res?.message)
    }
    if(res?.status==400){
     message.error(res?.message)
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
          {/* <Alert
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
          /> */}
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