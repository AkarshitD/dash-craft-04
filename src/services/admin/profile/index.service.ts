import { PROFILE } from "@/api-endpoints";
import APIrequest from "@/services/axios";
import { BodyData } from "@/types";
import { clearStorage } from "@/utils/common";

const ProfileServices = {
    /**
     *
     * @returns
     * Function To handle auth actions
     */
 
    GetProfile: async () => {
        try {
            const payload = {
                url: PROFILE.GET,
                method: 'GET' as const,
            };
            const res = await APIrequest(payload);
            return res;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    UpdateProfile: async ({bodyData}:{bodyData:BodyData}) => {
        try {
            const payload = {
                url: PROFILE.UPDATE,
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


};

export default ProfileServices