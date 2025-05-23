import React from 'react'
import styles from './CityItem.module.css'
import { Link } from 'react-router-dom';
import { useCities } from '../contexts/CitiesContext';


const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format(new Date(date));

export default function CityItem({ city }) {
    const {currentCity, deleteCity} = useCities();
    const { cityName, emoji, date ,id, position} = city;
    // console.log("Emoji:", emoji);

    function handleClick(e){
        e.preventDefault();
        deleteCity(id);
    }

    return (
        <li>
            <Link className={`${styles.cityItem} ${currentCity.id === id ? styles['cityItem--active'] : ''}`} to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
                {/* <span className={styles.emoji}>{emoji}</span> */}
                <img
                        className={styles.emoji}
                        src={`https://flagcdn.com/24x18/${emoji.toLowerCase()}.png`}
                        alt=''
                    />
                <h3 className={styles.name}>{cityName}</h3>
                <time className={styles.date}>{formatDate(date)}</time>
                <button className={styles.deleteBtn} onClick={handleClick}>&times;</button>
            </Link>
        </li>
    )
}
