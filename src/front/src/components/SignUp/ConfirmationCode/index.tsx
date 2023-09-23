import { useState, KeyboardEvent } from "react";
import VerificationInput from "react-verification-input";
import masq_logo_and_name from "../../../assets/images/masq_logo_and_name.svg";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useTranslation } from "react-i18next";
import styles from "./confirmation_code.module.scss";
import { useAppDispatch, useAppSelector } from "../../../store";
import { changeConfirmCodeSent, confirmEmailAsync } from "../../../store/features/accountSlice";

function ConfirmCodeSent({ name, isSigned }: { name: string; isSigned: boolean }) {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const {
        main: { deviceInfo },
    } = useAppSelector((state) => state);
    const [confirmCode, setConfirmCode] = useState("");

    const confirmConfirmationCode = () => dispatch(confirmEmailAsync({ confirmCode: confirmCode.toUpperCase(), deviceInfo, isSigned }));
    const checkCtrlV = (e: KeyboardEvent<HTMLImageElement>) => {
        if (e.code === "KeyV" && !confirmCode) {
            e.preventDefault();
            window.navigator.clipboard.readText().then((clipText = "") => {
                if (clipText.trim().length < 11) setConfirmCode(clipText.trim().toUpperCase());
            });
        }
    };
    const backToSignUp = () => dispatch(changeConfirmCodeSent(null));

    return (
        <div className={styles.confirmation_code_wrapper}>
            <div className={styles.confirmation_code_content_wrapper}>
                <div>
                    <img src={masq_logo_and_name} alt="masq_logo_and_name" />
                    <p>{t("sundry.privacy_policy")}</p>
                </div>
                <div className={styles.confirm_content_wrapper} onKeyDown={checkCtrlV}>
                    <h2 className={styles.confirmation_title}>{t("signUp.confirmation.title")}</h2>
                    <p className={styles.confirmation_clue_text}>{t("signUp.confirmation.clue_text") + name}</p>
                    <VerificationInput
                        length={10}
                        autoFocus={true}
                        onChange={setConfirmCode}
                        value={confirmCode}
                        classNames={{
                            container: styles.vf_container,
                            character: styles.vf_character,
                            characterInactive: styles.vf_character_inactive,
                            characterSelected: styles.vf_character_selected,
                        }}
                    />
                    <p className={styles.confirmation_confirm_btn} onClick={confirmConfirmationCode}>
                        {t("sundry.confirm")}
                    </p>
                    <div>
                        <p onClick={backToSignUp}>
                            <ArrowBackIosIcon sx={{ fontSize: "12px" }} />
                            {t("signUp.confirmation.back_to_signUp")}
                        </p>
                        <p>{t("signUp.confirmation.send_code_again")}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConfirmCodeSent;
