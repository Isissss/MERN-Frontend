import { useRef, useState, useEffect } from "react";
import axios from '../api/axios';
import { Link } from "react-router-dom";

const REGISTER_URL = '/register';

export function Register() {
    const userRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState('');

    const [password, setpassword] = useState('');

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ username, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            setSuccess(true);

            setUsername('');
            setpassword('');

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
                        <Link to="/login"> Sign-in </Link>
                    </p>
                </section>
            ) : (
                <section>

                    <h1>Register</h1>

                    <div
                        className="error"
                        ref={errRef}

                    >
                        {errMsg}
                    </div>

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
                            autoComplete="off"
                            onChange={(e) => setpassword(e.target.value)}
                            value={password}
                            required

                            aria-describedby="passwordnote"

                        />

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


