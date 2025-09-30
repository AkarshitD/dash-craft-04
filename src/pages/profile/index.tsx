import {
  Card, Form, Input, Button, Avatar, Upload, Row, Col, Tabs, message
} from 'antd';
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  BankOutlined,
  CameraOutlined
} from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { AuthServices, ProfileServices } from '@/services';
import { useRole } from '@/contexts/RoleContext';

const Profile = () => {
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { currentUser } = useRole();
  const [messageApi, contextHolder] = message.useMessage();
  const [profileData, setProfileData] = useState<any>(null);

  // Fetch profile on mount (concise async)
  useEffect(() => {
    (async () => {
      try {
        const res = await ProfileServices.GetProfile();
        if (res?.status === 200) {
          setProfileData(res.data);
          form.setFieldsValue({
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            email: res.data.emailAddress,
            phone: res.data.phone || '',
            role: res.data.role,
            // organization: res.data.organization || '',
            // department: res.data.department || '',
          });
        } else {
          messageApi.error(res?.message || 'Failed to fetch profile');
        }
      } catch (err: any) {
        messageApi.error(err?.response?.data?.message || 'Failed to fetch profile');
      }
    })();
  }, []);

  // Update profile
  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      console.log('Profile update:', values);
      // Call update profile API here if needed
      messageApi.success('Profile updated successfully!');
    } catch (err: any) {
      messageApi.error(err?.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  // Change password
  const onPasswordChange = async (values: any) => {
    setLoading(true);
    try {
      const { confirmPassword, ...bodyData } = values;
      const payloadData = {
        currentPassword: bodyData.currentPassword,
        newPassword: bodyData.newPassword,
      };

      const res = await AuthServices.ChangePassword({ bodyData: payloadData });

      if (res?.status === 200) {
        messageApi.success(res?.message || 'Password updated successfully!');
        passwordForm.resetFields();
      } else if (res?.status === 400) {
        messageApi.error(res?.message || 'Invalid current password!');
      } else {
        messageApi.warning(res?.message || 'Something went wrong, please try again.');
      }
    } catch (err: any) {
      messageApi.error(err?.response?.data?.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  // Avatar upload props
  const uploadProps = {
    name: 'avatar',
    listType: 'picture-card' as const,
    showUploadList: false,
    beforeUpload: (file: any) => {
      console.log('Upload avatar:', file);
      return false;
    },
  };

  const tabsItems = [
    {
      key: 'profile',
      label: 'Profile Information',
      children: (
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={8}>
            <Card className="text-center">
              <div className="mb-4">
                <Avatar
                  size={120}
                  src={profileData?.avatarUrl || undefined}
                  icon={<UserOutlined />}
                />
              </div>
              <Upload {...uploadProps}>
                <Button icon={<CameraOutlined />}>Change Avatar</Button>
              </Upload>
              <div className="mt-4 space-y-2">
                <h3 className="text-lg font-semibold">{profileData?.firstName} {profileData?.lastName}</h3>
                <p className="text-muted-foreground">{profileData?.role}</p>
                <p className="text-muted-foreground">{profileData?.organization || ''}</p>
              </div>
            </Card>
          </Col>

          <Col xs={24} lg={16}>
            <Card title="Personal Information">
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
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
                    { required: true, message: 'Email is required!' },
                    { type: 'email', message: 'Please enter a valid email!' }
                  ]}
                >
                  <Input prefix={<MailOutlined />} disabled />
                </Form.Item>


                <Row gutter={[16, 0]}>
                  <Col xs={24} sm={12}>
                    <Form.Item name="role" label="Role">
                      <Input disabled />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="phone"
                      label="Phone Number"
                      rules={[{ required: false }]}
                    >
                      <Input prefix={<PhoneOutlined />} />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item>
                  <Button type="primary" htmlType="submit" size="large" loading={loading}>
                    Update Profile
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      ),
    },
    {
      key: 'changePassword',
      label: 'Change Password',
      children: (
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
                  rules={[{ required: true, message: 'Please input your new password!' }]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item
                  name="confirmPassword"
                  label="Confirm Password"
                  dependencies={['newPassword']}
                  rules={[
                    { required: true, message: 'Please confirm your password!' },
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
                  <Button type="primary" htmlType="submit" size="large" loading={loading}>
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
                  <Button type="primary" size="small">Enable</Button>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">Login Notifications</div>
                    <div className="text-sm text-muted-foreground">
                      Get notified of login attempts
                    </div>
                  </div>
                  <Button size="small">Enabled</Button>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">Session Timeout</div>
                    <div className="text-sm text-muted-foreground">
                      Auto logout after inactivity
                    </div>
                  </div>
                  <Button size="small">30 minutes</Button>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <div className="w-full mx-auto">
      {contextHolder}
      <Tabs defaultActiveKey="profile" items={tabsItems} />
    </div>
  );
};

export default Profile;
