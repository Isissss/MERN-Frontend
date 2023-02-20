import axios from 'axios';
import { useEffect, useState } from 'react';
import { BoardList } from "../components/Board/BoardList"
import { NewBoard } from "../components/Board/NewBoard"

export function Home(props) {
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