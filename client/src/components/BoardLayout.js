import { Outlet, useParams } from 'react-router-dom';
import { Board } from "./Board";
import { Pagination } from './Pagination';
import { useState, useEffect } from "react";
export function BoardLayout(props) {
    const params = useParams()
    const [board, setBoard] = useState([])
    const [loading, setLoading] = useState(true)
    const boardCall = () => {
        fetch(`https://prg06.iettech.nl/boards/${params.id}`, {
            method: 'get',
            headers: {
                Accept: 'application/json',
            },
        })
            .then((data) => data.json())
            .then((data) => setBoard(data[0]))
            .then(() => setLoading(false))
            .catch((error) => console.log(error));
    
    };

    useEffect(boardCall, []);
   
    return loading ? <div>Loading...</div> :  
     <div>
        <div>
            <Board lists={board} socket={props.socket}  cardRefreshHandler={() => boardCall()} />
            <Outlet />
        </div>
    </div >

    
}   