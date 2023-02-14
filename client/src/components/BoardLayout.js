import { Outlet, useNavigate } from "react-router-dom";
import { Board } from "./Board";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export function BoardLayout(props) {
    const params = useParams()
    const [board, setBoard] = useState([]);
    const navigate = useNavigate();

    const handleError = (error) => {
        navigate('/', { replace: true })
    }

    const boardCallFunc = () => {
        fetch(`https://prg06.iettech.nl/boards/${params.id}`, {
            method: 'get',
            headers: {
                Accept: 'application/json',
            },
        })
            .then(function (response) {
                if (response.status !== 200) {
                    handleError(response);
                }
                return response;
            })
            .then((data) => data.json())
            .then((data) => setBoard(data))
            .catch((err) => handleError(err));
    }

    useEffect(boardCallFunc, []);

    useEffect(() => {
        props.socket.emit("joinRoom", params.id);

        props.socket.on('update', () => {
            boardCallFunc();

        });

        return () => {
            props.socket.off('update');
            props.socket.emit("leaveRoom", params.id);
        }

    }, []);


    return <div>
        <div>
            <Board board={board[0]} socket={props.socket} cardRefreshHandler={() => boardCallFunc()} />
            <Outlet context={boardCallFunc} />
        </div>
    </div >
}   