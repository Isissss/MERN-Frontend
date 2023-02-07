import { Outlet } from 'react-router-dom';
import { Board } from "./components/Board";
import { Pagination } from './Pagination';
export function BoardLayout(props) {
    return <div>
        <div>
            <Board cards={props.cards} refreshLists={props.refreshLists} cardRefreshHandler={() => props.cardRefreshHandler()} />
            <Pagination pagination={props.pagination} changePageHandler={props.changePageHandler} />
            <Outlet />
        </div>
    </div >
}   