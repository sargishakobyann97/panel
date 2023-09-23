import { ConstantsTypes } from "../../types";

export const constants: Readonly<ConstantsTypes> = {
    paths: {
        home: "/", // this is the login section when not authorized, and if authorized, then the account section
        sign_up: "/sign_up",
        dashboardHome: "/home",
        profiles: "/profiles",
        proxy: "/proxy",
        account: "/account",
        cookies: "/cookies",
        store: "/store",
        notifications: "/notifications",
        settings: "/settings",
    },
    endpoints: {
        userLogin: "/v2/user/login",
        registration: "/v2/user/registration",
        confirmEmail: "/v2/user/confirmEmail/",
        userAuth: "/v2/user/auth/",
        getTariffList: "/user/getTariffList/",
        removeSession: "/v2/user/removeSession/",
        logOut: "/v2/user/logout/",
    },
};
