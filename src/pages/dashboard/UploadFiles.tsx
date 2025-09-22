import { Card, Upload, Button, Table, Row, Col, Progress, Alert, Tabs } from 'antd';
import { 
  UploadOutlined, 
  FileOutlined, 
  CheckCircleOutlined,
  SyncOutlined,
  ExclamationCircleOutlined,
  CloudUploadOutlined 
} from '@ant-design/icons';
import { useState } from 'react';

const { Dragger } = Upload;
const { TabPane } = Tabs;

const UploadFiles = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const uploadedFiles = [
    {
      key: '1',
      fileName: 'patient_records_jan_2024.csv',
      fileType: 'CSV',
      uploadDate: '2024-01-20',
      status: 'Processed',
      recordsCount: 1245,
      fileSize: '2.4 MB',
      mapping: 'Complete',
    },
    {
      key: '2',
      fileName: 'claims_data_q4_2023.xlsx',
      fileType: 'Excel',
      uploadDate: '2024-01-18',
      status: 'Processing',
      recordsCount: 856,
      fileSize: '4.1 MB',
      mapping: 'In Progress',
    },
    {
      key: '3',
      fileName: 'provider_information.json',
      fileType: 'JSON',
      uploadDate: '2024-01-15',
      status: 'Failed',
      recordsCount: 0,
      fileSize: '1.2 MB',
      mapping: 'Error',
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
      title: 'Type',
      dataIndex: 'fileType',
      key: 'fileType',
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
      title: 'Mapping',
      dataIndex: 'mapping',
      key: 'mapping',
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

  const uploadProps = {
    name: 'file',
    multiple: true,
    action: '/api/upload',
    onChange(info: any) {
      const { status } = info.file;
      if (status === 'uploading') {
        setIsUploading(true);
        setUploadProgress(info.file.percent || 0);
      }
      if (status === 'done') {
        setIsUploading(false);
        setUploadProgress(100);
        console.log(`${info.file.name} file uploaded successfully.`);
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
                    Support for single or bulk upload. Strictly prohibited from uploading 
                    company data or other banned files.
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
                  >
                    {isUploading ? 'Uploading...' : 'Select Files'}
                  </Button>
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
    </div>
  );
};

export default UploadFiles;