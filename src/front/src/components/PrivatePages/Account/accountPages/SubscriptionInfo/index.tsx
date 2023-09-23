import { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import subscription_media from "../../../../../assets/images/subscription_media.png";
import styles from "./subscription.module.scss";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../../../store";
import { Link } from "react-router-dom";
import { constants } from "../../../../../assets/constants";
import NonActiveSubscriptions from "./NonActiveSubscriptions";

function SubscriptionInfo({ close }: { close: Function }) {
    const { t } = useTranslation();
    const {
        account: {
            activeSub: { type, profileLimit, _id },
            subs,
        },
        main: { tariffList },
    } = useAppSelector((state) => state);

    const mySubscriptionPlan = tariffList.find((item) => item.name === type);
    const [showAllSubs, setShowAllSubs] = useState(false);
    const notActiveSubs = subs.filter((sb) => sb._id !== _id);

    const changeShowAllSubsValue = () => {
        if (notActiveSubs.length) {
            setShowAllSubs(true);
        }
    };

    return (
        <div className={styles.subscription_wrapper}>
            {showAllSubs && <NonActiveSubscriptions close={() => setShowAllSubs(false)} />}
            <div className={styles.subscription_content_bg}>
                <div className={styles.subscription_content_wrapper}>
                    <span className={styles.back_to_account_btn} onClick={() => close()}>
                        <ArrowBackIosIcon sx={{ fontSize: "10px" }} /> <span>{t("account.subscriptionSec.back_btn")}</span>
                    </span>
                    <div className={styles.active_subscription_wrapper}>
                        <div>
                            <img src={subscription_media} alt="subscription_media" />
                            <p>
                                {t("account.subscriptionSec.your_active_subscription")}
                                <span>{type}</span>
                            </p>
                            <p>
                                {t("account.subscriptionSec.the_cost_of_your_tariff_is")}
                                {mySubscriptionPlan?.price || "0"}
                            </p>
                        </div>
                        <Link to={constants.paths.profiles}>
                            <div className={styles.not_active_subscriptions}>
                                <p className={styles.available_profiles}>
                                    <span>{t("account.subscriptionSec.available_profiles")}</span>
                                    <span>{profileLimit || 0}</span>
                                    <span>{t("account.subscriptionSec.available_profiles_left")}</span>
                                </p>
                                <p className={styles.go_to_profiles_text}>{t("account.subscriptionSec.available_profiles_sub_title")}</p>
                                <p className={styles.active_sub_manage_btn}>{t("sundry.manage")}</p>
                            </div>
                        </Link>
                    </div>
                    <div className={styles.not_active_subscriptions_btn} onClick={changeShowAllSubsValue}>
                        <p className={styles.not_active_subscriptions_title}>
                            {t("account.subscriptionSec.not_active_subscriptions_title")} <small>({notActiveSubs.length})</small>
                        </p>
                        <p className={styles.not_active_subscriptions_sub_title}>{t("account.subscriptionSec.not_active_subscriptions_sub_title")}</p>
                        {!!notActiveSubs.length && <p className={styles.not_active_subscriptions_view_btn}>{t("sundry.view")}</p>}
                    </div>
                    <div className={styles.other_subscriptions_and_options}>{t("account.subscriptionSec.other_subscriptions_and_options")}</div>
                    <div className={styles.stop_subscription}>{t("account.subscriptionSec.stop_subscription")}</div>
                </div>
            </div>
        </div>
    );
}

export default SubscriptionInfo;
