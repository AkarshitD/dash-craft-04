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
                ...PROFILE.GET_PROFILE(),
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
                ...PROFILE.UPDATE_PROFILE,
                bodyData
            };
            const res = await APIrequest(payload);
            return res;
        } catch (error) {
            console.log(error);

            throw error;
        }
    },

    UploadProfilePic: async ({ bodyData}:{bodyData:FormData}) => {
        try {
            const payload = {
                ...PROFILE.UPLOAD_PROFILE_PIC(),
                bodyData
            };
            const res = await APIrequest(payload);
            return res;
        } catch (error) {
            console.log(error);

            throw error;
        }
    },

    RemoveProfilePic: async ({bodyData}: {bodyData: BodyData}) => {
        try {
            const payload = {
                ...PROFILE.REMOVE_PROFILE_PIC(),
                bodyData
            };
            const res = await APIrequest(payload);
            return res;
        } catch (error) {
            console.log(error);

            throw error;
        }
    },

    GetMainDashboardData: async () => {
        try {
            const payload = {
                ...PROFILE.MAIN_DASHBOARD_DATA,
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