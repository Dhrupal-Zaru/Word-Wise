import React from "react";
import styles from "./CountryItem.module.css";

export default function CountryItem({ country }) {
    return (
        <li className={styles.countryItem}>
            <img
                src={`https://flagcdn.com/24x18/${country.emoji.toLowerCase()}.png`}
                alt=""
            />
            <span>{country.country}</span>
        </li>
    );
}
