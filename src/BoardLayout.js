import { Outlet } from 'react-router-dom';
import { Board } from "./Board";
import { Button } from 'react-bootstrap';
export function BoardLayout(props) {

    return <div>
        <div>
            <Board cards={props.cards} test={props.test} cardRefreshHandler={() => props.cardRefreshHandler()} />
            {props.pagination.totalPages !== 1 && <div className="pagination">
                {props.pagination.currentPage !== 1 && <Button variant="primary" onClick={() => props.changePageHandler(props.pagination._links?.previous.href)}>Previous</Button>}
                <span style={{ margin: "7px 20px 0 20px", textAlign: 'center' }}> {props.pagination.currentPage} / {props.pagination.totalPages} </span>
                {props.pagination.totalPages !== props.pagination.currentPage && <Button variant="primary" onClick={() => props.changePageHandler(props.pagination._links?.next.href)}>Next</Button>}
            </div>}

            <Outlet />
        </div>
    </div >
}   