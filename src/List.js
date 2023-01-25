import { Card } from "./Card/Card";
import { Link } from 'react-router-dom';
import { FaTrash } from "react-icons/fa";
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
        <div className="list">
            <div className="list-header">{props.cards.name} <button onClick={() => deleteList()} className="delete-btn"> <FaTrash /> </button>  </div>
            <div className="cards">{props.cards.cards.map((value) => (
                <Card
                    card={value}
                    key={value._id}
                    cardRefreshHandler={props.cardRefreshHandler}
                />
            ))}

            </div><div className="list-footer">
                <Link className="btn btn-primary btn-newCard" to={`/cards/${props.cards._id}/create`}>New Card</Link>
            </div></div>

    </div>
}