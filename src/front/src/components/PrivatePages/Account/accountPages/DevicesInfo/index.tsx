import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import styles from "./devices.module.scss";
import devices_media from "../../../../../assets/images/devices_media.png";
import windows_media from "../../../../../assets/images/windows_media.png";
import apple_media from "../../../../../assets/images/apple_media.png";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../../../store";
import { removeSessionAsync } from "../../../../../store/features/accountSlice";

function DevicesInfo({ close }: { close: Function }) {
    const { t } = useTranslation();
    const {
        account: {
            user: { sessions },
            token,
        },
        main: { deviceInfo },
    } = useAppSelector((state) => state);
    const dispatch = useAppDispatch();
    const isCurrentDevice = (hash: string): boolean => localStorage.getItem("hash") === hash;
    const unmatchDevice = (hash: string): void => {
        if (!isCurrentDevice(hash)) {
            dispatch(removeSessionAsync({ token, deviceInfo, hashToDelete: hash, myHash: localStorage.getItem("hash") || "" }));
        }
    };

    return (
        <div className={styles.devices_wrapper}>
            <div className={styles.devices_content_bg}>
                <div className={styles.devices_content_wrapper}>
                    <span className={styles.back_to_account_btn} onClick={() => close()}>
                        <ArrowBackIosIcon sx={{ fontSize: "10px" }} /> <span>{t("account.subscriptionSec.back_btn")}</span>
                    </span>
                    <div className={styles.devices_list_wrapper}>
                        <div className={styles.devices_list_header}>
                            <img src={devices_media} alt="devices_media" className={styles.devices_media} />
                            <p className={styles.devices_left_info}>
                                {t("sundry.devices")} •{" "}
                                <span>
                                    {2 - sessions.length} {t("account.devices.more_left")}
                                </span>
                            </p>
                            <p className={styles.devices_left_info_sub_title}>{t("account.devices.your_active_devices_text")}</p>
                        </div>
                        <div className={styles.devices_items_wrapper}>
                            {sessions.map((session) => (
                                <div className={styles.devices_item} key={session.hash}>
                                    {session.os.toLowerCase().includes("window") ? (
                                        <img className={styles.devices_item_media} src={windows_media} alt="windows_media" />
                                    ) : ["darwin", "macos"].some((os) => session.os.toLowerCase().includes(os)) ? (
                                        <img className={styles.devices_item_media} src={apple_media} alt="apple_media" />
                                    ) : (
                                        <div className={styles.indefinite_system}>?</div>
                                    )}

                                    <div className={styles.devices_item_body}>
                                        {isCurrentDevice(session.hash) && (
                                            <p className={styles.devices_item_current}>{t("account.devices.current_device")}</p>
                                        )}
                                        <p className={styles.devices_item_os}>{session.os}</p>
                                        <p className={styles.devices_item_version}>
                                            {session.cpu} / {session.app}
                                        </p>
                                    </div>
                                    {!isCurrentDevice(session.hash) && (
                                        <p className={styles.unmatch_btn} onClick={() => unmatchDevice(session.hash)}>
                                            {t("sundry.unmatch")}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DevicesInfo;
