import { ADMIN } from "@/api-endpoints/admin";
import APIrequest from "@/services/axios";
import { BodyData, QueryParams } from "@/types";

const UserServices = {
    /**
     *
     * @returns
     * Function To handle user actions
     */
 
    GetUsers: async ({queryParams} : {queryParams: QueryParams}) => {
        try {
            const payload = {
                ...ADMIN.GET_USERS,
                queryParams
            };
            const res = await APIrequest(payload);
            return res;
        } catch (error) {
            console.log(error);

            throw error;
        }
    },

    UpdateUsers: async ({bodyData, userId}:{userId?: any, bodyData: BodyData}) => {
        try {
            const payload = {
                ...ADMIN.UPDATE_USER,
                bodyData
            };
            const res = await APIrequest(payload);
            return res;
        } catch (error) {
            console.log(error);

            throw error;
        }
    },

    DeleteUserById: async ({userId}:{userId?: any}) => {
        try {
            const payload = {
                ...ADMIN.DELETE_USER,
            };
            const res = await APIrequest(payload);
            return res;
        } catch (error) {
            console.log(error);

            throw error;
        }
    },

    ResetPasswordById: async ({userId, bodyData}:{userId?: any, bodyData: BodyData}) => {
        try {
            const payload = {
                ...ADMIN.RESET_PASSWORD,
                bodyData
            };
            const res = await APIrequest(payload);
            return res;
        } catch (error) {
            console.log(error);

            throw error;
        }
    },

  


};

export default UserServices