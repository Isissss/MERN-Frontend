import { useParams } from "react-router-dom";
import { Link, useNavigate } from 'react-router-dom';
import { Modal } from "react-bootstrap";
import { themeContext } from "../Layout";
import { useContext, useState, useEffect } from "react";


export function CardDetail(props) {


    const params = useParams();
    const [card, setCard] = useState(null);
    const theme = useContext(themeContext);
    const BASE_URL = 'https://prg06.iettech.nl/cards';
    const navigate = useNavigate();


    const cardCall = () => {
        fetch(`${BASE_URL}/${params.id}`, {
            headers: {
                Accept: 'application/json',
            },
        })
            .then((res) => res.json())
            .then((res) => setCard(res))
            .catch((err) => handleError(err));
    };

    useEffect(cardCall, []);
    if (!card) return (<div>Card not found</div>);


    const handleError = (err) => {
        console.log(err);

    };



    function handleClose() {
        navigate("/cards", { replace: true })
    }
    if (!card) { return (<div>Still loading...</div>) }
    return (
        <>
            <Modal show={true} onHide={() => handleClose()}>
                <Modal.Header closeButton closeVariant={theme === "blue" ? null : 'white'}>
                    <Modal.Title> {card.title} </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {card.body}
                </Modal.Body>
                <Modal.Footer>  <Link to={`/cards/${card._id}/edit`} className={` btn btn-primary `}>Edit card</Link>  </Modal.Footer>

            </Modal >
        </>
    )
}
