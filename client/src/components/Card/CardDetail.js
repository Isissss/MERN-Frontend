import { useParams } from "react-router-dom";
import { Link, useNavigate } from 'react-router-dom';
import { Modal } from "react-bootstrap";
import { useState, useEffect } from "react";


export function CardDetail(props) {
    const params = useParams();
    const [card, setCard] = useState(null);
    const BASE_URL = 'https://prg06.iettech.nl/cards';
    const navigate = useNavigate();

    const cardCall = () => {
        fetch(`${BASE_URL}/${params.cardId}`, {
            headers: {
                Accept: 'application/json',
            },
        })
            .then((res) => res.json())
            .then((res) => setCard(res))
            .catch((err) => console.log(err));
    };

    useEffect(cardCall, []);

    function handleClose() {
        navigate(`/board/${params.id}`, { replace: true })
    }

    if (!card) { return console.log("Loading") }

    return (
        <>
            <Modal show={true} onHide={() => handleClose()}>
                <Modal.Header closeButton >
                    <Modal.Title> {card.title} </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <b> Description: </b> <span className="text-break"> {card.body} </span> <br /> <br /> <br />
                    <b> Category: </b>{card.category} <br />
                    <b> Severity: </b> {card.severity} <br />
                    <b> Location: </b> {card.location}
                </Modal.Body>
                <Modal.Footer>
                    <Link to={`edit`} className="btn btn-primary">Edit card</Link>
                </Modal.Footer>
            </Modal>
        </>
    )
}