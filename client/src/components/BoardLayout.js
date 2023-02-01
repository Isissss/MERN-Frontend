import { Outlet } from 'react-router-dom';
import { Board } from "./Board";
import { Pagination } from './Pagination';
export function BoardLayout(props) {
    return <div>
        <div>
            <Board lists={props.lists} socket={props.socket} refreshLists={props.refreshLists} cardRefreshHandler={() => props.cardRefreshHandler()} />
            <Pagination pagination={props.pagination} changePageHandler={props.changePageHandler} />
            <Outlet />
        </div>
    </div >
}   