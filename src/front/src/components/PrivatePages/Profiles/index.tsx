import { useTranslation } from "react-i18next";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./profile.module.scss";

function Profiles() {
    const { t } = useTranslation();

    return (
        <div className={styles.profiles_wrapper}>
            <div className={styles.profiles_header}>
                <p>{t("sundry.profiles")}</p>
                <TextField
                    id={styles.outlined_start_adornment}
                    sx={{ m: 0, padding: 0, width: "257px", height: "30px" }}
                    placeholder="Search Profile, List"
                    InputProps={{
                        startAdornment: <SearchIcon sx={{ fontSize: "12px", marginRight: "7px", color: "#bbb8b8" }} />,
                    }}
                />
            </div>
            <p className={styles.your_profiles_title}>{t("profiles.your_profiles_title")}</p>
            <p className={styles.your_profiles_sub_title}>{t("profiles.your_profiles_sub_title")}</p>
            <div className={styles.profiles_all_lists_wrapper}>
                <div className={styles.create_new_list_btn}>
                    <p className={styles.list_item_name}>Create List</p>
                </div>
                <div className={styles.list_item}>
                    <p className={styles.list_item_name}>All Profiles</p>
                    <span></span>
                </div>
                <div className={styles.custom_lists_wrapper}></div>
            </div>
        </div>
    );
}

export default Profiles;
