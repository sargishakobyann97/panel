import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import styles from "./teams.module.scss";
import { useTranslation } from "react-i18next";

function TeamsInfo({ close }: { close: Function }) {
    const { t } = useTranslation();

    return (
        <div className={styles.teams_wrapper}>
            <div className={styles.teams_content_bg}>
                <div className={styles.teams_content_wrapper}>
                    <span className={styles.back_to_account_btn} onClick={() => close()}>
                        <ArrowBackIosIcon sx={{ fontSize: "10px" }} /> <span>{t("account.subscriptionSec.back_btn")}</span>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default TeamsInfo;
