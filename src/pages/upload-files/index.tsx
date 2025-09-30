

import { useState } from 'react';
import { Card, Upload, Button, Table, Row, Col, Progress, Alert, Tabs, Modal, Form, Input, Select, message } from 'antd';
import FileUploadServices from '@/services/common/file-upload/index.service';
import { CloudUploadOutlined, UploadOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const { Dragger } = Upload;
const { TabPane } = Tabs;

// ---- Config ----
const ACCEPTED_EXT = ['.xlsx', '.xls'];
const ACCEPTED_MIME = [
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel',
];
const MAX_SIZE_MB = 1024; // 1 GB

// Upload helper using XHR so we get progress events
// We will use your existing API service (no direct URL building here)

const UploadFiles = ({ hasUploadPermission = () => true }: { hasUploadPermission?: () => boolean }) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);
  const [uploadConfig, setUploadConfig] = useState<any>(null);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);

  // Simple columns to show what we stored
  const fileColumns = [
    { title: 'File Name', dataIndex: 'name', key: 'name' },
    { title: 'Size (MB)', dataIndex: 'sizeMB', key: 'sizeMB', render: (v: number) => v.toFixed(2) },
    { title: 'Table', dataIndex: 'tableName', key: 'tableName' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'Uploaded At', dataIndex: 'uploadedAt', key: 'uploadedAt' },
  ];

  const validateFile = (file: File) => {
    const sizeMB = file.size / (1024 * 1024);
    if (sizeMB > MAX_SIZE_MB) {
      message.error(`File too large. Max ${MAX_SIZE_MB} MB.`);
      return false;
    }
    const typeOk = ACCEPTED_MIME.includes(file.type) || ACCEPTED_EXT.some((ext) => file.name.toLowerCase().endsWith(ext));
    if (!typeOk) {
      message.error(`Unsupported file type. Allowed: ${ACCEPTED_EXT.join(', ')}`);
      return false;
    }
    if (!uploadConfig?.tableName) {
      message.warning('Please configure a table name before uploading.');
      return false;
    }
    return true;
  };

  const handleUploadConfiguration = (values: any) => {
    setUploadConfig(values);
    setIsUploadModalVisible(false);
  };

  const uploadProps: any = {
    name: 'file',
    multiple: true,
    accept: ACCEPTED_EXT.join(','),
    beforeUpload: (file: File) => {
      if (!uploadConfig) {
        setIsUploadModalVisible(true);
        return Upload.LIST_IGNORE;
      }
      if (!validateFile(file)) return Upload.LIST_IGNORE;
      if (isUploading) {
        message.info('Another upload is in progress. Please wait.');
        return Upload.LIST_IGNORE;
      }
      return true;
    },
    customRequest: async (options: any) => {
      const { file, onProgress, onSuccess, onError } = options;
      try {
        setIsUploading(true);
        setUploadProgress(0);

        const form = new FormData();
        form.append('file', file as File);

       
        const res = await FileUploadServices.UploadFiles({
          bodyData: form,
          tableName: uploadConfig?.tableName,
        });

        setIsUploading(false);
        setUploadProgress(100);
        message.success(`${(file as File).name} uploaded successfully.`);
        onSuccess?.(res);

        setUploadedFiles((prev) => [
          {
            key: `${Date.now()}-${(file as File).name}`,
            name: (file as File).name,
            sizeMB: (file as File).size / (1024 * 1024),
            tableName: uploadConfig?.tableName,
            status: 'Stored',
            uploadedAt: new Date().toLocaleString(),
          },
          ...prev,
        ]);
      } catch (err: any) {
        setIsUploading(false);
        setUploadProgress(0);
        message.error(typeof err === 'string' ? err : err?.message || 'Upload failed');
        onError?.(err);
      }
    },
  };

  if (!hasUploadPermission()) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <ExclamationCircleOutlined className="text-6xl text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">Access Restricted</h3>
          <p className="text-muted-foreground">
            You don't have permission to access the file upload section. Please contact your administrator.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Alert
        message="Excel Upload"
        description={`Supported formats: ${ACCEPTED_EXT.join(', ')}. Max size: ${MAX_SIZE_MB}MB.`}
        type="info"
        showIcon
        closable
      />

      <Tabs defaultActiveKey="upload">
        <TabPane tab="Upload Files" key="upload">
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card title="Upload New Files">
                <Dragger {...uploadProps}>
                  <p className="ant-upload-drag-icon">
                    <CloudUploadOutlined className="text-4xl text-primary" />
                  </p>
                  <p className="ant-upload-text">Click or drag Excel files here</p>
                  <p className="ant-upload-hint">Configuration required before upload (table name).</p>
                </Dragger>

                {isUploading && (
                  <div className="mt-4">
                    <div className="flex justify-between mb-2">
                      <span>Upload Progress</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress percent={uploadProgress} status="active" />
                  </div>
                )}

                <div className="space-y-2 mt-3">
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
                      Target table: <b>{uploadConfig.tableName}</b>
                    </div>
                  )}
                </div>
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card title="Uploaded Files (Session)">
                <Table
                  columns={fileColumns}
                  dataSource={uploadedFiles}
                  pagination={{ pageSize: 10 }}
                  scroll={{ x: 700 }}
                />
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>

      {/* Inline configuration modal */}
      <Modal
        open={isUploadModalVisible}
        onCancel={() => setIsUploadModalVisible(false)}
        onOk={() => (document.getElementById('upload-config-submit') as HTMLButtonElement)?.click()}
        title="Upload Configuration"
      >
        <ConfigForm
          defaultValues={uploadConfig}
          onSubmit={handleUploadConfiguration}
        />
      </Modal>
    </div>
  );
};

const ConfigForm = ({ defaultValues, onSubmit }: { defaultValues?: any; onSubmit: (v: any) => void }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} layout="vertical" onFinish={onSubmit} initialValues={defaultValues}>
      <Form.Item name="tableName" label="Target Table Name" rules={[{ required: true, message: 'Table name is required' }]}>
        <Input placeholder="e.g., claims_837_stage" />
      </Form.Item>
      {/* Keep these in case you want them later */}
      <Form.Item name="organization" label="Organization">
        <Input placeholder="e.g., SSB-IDS" />
      </Form.Item>
      <Form.Item name="fileType" label="File Type">
        <Select allowClear options={[{ value: '835', label: '835 (Remittance)' }, { value: '837', label: '837 (Claims)' }]} />
      </Form.Item>
      <button id="upload-config-submit" type="submit" style={{ display: 'none' }} />
    </Form>
  );
};

export default UploadFiles;

