import { useState, useRef, useEffect } from "react";
import { CloseButton, Form, Button } from "react-bootstrap";

export function CreateListForm(props) {
    const inputRef = useRef();
    const [list, setList] = useState({ name: '', board_id: props.boardId });
    useEffect(() => { inputRef.current.focus() }, []);

    const createList = (e) => {
        e.preventDefault();
        if (!list.name) return;
        fetch("https://prg06.iettech.nl/lists", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(list)
        })
            .then((res) => props.cardRefreshHandler())
            .then((res) => props.closeHandler())
            .then((res) => setList({ name: '' }))
            .then((res) => props.socket.emit("update", props.socket.id))
            .catch((err) => console.log(err));
    };

    function onChangeHandler(e) {
        setList({ ...list, [e.target.name]: e.target.value });
    }

    return <>
        <Form onSubmit={createList}>
            <Form.Control ref={inputRef} value={list.name} onChange={onChangeHandler} name="name" />
            <Button variant="primary" size="sm" type="submit"> Create </Button>
            <CloseButton onClick={() => props.closeHandler()} variant={'white'} />
        </Form>
    </>
}