import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BoardCard } from './BoardCard';


export function BoardList() {
    const [boards, setBoards] = useState([]);
    const BASE_URL = 'https://prg06.iettech.nl/boards';

    const getBoards = async () => {
        await axios.get(BASE_URL, { headers: { Accept: 'application/json' } }).then((res) => {
            setBoards(res.data.items);
        }).catch((err) => console.log(err));

    }

    useEffect(() => {
        getBoards();
    }, []);


    return (
        <div className="board-list">
            {boards.map((value) => (
                <BoardCard board={value} key={value._id} />
            ))}
        </div>
    );
}
