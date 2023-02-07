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


        // fetch(BASE_URL, {
        //     method: 'get',
        //     headers: {
        //         Accept: 'application/json',
        //     },
        // })
        //     .then((data) => data.json())
        //     .then((data) => console.log(data))
        //     .then((data) => setBoards(data))
        //     .catch((error) => console.log(error));

    }

    useEffect(() => {
        getBoards();
    }, []);


    return (
        <div className="test">
            {boards.map((value) => (
                <BoardCard board={value} key={value._id} />

            ))}

        </div>
    );
}
