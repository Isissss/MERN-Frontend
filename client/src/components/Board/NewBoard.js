import axios from 'axios';
import { useState } from 'react';


export function NewBoard(props) {
    const [board, setBoard] = useState({});
    const BASE_URL = 'https://prg06.iettech.nl/boards';

    const addBoard = async (e) => {
        e.preventDefault();

        if (!board.name) return alert('Please fill in a name');
        await axios.post(BASE_URL, {
            name: board.name
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        ).then((res) => {
            console.log(res);
            setBoard({ name: '' });
            props.getBoards();
        }).catch((err) => console.log(err));
    }

    const onChangeHandler = (e) => {
        setBoard({ name: e.target.value });
    }


    return (
        <div className="board-list">
            <form onSubmit={(e) => addBoard(e)}>
                <input type="text" name="title" onChange={(e) => onChangeHandler(e)} value={board.title} placeholder="Title" />
                <button type="submit">Create</button>
            </form>
        </div>

    );
}
