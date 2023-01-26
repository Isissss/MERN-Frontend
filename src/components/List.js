import { Card } from "./Card/Card";
import { Link } from 'react-router-dom';
import { FaTrash } from "react-icons/fa";
import { Droppable } from "react-beautiful-dnd";
export function List(props) {
    const cards = props.cards
    const BASE_URL = 'https://prg06.iettech.nl/lists';

    const deleteList = () => {
        fetch(`${BASE_URL}/${props.cards._id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
            },
        })
            .then((res) => props.cardRefreshHandler())
            .catch((err) => console.log(err));
    };

    return <div>
        <div className="list" >
            <div className="list-header">{props.cards.name} <button onClick={() => deleteList()} className="delete-btn"> <FaTrash /> </button> </div>
            <Droppable droppableId={props.cards._id}>
                {(provided) => (
                    <div className="cards"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    > {cards.cards.map((value, index) => (
                        <Card
                            card={value}
                            index={index}
                            key={value._id}
                            cardRefreshHandler={props.cardRefreshHandler}
                        />

                    ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            <div className="list-footer">
                <Link className="btn btn-primary btn-newCard" to={`/cards/${props.cards._id}/create`}>New Card</Link>
            </div>
        </div>
    </div>
}