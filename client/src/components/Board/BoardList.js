import { BoardCard } from './BoardCard';

export function BoardList(props) {
    return (
        <div className="board-list">
            {props.boards.map((value) => (
                <BoardCard board={value} key={value._id} getBoards={() => props.getBoards()} />
            ))}
        </div>
    );
}
