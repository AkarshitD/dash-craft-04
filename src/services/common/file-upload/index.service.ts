import { FILEUPLOAD } from '@/api-endpoints';
import APIrequest from '@/services/axios';


const FileUploadServices = {
UploadFiles: async ({ bodyData, tableName }: { bodyData: FormData; tableName: string }) => {
try {
const base = FILEUPLOAD.UPLOAD_FILE();
const payload = {
...base,
url: `${base.url}?tableName=${encodeURIComponent(tableName)}`,
bodyData,
} as any;
const res = await APIrequest(payload);
return res;
} catch (error) {
console.log(error);
throw error;
}
},
};

export default FileUploadServices ;