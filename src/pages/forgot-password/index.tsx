import { Card, Form, Input, Button, Typography, Result } from 'antd';
import { MailOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const { Title, Text } = Typography;

const ForgotPassword = () => {
  const [form] = Form.useForm();
  const [emailSent, setEmailSent] = useState(false);

  const onFinish = (values: any) => {
    console.log('Password reset request:', values);
    // Simulate email sent
    setEmailSent(true);
  };

  if (emailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-light to-accent-light flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg">
          <Result
            status="success"
            title="Email Sent!"
            subTitle="We've sent password reset instructions to your email address."
            extra={[
              <Button type="primary" key="login" className="bg-primary hover:bg-primary-dark">
                <Link to="/login">Back to Login</Link>
              </Button>
            ]}
          />
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-accent-light flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <div className="text-center mb-8">
          <Title level={2} className="text-primary mb-2">Reset Password</Title>
          <Text type="secondary">
            Enter your email address and we'll send you instructions to reset your password.
          </Text>
        </div>

        <Form
          form={form}
          name="forgotPassword"
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
              prefix={<MailOutlined />} 
              placeholder="Enter your email address"
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              className="w-full bg-primary hover:bg-primary-dark"
              size="large"
            >
              Send Reset Instructions
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center mt-6">
          <Link 
            to="/login" 
            className="inline-flex items-center text-primary hover:text-primary-dark"
          >
            <ArrowLeftOutlined className="mr-2" />
            Back to Login
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default ForgotPassword;