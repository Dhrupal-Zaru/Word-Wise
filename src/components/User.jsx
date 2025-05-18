import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/FakeAuthContext';
import styles from './User.module.css'

// const FAKE_USER ={
//     name:'DZ',
//     email:'dszaru@gmail.com',
//     password:'zaru#79',
//     avatar:'https://i.pravtar.cc/100?u=zz'
// };


export default function User() {
    const {user, logout} = useAuthContext();
    const navigate = useNavigate();

    function handleClick(){
        logout();
        navigate('/')
    }

    return (
        <div className={styles.user}>
            <img src={user.avatar} alt={user.name}/>
            <span>Welcome, {user.name}</span>
            <button onClick={handleClick}>Logout</button>
        </div>
    );
}
