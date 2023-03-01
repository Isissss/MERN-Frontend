import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useState, createContext, useEffect } from 'react';
import useLogout from "../hooks/useLogout";
import useAuth from '../hooks/useAuth';

export const themeContext = createContext(null);

export function Layout(props) {
    const navigate = useNavigate();
    const { auth } = useAuth();
    const [theme, setTheme] = useState(localStorage.getItem("theme") ? JSON.parse(localStorage.getItem("theme")) : "blue");
    const logout = useLogout();

    const signOut = async () => {
        await logout();
        navigate("/login");

    }


    return <themeContext.Provider value={{ theme, setTheme }}> <div className={`${theme}`}>
        <header>
            <div className="header">
                <div className='d-flex align-items-center'><h3 id="logo" className="text-decoration-underline"> Ping.dev  </h3>  {auth.accessToken && <span className="mx-3"> <Link to="/"> View boards </Link>  </span>} </div>

                {auth.accessToken && <div className="d-flex align-items-center">
                    <span className="me-1"> Welcome back, {auth.username}! </span>
                    <Link to="/login" onClick={signOut}> Logout</Link>
                </div>
                }

            </div>
        </header>


        <div >
            <Outlet />
        </div>
    </div >
    </themeContext.Provider >
}