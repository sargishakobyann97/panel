import { useState, useEffect, useRef, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { constants } from "../../assets/constants";
import { useTranslation } from "react-i18next";
import AsideHomeLogo from "../../assets/images/svg/AsideHomeLogo";
import AsideProfilesLogo from "../../assets/images/svg/AsideProfilesLogo";
import AsideProxyLogo from "../../assets/images/svg/AsideProxyLogo";
import AsideAccountLogo from "../../assets/images/svg/AsideAccountLogo";
import AsideCookiesLogo from "../../assets/images/svg/AsideCookiesLogo";
import AsideStoreLogo from "../../assets/images/svg/AsideStoreLogo";
import AsideNotificationsLogo from "../../assets/images/svg/AsideNotificationsLogo";
import AsideSettingsLogo from "../../assets/images/svg/AsideSettingsLogo";
import MasqLogo from "../../assets/images/svg/MasqLogo";
import styles from "./dashboard.module.scss";
import { useAppDispatch, useAppSelector } from "../../store";
import { getTariffListAsync } from "../../store/features/mainSlice";

type BoxProps = {
    children: React.ReactNode;
};

function Dashboard(props: BoxProps) {
    const dispatch = useAppDispatch();
    const {
        main: { tariffList },
        account: { token },
    } = useAppSelector((state) => state);
    const { t } = useTranslation();
    const ref = useRef<HTMLDivElement>(null);
    const [asideWidth, setAsideWidth] = useState(280);
    const [routeIndex, setRouteIndex] = useState(3);
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const changeAsideWidth = () => {
        // Sidebar shrinks when double clicked
        if (ref.current) {
            const newW = asideWidth === 280 ? 105 : 280;
            ref.current.style.gridTemplateColumns = `${newW}px 1fr`;
            setAsideWidth(newW);
        }
    };
    const full = asideWidth === 280;
    const asideItems = useMemo(
        () => [
            {
                logo: (fill: boolean) => <AsideHomeLogo fill={fill} />,
                path: constants.paths.dashboardHome,
                name: t("mainAside.dashboardHome"),
            },
            {
                logo: (fill: boolean) => <AsideProfilesLogo fill={fill} />,
                path: constants.paths.profiles,
                name: t("mainAside.profiles"),
            },
            {
                logo: (fill: boolean) => <AsideProxyLogo fill={fill} />,
                path: constants.paths.proxy,
                name: t("mainAside.proxy"),
            },
            {
                logo: (fill: boolean) => <AsideAccountLogo fill={fill} />,
                path: constants.paths.account,
                name: t("mainAside.account"),
            },
            {
                logo: (fill: boolean) => <AsideCookiesLogo fill={fill} />,
                path: constants.paths.cookies,
                name: t("mainAside.cookies"),
            },
            {
                logo: (fill: boolean) => <AsideStoreLogo fill={fill} />,
                path: constants.paths.store,
                name: t("mainAside.store"),
            },
            {
                logo: (fill: boolean) => <AsideNotificationsLogo fill={fill} />,
                path: constants.paths.notifications,
                name: t("mainAside.notifications"),
            },
            {
                logo: (fill: boolean) => <AsideSettingsLogo fill={fill} />,
                path: constants.paths.settings,
                name: t("mainAside.settings"),
            },
        ],
        [t]
    );

    const clickToAsideLink = (i: number, path: string) => {
        if (path === pathname) {
            setTimeout(() => {
                navigate("/none");
            }, 0);
            setTimeout(() => {
                navigate(path);
            }, 1);
        }
        setRouteIndex(i);
    };

    useEffect(() => {
        !tariffList.length && dispatch(getTariffListAsync({ token }));
    }, [dispatch, tariffList.length, token]);

    useEffect(() => {
        const pathIndex = {
            "/home": 0,
            "/profiles": 1,
            "/proxy": 2,
            "/account": 3,
            "/cookies": 4,
            "/store": 5,
            "/notifications": 6,
            "/settings": 7,
        };
        const index = pathIndex[pathname as keyof typeof pathIndex];
        index !== routeIndex && setRouteIndex(index);
    }, [pathname, routeIndex]);

    return (
        <div ref={ref} className={styles.dashboard_wrapper}>
            <div className={styles.main_aside} onDoubleClick={changeAsideWidth}>
                <div className={styles.masq_logo_wrapper}>
                    <MasqLogo full={full} />
                </div>
                {asideItems.map((el, i) => (
                    <div key={i} className={styles.aside_item}>
                        <Link to={el.path} onClick={() => clickToAsideLink(i, el.path)}>
                            {el.logo(routeIndex === i)}
                            {full && <span className={`${routeIndex === i && styles.selected_aside_item}`}>{el.name}</span>}
                        </Link>
                    </div>
                ))}
                <p>
                    <span>
                        {new Date().getFullYear()} MASQ
                        <span className={styles.aside_shows_the_app_version}>
                            {t("sundry.version")} {process.env.REACT_APP_APP_VERSION}
                        </span>
                    </span>
                </p>
            </div>
            <main className={styles.main_container}>{props.children}</main>
        </div>
    );
}

export default Dashboard;
