import { Button, Form, Modal } from "react-bootstrap"
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

export function EditCard(props) {
    console.log(props)
    const params = useParams();
    const [card, setCard] = useState([]);
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
            .catch((err) => console.log(err));
    };

    useEffect(cardCall, []);

    const EditCard = (e) => {
        fetch(`${BASE_URL}/${params.id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(card)
        })
            .then((res) => props.cardRefreshHandler())
            .then((res) => props.socket.emit("update"))
            .then((res) => goBack())
            .catch((err) => console.log(err));
    };


    if (!card) return (console.log("Loading"));

    function handleClose() {
        navigate(`/cards`, { replace: true })
    }

    function onChangeHandler(e) {
        setCard({ ...card, [e.target.name]: e.target.value });

    }
    const goBack = () => {
        navigate(`/cards/${params.id}`, { replace: true })
    }

    return <div>
        <Modal show={true} onHide={() => handleClose()}>
            <Modal.Header closeButton>
                <Modal.Title> Edit card </Modal.Title>
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
                <Button variant="secondary" onClick={() => goBack()}>
                    Back
                </Button>
                <Button variant="primary" onClick={() => EditCard()}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
}