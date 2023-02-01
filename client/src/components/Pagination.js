import { Button } from 'react-bootstrap';

export function Pagination(props) {
    const pagination = props.pagination;
    return <>
        {
            pagination.totalPages !== 1 &&
            <div className="pagination">
                <Button variant="primary" disabled={pagination.currentPage === 1} onClick={() => props.changePageHandler(pagination._links?.previous.href)}>Previous</Button>
                <span style={{ margin: "7px 20px 0 20px", textAlign: 'center' }}> {pagination.currentPage} / {pagination.totalPages} </span>
                <Button variant="primary" disabled={pagination.currentPage == pagination.totalPages} onClick={() => props.changePageHandler(pagination._links?.next.href)}>Next</Button>
            </div>
        }
    </>
}