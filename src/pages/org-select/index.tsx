import { Card, Select, Button, Typography, Space } from 'antd';
import { BankOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const { Title, Text } = Typography;
const { Option } = Select;

const OrganizationSelection = () => {
  const navigate = useNavigate();
  const [selectedOrg, setSelectedOrg] = useState<string>();

  const organizations = [
    { id: 'mercy-health', name: 'Mercy Health System', type: 'Hospital Network' },
    { id: 'cleveland-clinic', name: 'Cleveland Clinic', type: 'Medical Center' },
    { id: 'kaiser-permanente', name: 'Kaiser Permanente', type: 'HMO' },
    { id: 'mayo-clinic', name: 'Mayo Clinic', type: 'Medical Center' },
    { id: 'johns-hopkins', name: 'Johns Hopkins Medicine', type: 'Academic Medical Center' },
    { id: 'blue-cross', name: 'Blue Cross Blue Shield', type: 'Insurance Provider' },
  ];

  const handleContinue = () => {
    if (selectedOrg) {
      console.log('Selected organization:', selectedOrg);
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-accent-light flex items-center justify-center p-4">
      <Card className="w-full max-w-lg shadow-lg">
        <div className="text-center mb-8">
          <div className="mb-4">
            <BankOutlined className="text-4xl text-primary" />
          </div>
          <Title level={2} className="text-primary mb-2">Select Organization</Title>
          <Text type="secondary">
            Choose your organization to access your healthcare analytics dashboard
          </Text>
        </div>

        <Space direction="vertical" size="large" className="w-full">
          <div>
            <Text strong className="block mb-2">Organization</Text>
            <Select
              size="large"
              placeholder="Search and select your organization"
              className="w-full h-32"
              showSearch
              value={selectedOrg}
              onChange={setSelectedOrg}
              filterOption={(input, option) =>
                (option?.children as unknown as string)
                  ?.toLowerCase()
                  ?.includes(input.toLowerCase())  
              }
               style={{ height: 80 }}
            >
              {organizations.map((org) => (
                <Option key={org.id} value={org.id}>
                  <div>
                    <div className="font-medium">{org.name}</div>
                    <div className="text-xs text-gray-500">{org.type}</div>
                  </div>
                </Option>
              ))}
            </Select>
          </div>

          <Button
            type="primary"
            size="large"
            className="w-full bg-primary hover:bg-primary-dark"
            disabled={!selectedOrg}
            onClick={handleContinue}
            icon={<ArrowRightOutlined />}
          >
            Continue to Dashboard
          </Button>
        </Space>

        <div className="text-center mt-8 pt-6 border-t border-gray-200">
          <Text type="secondary" className="text-sm">
            Don't see your organization? 
            <br />
            <Button type="link" size="small" className="p-0 text-primary">
              Contact support to add it
            </Button>
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default OrganizationSelection;