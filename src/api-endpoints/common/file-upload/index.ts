import { defineAPIConfig } from '@/utils/common';

const FILEUPLOAD = defineAPIConfig({
UPLOAD_FILE: () => ({
url: `/api/FileUpload/upload`,
method: 'POST',
}),
});


export default FILEUPLOAD;