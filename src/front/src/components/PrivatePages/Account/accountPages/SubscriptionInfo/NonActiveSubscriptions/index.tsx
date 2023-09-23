import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import styles from "./non_active_subscriptions.module.scss";
import subscription_media from "../../../../../../assets/images/subscription_media.png";

import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../../../../store";

function NonActiveSubscriptions({ close }: { close: Function }) {
    const { t } = useTranslation();

    const {
        account: { subs },
    } = useAppSelector((state) => state);

    return (
        <div className={styles.non_active_subscriptions_wrapper}>
            <div className={styles.non_active_subscriptions_content_bg}>
                <div className={styles.non_active_subscriptions_content_wrapper}>
                    <span className={styles.back_to_account_btn} onClick={() => close()}>
                        <ArrowBackIosIcon sx={{ fontSize: "10px" }} /> <span>{t("sundry.back")}</span>
                    </span>
                    {subs.map((sub, i) => (
                        <div className={styles.non_active_subs_item} key={sub._id}>
                            <div>
                                <img className={styles.subscription_media} src={subscription_media} alt="subscription_media" />
                                <p className={styles.non_active_subs_item_title}>
                                    {t("account.subscriptionSec.your_non_active_subscription")} <span>{sub.type}</span>
                                </p>
                                <p className={styles.non_active_subs_item_sub_title}>
                                    {t("account.subscriptionSec.the_subscription_plan_was_purchased_on")}
                                    {new Date(sub.buyTime).toLocaleString("en-US", { hour12: false }).replaceAll("/", ".")}
                                </p>
                            </div>
                            {!i && <div className={styles.first_non_active_subs}>{t("account.subscriptionSec.first_non_active_subs_text")}</div>}
                        </div>
                    ))}
                    <div className={styles.other_subscriptions_and_options}>{t("account.subscriptionSec.other_subscriptions_and_options")}</div>
                </div>
            </div>
        </div>
    );
}

export default NonActiveSubscriptions;
