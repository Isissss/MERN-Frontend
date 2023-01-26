import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';

export function ErrorPopup() {
    const [show, setShow] = useState(true);

    return (
        <div className="error">

            <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
                <Toast.Body>An error occured</Toast.Body>
            </Toast>

        </div>
    );
}
