import { Card, Upload, Button, Table, Row, Col, Progress, Alert, Tabs, Tag } from 'antd';
import { 
  UploadOutlined, 
  FileOutlined, 
  CheckCircleOutlined,
  SyncOutlined,
  ExclamationCircleOutlined,
  CloudUploadOutlined,
  ReloadOutlined,
  WarningOutlined
} from '@ant-design/icons';
import { useState } from 'react';
import FileUploadModal from '@/components/FileUploadModal';
import { useRole } from '@/contexts/RoleContext';

const { Dragger } = Upload;
const { TabPane } = Tabs;

const UploadFiles = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);
  const [uploadConfig, setUploadConfig] = useState<any>(null);
  const { currentUser, hasUploadPermission } = useRole();

  const uploadedFiles = [
    {
      key: '1',
      fileName: 'patient_records_jan_2024.csv',
      fileType: '835',
      organization: 'Health Corp',
      uploadDate: '2024-01-20',
      status: 'Processed',
      recordsCount: 1245,
      fileSize: '2.4 MB',
      mapping: 'Complete',
      hasMissingData: false,
    },
    {
      key: '2',
      fileName: 'claims_data_q4_2023.xlsx',
      fileType: '837',
      organization: 'MedCenter',
      uploadDate: '2024-01-18',
      status: 'Processing',
      recordsCount: 856,
      fileSize: '4.1 MB',
      mapping: 'In Progress',
      hasMissingData: true,
    },
    {
      key: '3',
      fileName: 'provider_information.json',
      fileType: '835',
      organization: 'Regional Hospital',
      uploadDate: '2024-01-15',
      status: 'Failed',
      recordsCount: 0,
      fileSize: '1.2 MB',
      mapping: 'Error',
      hasMissingData: false,
    },
  ];

  const mappingData = [
    {
      key: '1',
      sourceField: 'patient_id',
      targetField: 'Patient ID',
      dataType: 'String',
      matched: true,
      sampleValue: 'PAT-001',
    },
    {
      key: '2',
      sourceField: 'first_name',
      targetField: 'First Name',
      dataType: 'String',
      matched: true,
      sampleValue: 'John',
    },
    {
      key: '3',
      sourceField: 'dob',
      targetField: 'Date of Birth',
      dataType: 'Date',
      matched: true,
      sampleValue: '1985-03-15',
    },
    {
      key: '4',
      sourceField: 'insurance_id',
      targetField: 'Insurance ID',
      dataType: 'String',
      matched: false,
      sampleValue: 'INS-123456',
    },
  ];

  const fileColumns = [
    {
      title: 'File Name',
      dataIndex: 'fileName',
      key: 'fileName',
      render: (fileName: string) => (
        <div className="flex items-center space-x-2">
          <FileOutlined className="text-primary" />
          <span className="font-medium">{fileName}</span>
        </div>
      ),
    },
    {
      title: 'File Type',
      dataIndex: 'fileType',
      key: 'fileType',
      render: (type: string) => (
        <Tag color={type === '835' ? 'blue' : 'green'}>
          {type === '835' ? '835 - Remittance' : '837 - Claims'}
        </Tag>
      ),
    },
    {
      title: 'Organization',
      dataIndex: 'organization',
      key: 'organization',
    },
    {
      title: 'Upload Date',
      dataIndex: 'uploadDate',
      key: 'uploadDate',
    },
    {
      title: 'Records',
      dataIndex: 'recordsCount',
      key: 'recordsCount',
      render: (count: number) => count.toLocaleString(),
    },
    {
      title: 'Size',
      dataIndex: 'fileSize',
      key: 'fileSize',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusConfig = {
          'Processed': { icon: <CheckCircleOutlined />, color: 'text-success' },
          'Processing': { icon: <SyncOutlined spin />, color: 'text-warning' },
          'Failed': { icon: <ExclamationCircleOutlined />, color: 'text-destructive' },
        };
        const config = statusConfig[status as keyof typeof statusConfig];
        return (
          <span className={`flex items-center space-x-1 ${config.color}`}>
            {config.icon}
            <span>{status}</span>
          </span>
        );
      },
    },
    {
      title: 'Missing Data',
      dataIndex: 'hasMissingData',
      key: 'hasMissingData',
      render: (hasMissingData: boolean) => (
        <div className="flex items-center space-x-1">
          {hasMissingData ? (
            <Tag icon={<WarningOutlined />} color="warning">
              Missing Data
            </Tag>
          ) : (
            <Tag icon={<CheckCircleOutlined />} color="success">
              Complete
            </Tag>
          )}
        </div>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <div className="flex space-x-2">
          {record.hasMissingData && (
            <Button
              type="primary"
              size="small"
              icon={<ReloadOutlined />}
              className="bg-warning hover:bg-warning-dark text-white"
              onClick={() => handleReupload(record)}
            >
              Re-upload
            </Button>
          )}
        </div>
      ),
    },
  ];

  const mappingColumns = [
    {
      title: 'Source Field',
      dataIndex: 'sourceField',
      key: 'sourceField',
      render: (field: string) => (
        <code className="bg-muted px-2 py-1 rounded text-sm">{field}</code>
      ),
    },
    {
      title: 'Target Field',
      dataIndex: 'targetField',
      key: 'targetField',
    },
    {
      title: 'Data Type',
      dataIndex: 'dataType',
      key: 'dataType',
    },
    {
      title: 'Matched',
      dataIndex: 'matched',
      key: 'matched',
      render: (matched: boolean) => (
        <span className={matched ? 'text-success' : 'text-destructive'}>
          {matched ? <CheckCircleOutlined /> : <ExclamationCircleOutlined />}
          <span className="ml-1">{matched ? 'Yes' : 'No'}</span>
        </span>
      ),
    },
    {
      title: 'Sample Value',
      dataIndex: 'sampleValue',
      key: 'sampleValue',
      render: (value: string) => (
        <code className="bg-muted px-2 py-1 rounded text-sm">{value}</code>
      ),
    },
  ];

  const handleUploadConfiguration = (values: any) => {
    setUploadConfig(values);
    // Here you would normally start the actual upload process with the configuration
    console.log('Upload configuration:', values);
    setIsUploading(true);
    // Simulate upload progress
    setTimeout(() => {
      setIsUploading(false);
      setUploadProgress(100);
    }, 3000);
  };

  const handleReupload = (record: any) => {
    console.log('Re-uploading file:', record);
    // Set the upload configuration to the file's original settings
    setUploadConfig({
      organization: record.organization,
      fileType: record.fileType
    });
    setIsUploadModalVisible(true);
  };

  const uploadProps = {
    name: 'file',
    multiple: true,
    action: '/api/upload',
    beforeUpload: (file: any) => {
      if (!uploadConfig) {
        setIsUploadModalVisible(true);
        return false; // Prevent upload until configuration is set
      }
      return true;
    },
    onChange(info: any) {
      const { status } = info.file;
      if (status === 'uploading') {
        setIsUploading(true);
        setUploadProgress(info.file.percent || 0);
      }
      if (status === 'done') {
        setIsUploading(false);
        setUploadProgress(100);
        console.log(`${info.file.name} file uploaded successfully with config:`, uploadConfig);
      } else if (status === 'error') {
        setIsUploading(false);
        setUploadProgress(0);
        console.log(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e: any) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  // Check if user has upload permission
  if (!hasUploadPermission()) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <ExclamationCircleOutlined className="text-6xl text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">Access Restricted</h3>
          <p className="text-muted-foreground">
            You don't have permission to access the file upload section. 
            Please contact your administrator to request upload access.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Upload Instructions */}
      <Alert
        message="File Upload Guidelines"
        description="Supported formats: CSV, Excel (.xlsx, .xls), JSON. Maximum file size: 50MB. Ensure your files contain proper headers and follow the data mapping requirements."
        type="info"
        showIcon
        closable
      />

      <Tabs defaultActiveKey="upload">
        <TabPane tab="Upload Files" key="upload">
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card title="Upload New Files" className="h-full">
                <Dragger {...uploadProps} className="mb-4">
                  <p className="ant-upload-drag-icon">
                    <CloudUploadOutlined className="text-4xl text-primary" />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag files to this area to upload
                  </p>
                  <p className="ant-upload-hint">
                    Support for 835 (Remittance) and 837 (Claims) file formats. 
                    Maximum file size: 50MB. Configuration required before upload.
                  </p>
                </Dragger>

                {isUploading && (
                  <div className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span>Upload Progress</span>
                      <span>{uploadProgress.toFixed(0)}%</span>
                    </div>
                    <Progress percent={uploadProgress} status="active" />
                  </div>
                )}

                <div className="space-y-2">
                  <Button 
                    type="primary" 
                    icon={<UploadOutlined />}
                    className="w-full"
                    disabled={isUploading}
                    onClick={() => setIsUploadModalVisible(true)}
                  >
                    Configure & Upload Files
                  </Button>
                  {uploadConfig && (
                    <div className="text-sm text-muted-foreground text-center">
                      Ready to upload to {uploadConfig.organization} as {uploadConfig.fileType} files
                    </div>
                  )}
                </div>
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card title="Upload Statistics" className="h-full">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-primary-light rounded-lg">
                      <div className="text-2xl font-bold text-primary">24</div>
                      <div className="text-sm text-muted-foreground">Files Uploaded Today</div>
                    </div>
                    <div className="text-center p-4 bg-success-light rounded-lg">
                      <div className="text-2xl font-bold text-success">156</div>
                      <div className="text-sm text-muted-foreground">Total Files This Month</div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Storage Used</span>
                      <span>2.4 GB / 10 GB</span>
                    </div>
                    <Progress percent={24} strokeColor="#1E90FF" />
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium">File Types</div>
                    {[
                      { type: 'CSV', count: 45, color: '#32CD32' },
                      { type: 'Excel', count: 32, color: '#1E90FF' },
                      { type: 'JSON', count: 18, color: '#FF6347' },
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <div 
                            className="w-3 h-3 rounded"
                            style={{ backgroundColor: item.color }}
                          />
                          <span>{item.type}</span>
                        </div>
                        <span>{item.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="File History" key="history">
          <Card title="Uploaded Files">
            <Table
              columns={fileColumns}
              dataSource={uploadedFiles}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} files`,
              }}
              scroll={{ x: 800 }}
            />
          </Card>
        </TabPane>

        <TabPane tab="Data Mapping" key="mapping">
          <Card title="Field Mapping Comparison">
            <Alert
              message="Data Mapping Preview"
              description="Review how your uploaded file fields map to system fields. Unmatched fields may require manual mapping or data transformation."
              type="warning"
              showIcon
              className="mb-4"
            />

            <Table
              columns={mappingColumns}
              dataSource={mappingData}
              pagination={false}
              scroll={{ x: 800 }}
            />

            <div className="mt-4 flex justify-end space-x-2">
              <Button>Reset Mapping</Button>
              <Button type="primary">Save Mapping</Button>
            </div>
          </Card>
        </TabPane>
      </Tabs>

      {/* File Upload Configuration Modal */}
      <FileUploadModal
        visible={isUploadModalVisible}
        onClose={() => setIsUploadModalVisible(false)}
        onSubmit={handleUploadConfiguration}
      />
    </div>
  );
};

export default UploadFiles;