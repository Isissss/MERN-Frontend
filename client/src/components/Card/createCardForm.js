import { Button, Form, Modal } from "react-bootstrap"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export function CreateCard(props) {

    const boardCallFunc = useOutletContext();
    const navigate = useNavigate();
    const { auth } = useAuth();
    const params = useParams();

    function handleClose() {
        navigate(`/board/${params.id}`, { replace: true })
    }

    const [card, setCard] = useState({
        title: '',
        author: 't',
        body: '',
        severity: '',
        location: '',
        category: '',
        list_id: params.listId
    });

    function onChangeHandler(e) {
        setCard({ ...card, [e.target.name]: e.target.value });
    }


    const createCard = (e) => {
        if (card.title === '' || card.body === '' || card.severity === '' || card.location === '' || card.category === '') {
            return;
        }

        fetch("https://prg06.iettech.nl/cards", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${auth.token}`
            },
            useCredentials: true,
            body: JSON.stringify(card)
        })
            .then((res) => boardCallFunc())
            .then((res) => handleClose())
            .then((res) => props.socket.emit("sendUpdate", params.id))
            .catch((err) => console.log(err));
    };

    return <div>
        {
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