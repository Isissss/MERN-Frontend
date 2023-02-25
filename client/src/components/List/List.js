import { Card } from "../Card/Card";
import { Link } from 'react-router-dom';
import { FaTrash, FaPlus } from "react-icons/fa";
import { useEffect, useState, useRef } from 'react';
import { Droppable } from "react-beautiful-dnd";


export function List(props) {
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState(props.cards.name);
    const inputRef = useRef();
    const cards = props.cards
    const BASE_URL = 'https://prg06.iettech.nl/lists';
    let prevTitle

    useEffect(() => {
        if (!editing) return
        inputRef.current.focus()
        prevTitle = inputRef.current?.value
    }, [editing])

    useEffect(() => {
        setTitle(props.cards.name)
    }, [props.cards.name])

    const deleteList = () => {
        fetch(`${BASE_URL}/${props.cards._id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
            },
        })
            .then(() => props.socket.emit("sendUpdate", props.cards.board_id))
            .then(() => props.cardRefreshHandler())
            .catch((err) => console.log(err));
    };

    const updateList = (e) => {
        e.preventDefault()
        if (!title || prevTitle === title) return setEditing(false)

        fetch(`${BASE_URL}/${props.cards._id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: title })
        })
            .then(res => res.json())
            .then((res) => props.socket.emit("sendUpdate", props.cards.board_id))
            .catch((err) => console.log(err));

        setEditing(false)
    }

    const formHandler = (e) => {
        setTitle(e.target.value)
    }

    return <div>
        <div className="list" >
            <div className="list-header">
                <span id="list-title" onClick={(e) => setEditing(true)}>  {editing ? <form onSubmit={(e) => updateList(e)} > <input type="text" ref={inputRef} value={title} onBlur={(e) => updateList(e)} onChange={(e) => formHandler(e)} />  </form> : (`${title} `)} </span>
                <button onClick={() => deleteList()} className="delete-btn float-end"> <FaTrash /> </button> </div>
            <Droppable droppableId={props.cards._id}>
                {(provided) => (
                    <div className="cards"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    > {cards.cards.map((value, index) => (
                        <Card
                            card={value}
                            index={index}
                            socket={props.socket}
                            boardId={props.cards.board_id}
                            key={value._id}
                            cardRefreshHandler={props.cardRefreshHandler}
                        />

                    ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            <div className="list-footer">
                <Link className="btn btn-primary btn-newCard" to={`list/${props.cards._id}/create`}>
                    <FaPlus /> New Card</Link>
            </div>
        </div >
    </div >
}