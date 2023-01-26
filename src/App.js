import React from 'react';
import { useState, useEffect } from 'react';
import './scss/styles.scss';
import { Layout } from './components/Layout';
import { CardDetail } from './components/Card/CardDetail';
import { Error } from './components/Error';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { EditCard } from './components/Card/EditCard';
import { CreateCard } from './components/Card/CreateCard';
import { BoardLayout } from './components/BoardLayout';


export const ThemaContext = React.createContext();

export function App() {
    const [board, setBoard] = useState([]);
    const [pagination, setPagination] = useState([]);
    const [url, setUrl] = useState('https://prg06.iettech.nl/lists');

    const loadBoard = () => {
        fetch(url, {
            method: 'get',
            headers: {
                Accept: 'application/json',
            },
        })
            .then((data) => data.json())
            .then((data) => handleResponse(data))
            .catch((error) => console.log(error));

    };
    useEffect(loadBoard, [url]);

    const handleResponse = (data) => {
        setBoard(data.items);
        setPagination(data.pagination);
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/cards" element={<BoardLayout lists={board} pagination={pagination} cardRefreshHandler={() => loadBoard()} changePageHandler={setUrl} />}>
                        <Route path=":id/create" element={<CreateCard lists={board} cardRefreshHandler={() => loadBoard()} />} />
                        <Route path=":id/edit" element={<EditCard lists={board} cardRefreshHandler={() => loadBoard()} />} />
                        <Route path=":id" element={<CardDetail lists={board} cardRefreshHandler={() => loadBoard()} />} />
                    </Route>
                    <Route path="*" element={<Error />} />
                </Route>
            </Routes>
        </BrowserRouter>

    );
}
