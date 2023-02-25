import { useEffect, useState } from 'react';
import { BoardList } from "../components/Board/BoardList"
import { NewBoard } from "../components/Board/createBoardForm"
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';

export function Boards() {
    const [boards, setBoards] = useState([]);
    const BASE_URL = 'https://prg06.iettech.nl/boards';
    const { auth } = useAuth();

    const getBoards = async () => {
        axios.get(BASE_URL, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${auth.accessToken}`
            },
            withCredentials: true
        }).then((res) => {
            setBoards(res.data.items)
        }).catch((err) => console.log(err));
    }

    useEffect(() => {
        getBoards();
    }, []);

    return <div>
        <h1 style={{
            marginLeft: 15
        }}>
            Boards
        </h1>

        <BoardList boards={boards} getBoards={() => getBoards()} />
        <NewBoard getBoards={() => getBoards()} />
    </div >
}