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
                ...USER.GET_ALL_USER,
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
                ...USER.UPDATE_USER(userId),
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
                ...USER.DELETE_USER(userId),
            };
            const res = await APIrequest(payload);
            return res;
        } catch (error) {
            console.log(error);

            throw error;
        }
    },

    SuspendUserById: async ({userId, bodyData}:{userId?: any, bodyData: BodyData}) => {
        try {
            const payload = {
                ...USER.USER_SUSPEND(userId),
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