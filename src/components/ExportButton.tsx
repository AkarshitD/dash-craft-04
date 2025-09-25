import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { message } from 'antd';

interface ExportButtonProps {
  data: any[];
  filename?: string;
  disabled?: boolean;
}

const ExportButton = ({ data, filename = 'export', disabled = false }: ExportButtonProps) => {
  const handleExport = () => {
    try {
      if (!data || data.length === 0) {
        message.warning('No data to export');
        return;
      }

      // Convert data to CSV
      const headers = Object.keys(data[0]);
      const csvContent = [
        headers.join(','),
        ...data.map(row => 
          headers.map(header => {
            const value = row[header];
            // Escape commas and quotes in CSV
            if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
              return `"${value.replace(/"/g, '""')}"`;
            }
            return value;
          }).join(',')
        )
      ].join('\n');

      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${filename}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      message.success('Data exported successfully');
    } catch (error) {
      message.error('Failed to export data');
    }
  };

  return (
    <Button
      type="default"
      icon={<DownloadOutlined />}
      onClick={handleExport}
      disabled={disabled}
      className="bg-primary text-white hover:bg-primary-dark border-primary"
    >
      Export
    </Button>
  );
};

export default ExportButton;