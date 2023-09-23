import styles from "./loader.module.scss";

function Loader() {
    return (
        <div className={styles.loader_wrapper}>
            <div id={styles.preloader}>
                <div id={styles.loader}></div>
            </div>
        </div>
    );
}

export default Loader;
