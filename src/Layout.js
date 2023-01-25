import { Link, Outlet } from 'react-router-dom';
import { useState, createContext, useEffect } from 'react';

export const themeContext = createContext(null);

export function Layout(props) {
    const [theme, setTheme] = useState(localStorage.getItem("theme") ? JSON.parse(localStorage.getItem("theme")) : "blue");

    useEffect(() => {
        // storing input name
        localStorage.setItem("theme", JSON.stringify(theme));
    }, [theme]);

    const toggleTheme = (e) => {
        if (e.target.value === theme || (e.target.value !== "blue" && e.target.value !== "purple" && e.target.value !== "black")) return;
        setTheme(e.target.value);
    };

    return <themeContext.Provider value={theme}> <div className={`${theme}`}>
        <header>
            <div className="header">
                <h3>React</h3> <Link to="/cards" className="btn btn-link">Cards</Link>
                <div className="colorPicker">
                    <input type="radio" id="blue" name="color" defaultChecked={theme === "blue"} value="blue" onClick={toggleTheme} />
                    <input type="radio" id="black" name="color" defaultChecked={theme === "black"} value="black" onClick={toggleTheme} />
                    <input type="radio" id="purple" name="color" defaultChecked={theme === "purple"} value="purple" onClick={toggleTheme} />
                </div>
            </div>
        </header>
        <div>
            <Outlet />
        </div>
    </div>
    </themeContext.Provider>
}