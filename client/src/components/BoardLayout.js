import { Outlet } from 'react-router-dom';
import { Board } from "./Board";
import { Pagination } from './Pagination';
import { useParams } from 'react-router-dom';
export function BoardLayout(props) {
    const params = useParams()
    console.log(params);

    fetch(`https://prg06.iettech.nl/boards/${params.id}`, {
        method: 'get',
        headers: {
            Accept: 'application/json',
        },
    })
        .then((data) => data.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error));

    return <div>
        <div>
            <Board lists={props.lists} socket={props.socket} refreshLists={props.refreshLists} cardRefreshHandler={() => props.cardRefreshHandler()} />
            <Pagination pagination={props.pagination} changePageHandler={props.changePageHandler} />
            <Outlet />
        </div>
    </div >
}   