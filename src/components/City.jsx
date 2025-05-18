import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./City.module.css";
import BackButton from "./BackButton";
import { useCities } from "../contexts/CitiesContext";
import Spinner from "./Spinner";

const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
        weekday: "long",
    }).format(new Date(date));

export default function City() {
    const { id } = useParams();
    const { getCity, currentCity, isLoading } = useCities();

    useEffect(
        function () {
            getCity(id);
        },
        [id, getCity]
    );
    if (isLoading || !currentCity) return <Spinner />;

    const { cityName, emoji, date, notes } = currentCity;
    if (isLoading) return <Spinner />;
    return (
        <div className={styles.city}>
            <div className={styles.row}>
                <h6>City Name</h6>
                <h3>
                    {emoji && (
                        <img
                            className={styles.emoji}
                            src={`https://flagcdn.com/24x18/${emoji.toLowerCase()}.png`}
                            alt={`${emoji} flag`}
                        />
                    )}
                    {cityName}
                </h3>
            </div>
            <div className={styles.row}>
                <h6>You went to {cityName} on</h6>
                <p>{formatDate(date || null)}</p>
            </div>
            {notes && (
                <div className={styles.row}>
                    <h6>Your notes</h6>
                    <p>{notes}</p>
                </div>
            )}
            <div className={styles.row}>
                <h6>Learn more</h6>
                <a
                    href={`https://en.wikipedia.org/wiki/${cityName}`}
                    target="_blank"
                    rel="noreferrer"
                >
                    Check out {cityName} on Wikipedia &rarr;
                </a>
            </div>
            <div>
                <BackButton />
            </div>
        </div>
    );
}
