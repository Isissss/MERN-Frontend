import React from 'react';
import { useState, useEffect } from 'react';
import './scss/styles.scss';
import { Layout } from './Layout';
import { CardDetail } from './Card/CardDetail';
import { Error } from './Error';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { EditCard } from './Card/EditCard';
import { CreateCard } from './Card/CreateCard';
import { BoardLayout } from './BoardLayout';


export const ThemaContext = React.createContext();

export function App() {
    const [cards, setCards] = useState([]);
    const [pagination, setPagination] = useState([]);
    const [start, setStart] = useState(0);
    const setNew = (url) => {
        setUrl(url)
    }
    const [url, setUrl] = useState('https://prg06.iettech.nl/lists ');

    const loadCards = () => {
        fetch(url, {
            method: 'get',
            headers: {
                Accept: 'application/json',
            },
        })
            .then((data) => data.json())
            .then((data) => test(data))
            .catch((error) => console.log(error));

    };
    useEffect(loadCards, [url]);
    const test = (data) => {
        setCards(data.items);
        setPagination(data.pagination);
    }
    return (
        <React.StrictMode>
            < BrowserRouter >
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route path="/cards" element={<BoardLayout cards={cards} pagination={pagination} cardRefreshHandler={() => loadCards()} changePageHandler={setNew} />}>
                            {/* <Route path="create" element={<CardForm cardRefreshHandler={() => loadJson()} />} /> */}
                            <Route path=":id/create" element={<CreateCard cards={cards} cardRefreshHandler={() => loadCards()} />} />
                            <Route path=":id/edit" element={<EditCard cards={cards} cardRefreshHandler={() => loadCards()} />} />
                            <Route path=":id" element={<CardDetail cards={cards} cardRefreshHandler={() => loadCards()} />} />
                        </Route>
                        <Route path="*" element={<Error />} />
                    </Route>

                </Routes>
            </BrowserRouter >
        </React.StrictMode>
    );
}
