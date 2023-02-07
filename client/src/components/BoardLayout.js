import { Outlet, useOutletContext } from "react-router-dom";
import { Board } from "./Board";
import { useState, useEffect } from 'react';
import { Pagination } from './Pagination';
import { useParams } from 'react-router-dom';

export function BoardLayout(props) {
    const params = useParams()
    const [board, setBoard] = useState([]);

    const boardCallFunc = () => {
        fetch(`https://prg06.iettech.nl/boards/${params.id}`, {
            method: 'get',
            headers: {
                Accept: 'application/json',
            },
        })
            .then((data) => data.json())
            .then((data) => setBoard(data))
            .catch((error) => console.log(error));
    }
    useEffect(boardCallFunc, []);
    return <div>
        <div>
            <Board board={board[0]} socket={props.socket} cardRefreshHandler={() => boardCallFunc()} />
            {/* <Pagination pagination={props.pagination} changePageHandler={props.changePageHandler} /> */}
            <Outlet context={() => boardCallFunc()} />
        </div>
    </div >
}   