import React, { useEffect, useState } from "react";
import styles from "./Form.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BackButton from "./BackButton";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCities } from "../contexts/CitiesContext";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export default function Form() {
    const navigate = useNavigate();
    const { lat, lng } = useUrlPosition();
    const {createCity, isLoading} = useCities();
    const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
    const [cityName, setCityName] = useState("");
    const [country, setCountry] = useState("");
    const [emoji, setEmoji] = useState("");
    const [date, setDate] = useState(new Date());
    const [notes, setNotes] = useState("");
    const [geocodingError, setGeocodingError] = useState("");

    useEffect(
        function () {
            if (!lat && !lng) return;
            async function fetchCityData() {
                try {
                    setIsLoadingGeocoding(true);
                    setGeocodingError("");
                    const res = await fetch(
                        `${BASE_URL}?latitude=${lat}&longitude=${lng}`
                    );
                    const data = await res.json();
                    if (!data.countryCode)
                        throw new Error(
                            "That does not seem to be a city. Please click somewhere else"
                        );
                    setCityName(data.city || data.locality || "");
                    setCountry(data.countryName);
                    setEmoji(data.countryCode);
                } catch (err) {
                    setGeocodingError(err.message);
                } finally {
                    setIsLoadingGeocoding(false);
                }
            }
            fetchCityData();
        },
        [lat, lng]
    );

        async function handleSubmit(e){
            e.preventDefault();

            if(!cityName && !date) return;
            const newCity = {
                cityName,
                country,
                emoji,
                date,
                notes,
                position :{lat, lng},
            }
            await createCity(newCity);
            navigate('/app')
        }

    if (isLoadingGeocoding) return <Spinner />;
    if (geocodingError) return <Message message={geocodingError} />;
    if(!lat && !lng) return <Message message='Start by cliking somewhere on the map'/>
    return (
        <form className={`${styles.form} ${isLoading? styles.loading:''}` } onSubmit={handleSubmit}>
            <div className={styles.row}>
                <label htmlFor="cityName">City Name</label>
                <input
                    id="cityName"
                    value={cityName}
                    onChange={(e) => setCityName(e.target.value)}
                />
                {emoji && (
                    <img
                        className={styles.flag}
                        src={`https://flagcdn.com/24x18/${emoji.toLowerCase()}.png`}
                        alt=""
                    />
                )}
            </div>
            <div className={styles.row}>
                <label htmlFor="date">When did you go to {cityName}?</label>
                <DatePicker
                    id="date"
                    // dateFormat="EEE MMM dd yyyy HH:mm:ss 'GMT'xxx (zzzz)"
                    dateFormat='dd/MM/yyyy '
                    onChange={(date) => setDate(date)}
                    selected={date}
                ></DatePicker>
            </div>
            <div className={styles.row}>
                <label htmlFor="notes">Notes about your trip to {cityName}</label>
                <textarea
                    id="notes"
                    onChange={(e) => setNotes(e.target.value)}
                    value={notes}
                />
            </div>
            <div className={styles.buttons}>
                <Button type="primary">Add</Button>
                <BackButton/>
            </div>
        </form>
    );
}
