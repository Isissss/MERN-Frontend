import React from 'react';
import { useState, useEffect } from 'react';
import './scss/styles.scss';
import { Layout } from './components/Layout';
import { CardDetail } from './components/Card/CardDetail';
import { Error } from './Pages/Error';
import { Home } from './Pages/Home';
import { BrowserRouter, useParams, Routes, Route } from 'react-router-dom';
import { EditCard } from './components/Card/EditCard';
import { CreateCard } from './components/Card/CreateCard';
import { BoardLayout } from './components/BoardLayout';
import io from 'socket.io-client';

export const ThemaContext = React.createContext();


export function App() {
    const [lists, setLists] = useState([]);
    const [board, setBoard] = useState([])

    const socket = io.connect('http://localhost:3000');
    const params = useParams()

    useEffect(() => {
        return () => {
            socket.off('update');
            socket.on('joinroom');
            socket.off('sendUpdate');
            socket.off('connect');
            socket.off('disconnect');
        };
    }, []);

    // const loadBoard = async (t) => {
    //     console.log('update')
    //     if (!t) return


    //     fetch(`https://prg06.iettech.nl/boards/${t}`, {
    //         method: 'get',
    //         headers: {
    //             Accept: 'application/json',
    //         },
    //     })
    //         .then((data) => data.json())
    //         .then((data) => handleResponse(data))
    //         .catch((error) => console.log(error));

    // };


    // const handleResponse = (data) => {
    //     setBoard(data[0]._id);
    // }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/" index element={<Home />} />
                    <Route path="board/:id" element={<BoardLayout socket={socket} />}>
                        <Route path="list/:listId/create" element={<CreateCard socket={socket} />} />
                        <Route path="card/:cardId/edit" element={<EditCard socket={socket} />} />
                        <Route path="card/:cardId" element={<CardDetail />} />
                    </Route>
                    <Route path="*" element={<Error />} />
                </Route>
            </Routes>
        </BrowserRouter>

    );
}
