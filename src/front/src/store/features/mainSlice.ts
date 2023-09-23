/// @ts-nocheck
// Typescript checking was disabled due to windows.api

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MainInitialStateTypes } from "../../types";
import { constants } from "../../assets/constants";

export const getDeviceInfoAsync = createAsyncThunk("main/getDeviceInfoAsync", async () => {
    const deviceInfoData = await window.api.profile.get_os_info();
    return deviceInfoData;
});

export const getTariffListAsync = createAsyncThunk("account/getTariffListAsync", async ({ token }: { token: string }) => {
    const response = await fetch(process.env.REACT_APP_API_URL + constants.endpoints.getTariffList, {
        method: "GET",
        headers: {
            Authorization: token,
        },
    });
    let data = await response.json();
    if (data.message) {
        throw new Error(data.message);
    }
    return Object.keys(data).map((tariffName) => ({
        name: tariffName,
        ...data[tariffName],
    }));
});

const initialState: MainInitialStateTypes = {
    mainLoading: false,
    tariffList: [],
    deviceInfo: {
        os: {
            type: "",
            release: "",
            platform: "",
        },
        cpu: [
            {
                model: "",
                speed: NaN,
                times: {
                    user: NaN,
                    nice: NaN,
                    sys: NaN,
                    idle: NaN,
                    irq: NaN,
                },
            },
        ],
        hash: "",
    },
};

const mainSlice = createSlice({
    name: "main",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getDeviceInfoAsync.fulfilled, (state, action) => {
                state.deviceInfo = action.payload;
            })
            .addCase(getTariffListAsync.pending, (state) => {
                state.mainLoading = true;
            })
            .addCase(getTariffListAsync.fulfilled, (state, action) => {
                state.mainLoading = false;
                state.tariffList = action.payload;
            })
            .addCase(getTariffListAsync.rejected, (state, action) => {
                state.mainLoading = false;
            });
    },
});

export default mainSlice.reducer;
