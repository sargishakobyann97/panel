import { useRef, useState, KeyboardEvent } from "react";
import { useTranslation } from "react-i18next";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import masq_logo_and_name from "../../assets/images/masq_logo_and_name.svg";
import { useAppDispatch, useAppSelector } from "../../store";
import { loginAsync } from "../../store/features/accountSlice";
import { Link } from "react-router-dom";
import { constants } from "../../assets/constants";
import styles from "./sign_in.module.scss";

const initialFormDate = {
    name: "",
    password: "",
    isSigned: false,
};

function SignIn() {
    const dispatch = useAppDispatch();
    const {
        main: { deviceInfo },
    } = useAppSelector((state) => state);
    const [showPassword, setShowPassword] = useState(false);
    const { t } = useTranslation();

    const signInData = useRef(initialFormDate);

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();

    const changeNameValue = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        signInData.current.name = e.target.value;
    };
    const changePasswordValue = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        signInData.current.password = e.target.value;
    };
    const changeSignedValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        signInData.current.isSigned = e.target.checked;
    };

    const signInHandleClick = () => {
        dispatch(loginAsync({ formData: signInData.current, deviceInfo }));
    };
    const keyListener = (e: KeyboardEvent) => e.key === "Enter" && signInHandleClick();

    return (
        <div className={styles.sign_in_wrapper}>
            <div className={styles.masq_logo_wrapper}>
                <div>
                    <img src={masq_logo_and_name} alt="masq_logo_and_name" />
                </div>
            </div>
            <div className={styles.sign_in_content_wrapper}>
                <div className={styles.sign_in_form_wrapper}>
                    <h2 className={styles.sign_in_title}>{t("sundry.signIn")}</h2>
                    <label htmlFor="email_or_name">{t("signIn.nickOrEmail")}</label>
                    <TextField
                        size="small"
                        className={styles.sign_in_email_or_name_inp}
                        id="email_or_name"
                        variant="outlined"
                        onChange={changeNameValue}
                        onKeyDown={keyListener}
                    />
                    <label htmlFor="password">{t("signIn.password")}</label>
                    <OutlinedInput
                        size="small"
                        className={styles.sign_in_password_inp}
                        type={showPassword ? "text" : "password"}
                        onChange={changePasswordValue}
                        onKeyDown={keyListener}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    <div className={styles.forgot_password_wrapper}>
                        <FormControlLabel
                            control={<Checkbox defaultChecked={signInData.current.isSigned} color="secondary" onChange={changeSignedValue} />}
                            label={t("signIn.stay_signed_in")}
                        />
                        <p>{t("signIn.forgot_your_password")}</p>
                    </div>
                    <p className={styles.sign_in_btn} onClick={signInHandleClick}>
                        {t("sundry.signIn")}
                    </p>
                    <p className={styles.have_an_account_wrapper}>
                        <span>{t("signIn.don't_have_an_account")}</span>
                        <Link to={constants.paths.sign_up}>{t("sundry.signUp")}</Link>
                        <span></span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
