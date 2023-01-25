import { Outlet } from 'react-router-dom';
import { Board } from "./Board";
import { Button } from 'react-bootstrap';
export function BoardLayout(props) {
    console.log(props.pagination.totalPages !== props.pagination.currentPage)
    return <div>

        <div>
            <Board cards={props.cards} test={props.test} cardRefreshHandler={() => props.cardRefreshHandler()} />
            <div className="pagination">
                {props.pagination.currentPage !== 1 && <Button variant="primary" onClick={() => props.changePageHandler(props.pagination._links?.previous.href)}>Previous</Button>}
                {props.pagination.currentPage} / {props.pagination.totalPages}
                {props.pagination.totalPages !== props.pagination.currentPage && <Button variant="primary" onClick={() => props.changePageHandler(props.pagination._links?.next.href)}>Next</Button>}
            </div>
            <Outlet />
        </div>
    </div>
}   