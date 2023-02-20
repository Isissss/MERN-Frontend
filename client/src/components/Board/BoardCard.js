import { Link } from 'react-router-dom';


export function BoardCard(props) {
    console.log(props);

    const BASE_URL = 'https://prg06.iettech.nl/boards';
    const board = props.board;

    const deleteBoard = () => {
        fetch(`${BASE_URL}/${board._id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
            },
        })
            .then((res) => props.getBoards())
            .catch((err) => console.log(err));
    };

    return <div className="card">
        <Link to={`/board/${board._id}`} className="btn btn-link stretched-link"> {board.name} </Link>
        <button className="btn-delete" style={{ zIndex: 1000, position: "relative" }} onClick={deleteBoard}> Delete </button>
    </div>


}
