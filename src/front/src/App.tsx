import Listeners from "./components/Listeners";
import Loading from "./components/Loader";
import Router from "./router";
import { useAppSelector } from "./store";

function App() {
    const {
        account: { accountLoading },
        main: { mainLoading },
    } = useAppSelector((state) => state);

    const loading = [accountLoading, mainLoading].some((l) => l);

    return (
        <div className="App">
            <Router />
            <Listeners />
            {loading && <Loading />}
        </div>
    );
}

export default App;
