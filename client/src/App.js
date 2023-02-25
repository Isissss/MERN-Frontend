import React from 'react';
import { useEffect, useState, createContext } from 'react';
import './scss/styles.scss';
import { Layout } from './components/Layout';
import { CardDetail } from './components/Card/CardDetail';
import { Error } from './Pages/Error';
import { Boards } from './Pages/Boards';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { EditCard } from './components/Card/EditCard';
import { LoginPage } from './Pages/LogIn';
import { CreateCard } from './components/Card/createCardForm';
import { Register } from './Pages/Register';
import { BoardLayout } from './components/BoardLayout';
import io from 'socket.io-client';
import UseTitle from './hooks/useTitle';
import RequireAuth from './components/RequireAuth';
import { PersistLogin } from './components/PersistLogin';
import { AuthProvider } from './context/AuthProvider';

export const ThemaContext = React.createContext();

export function App() {
    const socket = io.connect('http://localhost:3000');
    UseTitle('Trello');
    useEffect(() => {
        return () => {
            socket.off('update');
            socket.on('joinroom');
            socket.off('sendUpdate');
            socket.off('connect');
            socket.off('disconnect');
        };
    }, []);

    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<Register />} />

                        <Route element={<PersistLogin />}>
                            <Route element={<RequireAuth />}>
                                <Route path="/" index element={<Boards />} />
                                <Route path="board/:id" element={<BoardLayout socket={socket} />}>
                                    <Route path="list/:listId/create" element={<CreateCard socket={socket} />} />
                                    <Route path="card/:cardId/edit" element={<EditCard socket={socket} />} />
                                    <Route path="card/:cardId" element={<CardDetail />} />
                                </Route>
                            </Route>
                        </Route>
                        <Route path="*" element={<Error />} />
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter >

    );
}
