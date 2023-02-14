import { Link } from 'react-router-dom';


export function BoardCard(props) {
    const board = props.board;
    return <div className="card">
            <Link to={`/board/${board._id}`} className="btn btn-link stretched-link"> {board.name} </Link> 
        </div>
      

}
