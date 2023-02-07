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
    const [pagination, setPagination] = useState([]);
    const id = `https://prg06.iettech.nl/boards/${params.id}`;

    const [url, setUrl] = useState("");

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

    const loadBoard = () => {
        if (!url) return

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
        return console.log(data);
        setLists(data.items);
        setPagination(data.pagination);
    }


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    // Board
                    <Route path="board/:id" element={<BoardLayout lists={lists} pagination={pagination} socket={socket} cardRefreshHandler={() => loadBoard()} changePageHandler={setUrl} />}>
                        {/* <Route path=":id/create" element={<CreateCard lists={lists} socket={socket} cardRefreshHandler={() => loadBoard()} />} />
                        <Route path=":id/edit" element={<EditCard lists={lists} socket={socket} cardRefreshHandler={() => loadBoard()} />} />
                        <Route path="c/:id" element={<CardDetail lists={lists} cardRefreshHandler={() => loadBoard()} />} /> */}
                    </Route>

                    <Route path="*" element={<Error />} />
                </Route>
            </Routes>
        </BrowserRouter>

    );
}
