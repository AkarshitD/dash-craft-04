import { defineAPIConfig } from "@/utils/common";
const ORGANIZATION = defineAPIConfig({
    /**
     * Auth endpoints
     */
    GET_ORGANIZATION: {
        url: "api/Organization/all",
        method: "GET"
    },
//     REGISTER: {
//         url: "api/Auth/register/",
//         method: "POST"
//     },
    
//     FORGOT_PASSWORD: {
//         url: "auth/api/Auth/forgot-password/",
//         method: "POST"
//     },
//     VERIFY_OTP: {
//         url: "auth/api/Auth/verify-otp/",
//         method: "POST"
//     },
//     CHANGE_PASSWORD: (userId: number) =>  ({
//         url: `auth/api/Auth/change-password/${userId}`,
//         method: "POST"
//     }),
//     RESET_PASSWORD: (userId: number) =>  ({
//         url: `auth/api/Auth/reset-password/${userId}`,
//         method: "POST"
//     }),
//     LOGOUT: () =>  ({
//         url :`auth/api/Auth/logout`,
//         method: 'POST'
//     }),
//     RESEND_OTP : {
//         url: 'auth/api/Auth/resendOTP',
//         method: "POST"
//     }
})

export default ORGANIZATION