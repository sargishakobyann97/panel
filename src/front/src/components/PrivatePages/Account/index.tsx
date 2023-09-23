import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../store";
import subscription_media from "../../../assets/images/subscription_media.png";
import balance_media from "../../../assets/images/balance_media.png";
import devices_media from "../../../assets/images/devices_media.png";
import teams_media from "../../../assets/images/teams_media.png";
import styles from "./account.module.scss";
import LogoutIcon from "@mui/icons-material/Logout";
import SubscriptionInfo from "./accountPages/SubscriptionInfo";
import DevicesInfo from "./accountPages/DevicesInfo";
import TeamsInfo from "./accountPages/TeamsInfo";
import { logOutAsync } from "../../../store/features/accountSlice";

function Account() {
    const {
        account: { user, activeSub, token },
        main: { deviceInfo },
        account,
    } = useAppSelector((state) => state);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    const [openedPage, setOpenedPage] = useState("");
    const changeOpenedPageValue = (v: string = "") => {
        if (v === "subscription" && !activeSub.activated) return;
        setOpenedPage(v);
    };

    const logOut = () => dispatch(logOutAsync({ token, deviceInfo: { ...deviceInfo, hash: localStorage.getItem("hash") || "" } }));
    // console.log("account = ", account);

    return (
        <div className={styles.account_wrapper}>
            {openedPage === "subscription" && <SubscriptionInfo close={changeOpenedPageValue} />}
            {openedPage === "devices" && <DevicesInfo close={changeOpenedPageValue} />}
            {openedPage === "teams" && <TeamsInfo close={changeOpenedPageValue} />}
            <h2 className={styles.hi_user_name}>
                {t("account.user_name_hi")} <span>{user.name}</span>{" "}
                <LogoutIcon className={styles.log_out_btn} onClick={logOut} titleAccess="log out" />
            </h2>
            <div className={styles.account_pages_wrapper}>
                <div className={styles.account_first_row_wrapper}>
                    <div className={styles.subscription_sec_wrapper} onClick={() => changeOpenedPageValue("subscription")}>
                        <h2 className={styles.subscription_title}> {t("account.subscription")}</h2>
                        <p className={styles.subscription_sub_title}>
                            {t("account.your_active_subscription")}
                            <span>{activeSub.activated ? activeSub.type : t("sundry.none")}</span>
                        </p>
                        <span className={`${styles.subscription_active_btn} ${!activeSub.activated && styles.subscription_not_active_btn}`}>
                            {activeSub.activated ? t("sundry.active") : t("sundry.note_active")}
                        </span>
                        <img className={styles.subscription_media} src={subscription_media} alt="subscription_media" />
                    </div>
                    <div className={styles.balance_sec_wrapper}>
                        <p className={styles.balance_title}>{t("account.balance")}</p>
                        <p className={styles.balance_info}>{user.balance} $</p>
                        <p className={styles.balance_top_up_btn}>{t("account.top_up_btn")}</p>
                        <img className={styles.balance_media} src={balance_media} alt="balance_media" />
                    </div>
                </div>
                <div className={styles.account_second_row_wrapper}>
                    <div className={styles.devices_sec_wrapper} onClick={() => changeOpenedPageValue("devices")}>
                        <p className={styles.devices_title}>{t("sundry.devices")}</p>
                        <p className={styles.devices_info}>{t("account.your_active_devices")}</p>
                        <p className={styles.devices_manage_btn}>{t("sundry.manage")}</p>
                        <img className={styles.devices_media} src={devices_media} alt="devices_media" />
                    </div>
                    <div className={styles.teams_sec_wrapper} onClick={() => changeOpenedPageValue("teams")}>
                        <p className={styles.teams_title}>{t("sundry.teams")}</p>
                        <p className={styles.teams_info}>{t("account.your_active_team")}</p>
                        <p className={styles.teams_manage_btn}>{t("sundry.manage")}</p>
                        <img className={styles.teams_media} src={teams_media} alt="teams_media" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Account;
