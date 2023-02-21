import { useState } from 'react';
import axios from 'axios';
export function LoginPage(props) {
    const [user, setUser] = useState({ email: '', password: '' });
    const BASE_URL = 'https://prg06.iettech.nl/boards';



    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://prg06.iettech.nl/login', user)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => console.log(err));
    }


    return <div>


        <form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" onChange={(e) => onChange(e)} value={user.email} />

            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" onChange={(e) => onChange(e)} value={user.password} />

            <button type="submit" >Login</button>
        </form>

    </div >
}