import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { constants } from "../../assets/constants";
import { AccountInitialStateTypes, DeviceInfoTypes } from "../../types";

export const loginAsync = createAsyncThunk(
    "account/loginAsync",
    async ({
        formData: { name, password, isSigned },
        deviceInfo,
    }: {
        formData: { name: string; password: string; isSigned: boolean };
        deviceInfo: DeviceInfoTypes;
    }) => {
        const response = await fetch(process.env.REACT_APP_API_URL + constants.endpoints.userLogin, {
            method: "POST",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                os: `${deviceInfo.os.platform} ${deviceInfo.os.type} ${deviceInfo.os.release}`,
                cpu: deviceInfo.cpu[0].model,
                app: "MASQ Panel " + process.env.REACT_APP_APP_VERSION,
                hash: deviceInfo.hash,
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify({
                name,
                password,
            }),
        });
        const data = await response.json();
        if (data.message) throw new Error(data.message);
        data.isSigned = isSigned;
        data.hash = deviceInfo.hash;
        return data;
    }
);

export const logOutAsync = createAsyncThunk("account/logOutAsync", async ({ token, deviceInfo }: { token: string; deviceInfo: DeviceInfoTypes }) => {
    const response = await fetch(process.env.REACT_APP_API_URL + constants.endpoints.logOut, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
            os: `${deviceInfo.os.platform} ${deviceInfo.os.type} ${deviceInfo.os.release}`,
            cpu: deviceInfo.cpu[0].model,
            app: "MASQ Panel " + process.env.REACT_APP_APP_VERSION,
            hash: deviceInfo.hash,
        },
    });
    const data = await response.json();
    if (data.message) throw new Error(data.message);
    return data;
});

export const loginByTokenAsync = createAsyncThunk(
    "account/loginByTokenAsync",
    async ({ token, deviceInfo }: { token: string; deviceInfo: DeviceInfoTypes }) => {
        const hash: string = localStorage.getItem("hash") || "";
        const response = await fetch(process.env.REACT_APP_API_URL + constants.endpoints.userAuth, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
                os: `${deviceInfo.os.platform} ${deviceInfo.os.type} ${deviceInfo.os.release}`,
                cpu: deviceInfo.cpu[0].model,
                app: "MASQ Panel " + process.env.REACT_APP_APP_VERSION,
                hash,
            },
        });
        const data = await response.json();
        if (data.message) throw new Error(data.message);
        data.token = token;
        data.hash = hash;
        return data;
    }
);

export const registrationAsync = createAsyncThunk(
    "account/registrationAsync",
    async ({
        formData: { name, email, password },
        deviceInfo,
    }: {
        formData: { name: string; email: string; password: string };
        deviceInfo: DeviceInfoTypes;
    }) => {
        const response = await fetch(process.env.REACT_APP_API_URL + constants.endpoints.registration, {
            method: "POST",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                os: `${deviceInfo.os.platform} ${deviceInfo.os.type} ${deviceInfo.os.release}`,
                cpu: deviceInfo.cpu[0].model,
                app: "MASQ Panel " + process.env.REACT_APP_APP_VERSION,
                hash: deviceInfo.hash,
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        });
        const data = await response.json();
        if (data.message) throw new Error(data.message);
        return data;
    }
);

export const confirmEmailAsync = createAsyncThunk(
    "account/confirmEmailAsync",
    async ({ confirmCode, deviceInfo, isSigned }: { confirmCode: string; deviceInfo: DeviceInfoTypes; isSigned: boolean }) => {
        const response = await fetch(process.env.REACT_APP_API_URL + constants.endpoints.confirmEmail + confirmCode, {
            method: "GET",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                os: `${deviceInfo.os.platform} ${deviceInfo.os.type} ${deviceInfo.os.release}`,
                cpu: deviceInfo.cpu[0].model,
                app: "MASQ Panel " + process.env.REACT_APP_APP_VERSION,
                hash: deviceInfo.hash,
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
        });
        const data = await response.json();
        if (data.message) throw new Error(data.message);
        data.isSigned = isSigned;
        data.hash = deviceInfo.hash;
        return data;
    }
);

export const removeSessionAsync = createAsyncThunk(
    "account/removeSessionAsync",
    async ({ token, deviceInfo, hashToDelete, myHash }: { token: string; deviceInfo: DeviceInfoTypes; hashToDelete: string; myHash: string }) => {
        const response = await fetch(process.env.REACT_APP_API_URL + constants.endpoints.removeSession, {
            method: "POST",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
                os: `${deviceInfo.os.platform} ${deviceInfo.os.type} ${deviceInfo.os.release}`,
                cpu: deviceInfo.cpu[0].model,
                app: "MASQ Panel " + process.env.REACT_APP_APP_VERSION,
                hash: myHash,
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify({
                hash: hashToDelete,
            }),
        });
        const data = await response.json();
        if (data.message) throw new Error(data.message);
        return data;
    }
);

const initialState: AccountInitialStateTypes = {
    accountLoading: false,
    confirmCodeSent: null,
    user: {
        name: "",
        email: "",
        balance: NaN,
        type: false,
        messages: [],
        emailConfirmed: false,
        sessions: [],
    },
    subs: [],
    teams: [],
    activeSub: {
        type: "",
        buyTime: NaN,
        duration: NaN,
        userLimit: NaN,
        profileLimit: NaN,
        users: [],
        owner: "",
        activated: false,
        ended: false,
        _id: "",
        end: NaN,
        start: NaN,
    },
    token: "",
    hash: "",
};

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        changeConfirmCodeSent(state, action) {
            state.confirmCodeSent = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.pending, (state) => {
                state.accountLoading = true;
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.accountLoading = false;
                state.user = action.payload.user;
                state.subs = action.payload.subs || [];
                state.activeSub = action.payload.activeSub || action.payload.teams?.[0]?.activeSub || {};
                state.token = "Bearer " + action.payload.token;
                state.hash = action.payload.hash;
                if (action.payload.isSigned) localStorage.setItem("token", "Bearer " + action.payload.token);
                localStorage.setItem("hash", action.payload.hash);
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.accountLoading = false;
            })
            .addCase(logOutAsync.pending, (state) => {
                state.accountLoading = true;
            })
            .addCase(logOutAsync.fulfilled, (state, action) => {
                state.accountLoading = false;
                state.confirmCodeSent = null;
                state.user = { ...initialState.user };
                state.subs = [];
                state.activeSub = { ...initialState.activeSub };
                state.token = "";
                localStorage.removeItem("hash");
                localStorage.removeItem("token");
            })
            .addCase(logOutAsync.rejected, (state, action) => {
                state.accountLoading = false;
            })
            .addCase(loginByTokenAsync.pending, (state) => {
                state.accountLoading = true;
            })
            .addCase(loginByTokenAsync.fulfilled, (state, action) => {
                state.accountLoading = false;
                state.user = action.payload.user;
                state.subs = action.payload.subs || [];
                state.token = action.payload.token;
                state.activeSub = action.payload.activeSub || action.payload.teams?.[0]?.activeSub || {};
                state.hash = action.payload.hash;
            })
            .addCase(loginByTokenAsync.rejected, (state, action) => {
                state.accountLoading = false;
            })
            .addCase(registrationAsync.pending, (state) => {
                state.accountLoading = true;
            })
            .addCase(registrationAsync.fulfilled, (state, action) => {
                state.accountLoading = false;
                state.confirmCodeSent = action.payload;
            })
            .addCase(registrationAsync.rejected, (state, action) => {
                state.accountLoading = false;
            })
            .addCase(confirmEmailAsync.pending, (state) => {
                state.accountLoading = true;
            })
            .addCase(confirmEmailAsync.fulfilled, (state, action) => {
                state.accountLoading = false;
                state.subs = action.payload.subs || [];
                state.token = "Bearer " + action.payload.token;
                state.user = action.payload.user;
                if (action.payload.isSigned) localStorage.setItem("token", "Bearer " + action.payload.token);
                localStorage.setItem("hash", action.payload.hash);
            })
            .addCase(confirmEmailAsync.rejected, (state, action) => {
                state.accountLoading = false;
            })
            .addCase(removeSessionAsync.pending, (state) => {
                state.accountLoading = true;
            })
            .addCase(removeSessionAsync.fulfilled, (state, action) => {
                state.accountLoading = false;
                state.user.sessions = action.payload;
            })
            .addCase(removeSessionAsync.rejected, (state, action) => {
                state.accountLoading = false;
            });
    },
});

export const { changeConfirmCodeSent } = accountSlice.actions;
export default accountSlice.reducer;
