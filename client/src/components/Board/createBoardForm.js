import axios from 'axios';
import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';

export function NewBoard(props) {
    const [name, setName] = useState('');
    const { auth } = useContext(AuthContext);
    const BASE_URL = 'https://prg06.iettech.nl/boards';

    const addBoard = async (e) => {
        e.preventDefault();

        if (!name) return alert('Please fill in a name');

        await axios.post(BASE_URL, {
            name: name
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.accessToken}`
            },
            useCredentials: true
        }
        ).then((res) => {
            setName('');
            props.getBoards();
        }).catch((err) => console.log(err));
    }

    const onChangeHandler = (e) => {
        setName(e.target.value);
    }


    return (
        <div className="board-list">
            <form onSubmit={(e) => addBoard(e)}>
                <input type="text" name="title" onChange={(e) => onChangeHandler(e)} value={name} placeholder="Title" />
                <button type="submit">Create</button>
            </form>
        </div>

    );
}
