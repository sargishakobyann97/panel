import { useEffect } from "react";
import { getDeviceInfoAsync } from "../../store/features/mainSlice";
import { useAppDispatch, useAppSelector } from "../../store";
import { loginByTokenAsync } from "../../store/features/accountSlice";

function Listeners() {
    const dispatch = useAppDispatch();
    const {
        main: { deviceInfo },
    } = useAppSelector((state) => state);

    useEffect(() => {
        dispatch(getDeviceInfoAsync());
    }, [dispatch]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        deviceInfo.os.platform && token && dispatch(loginByTokenAsync({ token, deviceInfo }));
    }, [deviceInfo.os.platform]);
    return <></>;
}

export default Listeners;
