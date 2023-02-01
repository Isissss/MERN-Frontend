import { Button, Form, Modal } from "react-bootstrap"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { ErrorPopup } from "../ErrorPopup";

export function CreateCard(props) {
    const [error, setError] = useState(false);

    const navigate = useNavigate();
    const params = useParams();

    function handleClose() {
        navigate("/cards", { replace: true })
    }

    const [card, setCard] = useState({
        title: '',
        author: 't',
        body: '',
        severity: '',
        location: '',
        category: '',
        list_id: params.id
    });

    function onChangeHandler(e) {
        setCard({ ...card, [e.target.name]: e.target.value });
    }

    const handleError = (err) => {
        console.log(err);
        setError(true);
    };

    const createCard = (e) => {
        if (card.title === '' || card.body === '' || card.severity === '' || card.location === '' || card.category === '') {
            return;
        }

        fetch("https://prg06.iettech.nl/cards", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(card)
        })
            .then((res) => props.cardRefreshHandler())
            .then((res) => handleClose())
            .then((res) => props.socket.emit("update", props.socket.id))
            .catch((err) => handleError(err));
    };

    return <div>
        {error && <ErrorPopup />}
        {!error &&
            <Modal show={true} onHide={() => handleClose()}>
                <Modal.Header closeButton>
                    <Modal.Title> New card </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control value={card.title} onChange={onChangeHandler} name="title" />
                        </Form.Group>
                        <Form.Group controlId="formBody">
                            <Form.Label>Body</Form.Label>
                            <Form.Control as="textarea" rows={3} name="body" value={card.body} onChange={onChangeHandler} />
                        </Form.Group>
                        <Form.Group controlId="formSev">
                            <Form.Label>Severity</Form.Label>
                            <Form.Control value={card.severity} onChange={onChangeHandler} name="severity" />
                        </Form.Group>
                        <Form.Group controlId="formLocation">
                            <Form.Label>Location</Form.Label>
                            <Form.Control value={card.location} onChange={onChangeHandler} name="location" />
                        </Form.Group>
                        <Form.Group controlId="formCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Control value={card.category} onChange={onChangeHandler} name="category" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleClose()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => createCard()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        }
    </div >
}