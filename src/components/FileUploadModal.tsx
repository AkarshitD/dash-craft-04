import { Modal, Form, Select, Button, Typography, Row, Col } from 'antd';
import { BankOutlined, FileTextOutlined, UploadOutlined } from '@ant-design/icons';
import { useRole } from '@/contexts/RoleContext';

const { Title, Text } = Typography;
const { Option } = Select;

interface FileUploadModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
}

const FileUploadModal = ({ visible, onClose, onSubmit }: FileUploadModalProps) => {
  const [form] = Form.useForm();
  const { currentUser } = useRole();

  const organizations = [
    'Health Corp',
    'MedCenter', 
    'Regional Hospital',
    'City Clinic',
    'Metro Medical'
  ];

  const fileTypes = [
    { value: '835', label: '835 - Electronic Remittance Advice', description: 'Payment and remittance advice from payers' },
    { value: '837', label: '837 - Healthcare Claim', description: 'Professional healthcare claim transactions' }
  ];

  const handleSubmit = (values: any) => {
    onSubmit(values);
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="File Upload Configuration"
      open={visible}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      footer={null}
      width={600}
      className="top-6"
    >
      <div className="p-4">
        <div className="mb-6 p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-primary/10">
          <Title level={4} className="mb-2 text-primary">Upload Requirements</Title>
          <Text type="secondary">
            Please select the organization and file type before uploading. 
            This helps us properly categorize and process your healthcare data files.
          </Text>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            organization: currentUser.organization
          }}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Form.Item
                name="organization"
                label="Organization"
                rules={[{ required: true, message: 'Please select an organization!' }]}
              >
                <Select
                  placeholder="Select organization"
                  size="large"
                  suffixIcon={<BankOutlined />}
                >
                  {organizations.map(org => (
                    <Option key={org} value={org}>{org}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} lg={12}>
              <Form.Item
                name="fileType"
                label="File Type"
                rules={[{ required: true, message: 'Please select a file type!' }]}
              >
                <Select
                  placeholder="Select file type"
                  size="large"
                  suffixIcon={<FileTextOutlined />}
                >
                  {fileTypes.map(type => (
                    <Option key={type.value} value={type.value}>
                      {type.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <div className="mt-4">
            <Title level={5} className="mb-3">File Type Descriptions</Title>
            <div className="space-y-3">
              {fileTypes.map(type => (
                <div key={type.value} className="p-3 bg-muted/50 rounded-lg border border-border/50">
                  <div className="flex items-center space-x-2 mb-1">
                    <FileTextOutlined className="text-primary" />
                    <Text strong className="text-foreground">{type.label}</Text>
                  </div>
                  <Text type="secondary" className="text-sm">{type.description}</Text>
                </div>
              ))}
            </div>
          </div>

          <Form.Item className="mb-0 mt-6">
            <div className="flex justify-end space-x-3">
              <Button 
                onClick={() => {
                  form.resetFields();
                  onClose();
                }}
                size="large"
              >
                Cancel
              </Button>
              <Button 
                type="primary" 
                htmlType="submit"
                icon={<UploadOutlined />}
                size="large"
                className="bg-primary hover:bg-primary-dark"
              >
                Continue Upload
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default FileUploadModal;