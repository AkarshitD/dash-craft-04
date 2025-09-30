import { defineAPIConfig } from "@/utils/common";

const PROFILE = defineAPIConfig({
    GET_PROFILE: () => ({
        url: `api/User/get-self-profile`,
        method: "GET"
    }),

    UPDATE_PROFILE: ({
        url: `auth/api/profile/`,
        method: "PUT"
    }),

    UPLOAD_PROFILE_PIC: () => ({
        url: `auth/api/profile/photo`,
        method: "POST"
    }),
    
    REMOVE_PROFILE_PIC: () => ({
        url: `auth/api/profile/photo`,
        method: "DELETE"
    }),

    MAIN_DASHBOARD_DATA: {
        url: 'auth/api/Admin/GetDashboardData',
        method: "GET"
    }

})

export default PROFILE