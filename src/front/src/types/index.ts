export interface ConstantsTypes {
    paths: {
        home: "/"; // this is the login section when not authorized, and if authorized, then the account section
        sign_up: "/sign_up";
        dashboardHome: "/home";
        profiles: "/profiles";
        proxy: "/proxy";
        account: "/account";
        cookies: "/cookies";
        store: "/store";
        notifications: "/notifications";
        settings: "/settings";
    };
    endpoints: {
        userLogin: "/v2/user/login";
        registration: "/v2/user/registration";
        confirmEmail: "/v2/user/confirmEmail/";
        userAuth: "/v2/user/auth/";
        getTariffList: "/user/getTariffList/";
        removeSession: "/v2/user/removeSession/";
        logOut: "/v2/user/logout/";
    };
}

export interface ActiveSubTypes {
    type: string;
    buyTime: number;
    duration: number;
    userLimit: number;
    profileLimit: number;
    users: string[];
    owner: string;
    activated: boolean;
    ended: boolean;
    _id: string;
    end: number;
    start: number;
}

export interface AccountInitialStateTypes {
    accountLoading: boolean;
    confirmCodeSent: null;
    user: {
        name: string;
        email: string;
        balance: number;
        type: boolean;
        messages: {
            header: string;
            headerRus: string;
            text: string;
            textRus: string;
            usersType: string;
            buttonName: string;
            buttonNameRus: string;
            buttonUrl: string;
            _id: string;
        }[];
        emailConfirmed: boolean;
        sessions: {
            os: string;
            cpu: string;
            app: string;
            hash: string;
        }[];
    };
    subs: {
        type: string;
        buyTime: number;
        duration: number;
        userLimit: number;
        profileLimit: number;
        users: string[];
        owner: string;
        activated: boolean;
        ended: boolean;
        _id: string;
        end: number;
        start: number;
    }[];
    teams: {
        inviteCode: string;
        name: string;
        owner: string;
        userCount: number;
        userLimit: number;
        activeSub: ActiveSubTypes;
        subs: ActiveSubTypes;
    }[];
    activeSub: ActiveSubTypes;
    token: string;
    hash: string;
}

export interface DeviceInfoTypes {
    os: {
        type: string;
        release: string;
        platform: string;
    };
    cpu: {
        model: string;
        speed: number;
        times: {
            user: number;
            nice: number;
            sys: number;
            idle: number;
            irq: number;
        };
    }[];
    hash: string;
}

export interface TariffListTypes {
    name: string;
    price: number;
    duration: number;
    userLimit: number;
    profileLimit: number;
    deviceLimit: number;
}

export interface MainInitialStateTypes {
    mainLoading: boolean;
    deviceInfo: DeviceInfoTypes;
    tariffList: TariffListTypes[];
}
