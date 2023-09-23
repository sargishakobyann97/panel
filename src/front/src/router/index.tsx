import { Route, Routes } from "react-router-dom";
import { constants } from "../assets/constants";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import Dashboard from "../components/Dashboard";
import Account from "../components/PrivatePages/Account";
import Home from "../components/PrivatePages/Home";
import Profiles from "../components/PrivatePages/Profiles";
import Proxy from "../components/PrivatePages/Proxy";
import Cookies from "../components/PrivatePages/Cookies";
import Store from "../components/PrivatePages/Store";
import Notifications from "../components/PrivatePages/Notifications";
import Settings from "../components/PrivatePages/Settings";
import { useAppSelector } from "../store";

const publicRoutes = [
    { id: "SignIn", path: constants.paths.home, element: <SignIn /> },
    { id: "SignUp", path: constants.paths.sign_up, element: <SignUp /> },
    { id: "other", path: "*", element: <SignIn /> },
];
const privateRoutes = [
    { id: "Account_1", path: constants.paths.home, element: <Account /> },
    { id: "Home", path: constants.paths.dashboardHome, element: <Home /> },
    { id: "Profiles", path: constants.paths.profiles, element: <Profiles /> },
    { id: "Proxy", path: constants.paths.proxy, element: <Proxy /> },
    { id: "Account", path: constants.paths.account, element: <Account /> },
    { id: "Cookies", path: constants.paths.cookies, element: <Cookies /> },
    { id: "Store", path: constants.paths.store, element: <Store /> },
    { id: "Notifications", path: constants.paths.notifications, element: <Notifications /> },
    { id: "Settings", path: constants.paths.settings, element: <Settings /> },
    { id: "Settings", path: "/none", element: <></> },
    { id: "other", path: "*", element: <Account /> },
];

function Router() {
    const {
        account: {
            user: { emailConfirmed },
        },
    } = useAppSelector((state) => state);

    return emailConfirmed ? (
        <Dashboard>
            <Routes>
                {privateRoutes.map(({ path, element, id }) => (
                    <Route path={path} element={element} key={id} />
                ))}
            </Routes>
        </Dashboard>
    ) : (
        <Routes>
            {publicRoutes.map(({ path, element, id }) => (
                <Route path={path} element={element} key={id} />
            ))}
        </Routes>
    );
}

export default Router;
