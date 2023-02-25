import { Link } from 'react-router-dom';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';

export function BoardCard(props) {
    const { auth } = useAuth();
    const BASE_URL = 'https://prg06.iettech.nl/boards';
    const board = props.board;

    const deleteBoard = () => {
        axios.delete(`${BASE_URL}/${board._id}`, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${auth.accessToken}`,
            },
            withCredentials: true,
        })
            .then((res) => props.getBoards())
            .catch((err) => console.log(err));
    };

    return <div className="card">
        <Link to={`/board/${board._id}`} className="btn btn-link stretched-link"> {board.name} </Link>
        <button className="btn-delete" style={{ zIndex: 1000, position: "relative" }} onClick={deleteBoard}> Delete </button>
    </div>


}
