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


const socket = io.connect('http://localhost:3000');

export const ThemaContext = React.createContext();


export function App() {
    const params = useParams()
    const [lists, setLists] = useState([]);
    const id = `https://prg06.iettech.nl/boards/${params.id}`;

    const [url, setUrl] = useState(id);
    const [board, setBoard] = useState([])
    useEffect(() => {
        socket.on('sendUpdate', () => {
            loadBoard();
        });

        return () => {
            socket.off('sendUpdate');
            socket.off('connect');
            socket.off('disconnect');
        };
    }, []);

    const loadBoard = (t) => {
        console.log(t)
        if (!t) return


        fetch(`https://prg06.iettech.nl/boards/${t}`, {
            method: 'get',
            headers: {
                Accept: 'application/json',
            },
        })
            .then((data) => data.json())
            .then((data) => handleResponse(data))
            .catch((error) => console.log(error));

    };

    useEffect(loadBoard, []);

    const handleResponse = (data) => {
        setBoard(data[0]._id);
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/" index element={<Home />} />
                    <Route path="board/:id" element={<BoardLayout board={board} socket={socket} setBoard={() => loadBoard()} />}>
                        <Route path="list/:listId/create" element={<CreateCard socket={socket} />} />
                        <Route path="card/:cardId/edit" element={<EditCard board={lists} socket={socket} />} />
                        <Route path="card/:cardId" element={<CardDetail board={lists} />} />
                    </Route>
                    <Route path="*" element={<Error />} />
                </Route>
            </Routes>
        </BrowserRouter>

    );
}
