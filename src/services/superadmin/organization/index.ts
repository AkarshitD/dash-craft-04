import {ORGANIZATION } from "@/api-endpoints";
import Register from "@/pages/register";
import APIrequest from "@/services/axios";
import { BodyData } from "@/types";
import { clearStorage } from "@/utils/common";

const organization = {
    /**
     *
     * @returns
     * Function To handle auth actions
     */

    ORGANIZATION: async () => {
        try {
            clearStorage()
            const payload = {
                ...ORGANIZATION.GET_ORGANIZATION
            };
            const res = await APIrequest(payload);
            return res;
        } catch (error) {
            throw error;
        }
    },

//      Register: async ({ bodyData }: { bodyData: BodyData }) => {
//         try {
//             clearStorage()
//             const payload = {
//                 ...AUTH.REGISTER,
//                 bodyData,
//             };
//             const res = await APIrequest(payload);
//             return res;
//         } catch (error) {
//             throw error;
//         }
//     },

//     ForgotPassword: async ({ bodyData }: { bodyData: BodyData }) => {
//         try {
//             clearStorage()
//             const payload = {
//                 ...AUTH.FORGOT_PASSWORD,
//                 bodyData,
//             };
//             const res = await APIrequest(payload);
//             return res;
//         } catch (error) {
//             throw error;
//         }
//     },

//     VerifyOTP: async ({ bodyData }: { bodyData: BodyData }) => {
//         try {
//             clearStorage()
//             const payload = {
//                 ...AUTH.VERIFY_OTP,
//                 bodyData,
//             };
//             const res = await APIrequest(payload);
//             return res;
//         } catch (error) {
//             throw error;
//         }
//     },
    
//     ResentOTP: async ({ bodyData }: { bodyData: BodyData }) => {
//         try {
//             clearStorage()
//             const payload = {
//                 ...AUTH.RESEND_OTP,
//                 bodyData,
//             };
//             const res = await APIrequest(payload);
//             return res;
//         } catch (error) {
//             throw error;
//         }
//     },

//     ChangePassword: async ({ bodyData, userId }: { bodyData: BodyData, userId?: any }) => {
//         try {
//             const payload = {
//                 ...AUTH.CHANGE_PASSWORD(userId),
//                 bodyData,
//             };
//             const res = await APIrequest(payload);
//             return res;
//         } catch (error) {
//             throw error;
//         }
//     },

//     ResetPassword: async ({ bodyData, userId  }: { bodyData: BodyData,  userId?: number }) => {
//         try {
//             clearStorage()
//             const payload = {
//                 ...AUTH.RESET_PASSWORD(userId),
//                 bodyData,
//             };
//             const res = await APIrequest(payload);
//             return res;
//         } catch (error) {
//             throw error;
//         }
//     },

//     Logout: async ({ bodyData }: { bodyData: BodyData }) => {
//         try {
//             const payload = {
//                 ...AUTH.LOGOUT(),
                
//             };
//             const res = await APIrequest(payload);
//             return res;
//         } catch (error) {
//             throw error;
//         }
//     },


};

export default organization