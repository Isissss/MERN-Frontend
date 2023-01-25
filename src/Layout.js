import { Outlet, Link } from 'react-router-dom';
import { Board } from "./Board";
import { BoardLayout } from './BoardLayout';
import { Button } from 'react-bootstrap';
import { useState, createContext } from 'react';

export const themeContext = createContext(null);

export function Layout(props) {
    const [theme, setTheme] = useState('blue');

    const toggleTheme = (e) => {
        setTheme(e.target.value); // if theme is light, set it to dark, else set it to light
    };

    return <themeContext.Provider value={theme}> <div className={`${theme}`}>
        <header>
            <div className="header">

                <h3> React</h3>
                <div className="colorPicker">
                    <input type="radio" id="blue" name="color" value="blue" className={theme} onClick={toggleTheme} />
                    <input type="radio" id="black" name="color" value="black" className={theme} onClick={toggleTheme} />
                    <input type="radio" id="purple" name="color" value="purple" className={theme} onClick={toggleTheme} />
                </div>
            </div>
        </header>
        <div>
            <Outlet />
        </div>
    </div>

    </themeContext.Provider >
}