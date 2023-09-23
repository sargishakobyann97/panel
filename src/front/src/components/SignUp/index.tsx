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
import { Link } from "react-router-dom";
import { constants } from "../../assets/constants";
import { registrationAsync } from "../../store/features/accountSlice";
import ConfirmCodeSent from "./ConfirmationCode";
import styles from "./sign_up.module.scss";

const initialFormDate = {
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
    isSigned: false,
};

function SignUp() {
    const dispatch = useAppDispatch();
    const {
        main: { deviceInfo },
        account: { confirmCodeSent },
    } = useAppSelector((state) => state);
    const [showPassword, setShowPassword] = useState(false);
    const { t } = useTranslation();
    const signUpData = useRef(initialFormDate);

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();
    const changeNameValue = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        signUpData.current.name = e.target.value;
    };
    const changeEmailValue = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        signUpData.current.email = e.target.value;
    };
    const changePasswordValue = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        signUpData.current.password = e.target.value;
    };
    const changeRepeatPasswordValue = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        signUpData.current.repeatPassword = e.target.value;
    };
    const changeSignedValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        signUpData.current.isSigned = e.target.checked;
    };
    const signUpHandleClick = () => {
        dispatch(registrationAsync({ formData: signUpData.current, deviceInfo }));
    };
    const keyListener = (e: KeyboardEvent) => e.key === "Enter" && signUpHandleClick();

    return (
        <div className={styles.sign_up_wrapper}>
            {confirmCodeSent && <ConfirmCodeSent name={signUpData.current.name} isSigned={signUpData.current.isSigned} />}
            <div className={styles.masq_logo_wrapper}>
                <div>
                    <img src={masq_logo_and_name} alt="masq_logo_and_name" />
                </div>
            </div>
            <div className={styles.sign_up_content_wrapper}>
                <div className={styles.sign_up_form_wrapper}>
                    <h2 className={styles.sign_up_title}>{t("sundry.signUp")}</h2>
                    <label htmlFor="nickName">{t("signUp.nickName")}</label>
                    <TextField
                        size="small"
                        className={styles.sign_up_email_or_name_inp}
                        id="nickName"
                        variant="outlined"
                        onChange={changeNameValue}
                        onKeyDown={keyListener}
                    />
                    <label htmlFor="email">{t("signUp.email")}</label>
                    <TextField
                        size="small"
                        className={styles.sign_up_email_or_name_inp}
                        id="email"
                        variant="outlined"
                        onChange={changeEmailValue}
                        onKeyDown={keyListener}
                    />
                    <label htmlFor="password">{t("signUp.password")}</label>
                    <OutlinedInput
                        size="small"
                        className={styles.sign_up_password_inp}
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
                    <label htmlFor="password">{t("signUp.repeatPassword")}</label>
                    <OutlinedInput
                        size="small"
                        className={styles.sign_up_password_inp}
                        type={showPassword ? "text" : "password"}
                        onChange={changeRepeatPasswordValue}
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
                    <div className={styles.stay_signed_in_wrapper}>
                        <FormControlLabel
                            control={<Checkbox defaultChecked={false} color="secondary" onChange={changeSignedValue} />}
                            label={t("signUp.stay_signed_in")}
                        />
                    </div>
                    <p className={styles.sign_up_btn} onClick={signUpHandleClick}>
                        {t("signUp.create_account_btn")}
                    </p>
                    <p className={styles.already_have_an_account_wrapper}>
                        <span>{t("signUp.already_have_an_account")}</span>
                        <Link to={constants.paths.home}>{t("sundry.signIn")}</Link>
                        <span></span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
