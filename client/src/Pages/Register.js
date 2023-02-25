import { useRef, useState, useEffect } from "react";


import axios from '../api/axios';
import { Link } from "react-router-dom";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const password_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

export function Register() {
    const userRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState('');

    const [password, setpassword] = useState('');

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    // useEffect(() => {
    //     userRef.current.focus();
    // }, [])

    // useEffect(() => {
    //     setValidName(USER_REGEX.test(username));
    // }, [username])

    // useEffect(() => {
    //     setValidpassword(password_REGEX.test(password));
    //     setValidMatch(password === matchpassword);
    // }, [password, matchpassword])

    // useEffect(() => {
    //     setErrMsg('');
    // }, [username, password, matchpassword])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // // if button enabled with JS hack
        // const v1 = USER_REGEX.test(username);
        // const v2 = password_REGEX.test(password);
        // if (!v1 || !v2) {
        //     setErrMsg("Invalid Entry");
        //     return;
        // }
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ username, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            // TODO: remove console.logs before deployment
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response))
            setSuccess(true);
            //clear state and controlled inputs
            setUsername('');
            setpassword('');
            setMatchpassword('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                console.log(err.response);
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="#">Sign In</a>
                    </p>
                </section>
            ) : (
                <section>

                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">
                            Username:

                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            required

                            aria-describedby="uidnote"

                        />



                        <label htmlFor="password">
                            Password:

                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setpassword(e.target.value)}
                            value={password}
                            required

                            aria-describedby="passwordnote"

                        />



                        {/* <label htmlFor="confirm_password">
                            Confirm Password:

                        </label>
                        <input
                            type="password"
                            id="confirm_password"
                            onChange={(e) => setMatchpassword(e.target.value)}
                            value={matchpassword}
                            required

                            aria-describedby="confirmnote"
                 
                        /> */}

                        <button>Sign Up</button>
                    </form>
                    <p>
                        Already registered?<br />
                        <span className="line">
                            <Link to="/">Sign In</Link>
                        </span>
                    </p>
                </section>
            )}
        </>
    )
}


