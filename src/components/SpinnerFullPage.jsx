import React from "react";
import styles from "./SpinnerFullPage.module.css";
import Spinner from "./Spinner";

export default function SpinnerFullPage() {
    return (
        <div className={styles.spinnerFullpage}>
            <Spinner />
        </div>
    );
}
