import { USER } from "@/api-endpoints";
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
                url: USER.LIST,
                method: 'GET' as const,
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
                url: USER.UPDATE.replace(':id', userId),
                method: 'PUT' as const,
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
                url: USER.DELETE.replace(':id', userId),
                method: 'DELETE' as const,
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