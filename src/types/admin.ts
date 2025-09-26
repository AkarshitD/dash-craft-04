export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    mobile_code: string | null;
    mobile_no: string | null;
    age: number | null;
    gender: string | null;
    profile_pic: string | null;
    role: number;
    role_name: string;
    is_active: boolean;
    last_login: string | null;
    is_email_verified: boolean;
    state: string | null,
}
