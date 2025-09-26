import { Select, Typography } from 'antd';
import { BankOutlined } from '@ant-design/icons';
import { useRole } from '@/contexts/RoleContext';
import { useState } from 'react';

const { Text } = Typography;
const { Option } = Select;

interface OrganizationSwitcherProps {
  className?: string;
}

const OrganizationSwitcher = ({ className }: OrganizationSwitcherProps) => {
  const { currentUser } = useRole();
  
  // Mock organizations data
  const organizations = [
    { id: 'health-corp', name: 'Health Corp' },
    { id: 'medcenter', name: 'MedCenter' },
    { id: 'regional-hospital', name: 'Regional Hospital' },
  ];

  const [selectedOrg, setSelectedOrg] = useState(currentUser.organization || organizations[0]?.name);

  const handleOrgChange = (value: string) => {
    setSelectedOrg(value);
    // Here you would typically update the context/state with the new organization
    // and refresh the dashboard data accordingly
  };

  // Don't show for SuperAdmin
  if (currentUser.role === 'SuperAdmin') {
    return null;
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <BankOutlined className="text-muted-foreground" />
      <div className="flex flex-col">
        <Text type="secondary" className="text-xs">Organization</Text>
        <Select
          value={selectedOrg}
          onChange={handleOrgChange}
          className="min-w-[150px]"
          size="small"
          showSearch
          optionFilterProp="children"
        >
          {organizations.map(org => (
            <Option key={org.id} value={org.name}>
              {org.name}
            </Option>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default OrganizationSwitcher;