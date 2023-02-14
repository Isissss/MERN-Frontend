import { React } from 'react';
import { Draggable } from "react-beautiful-dnd";
import { Link } from 'react-router-dom';

export function Card(props) {
  const card = props.card;
  const BASE_URL = 'https://prg06.iettech.nl/cards';

  const deleteCard = () => {
    fetch(`${BASE_URL}/${card._id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
      },
    })
      .then((res) => props.cardRefreshHandler())
      .then((res) => props.socket.emit("sendUpdate", props.boardId))
      .catch((err) => console.log(err));
  };

  if (!card) return (<div>Still loading...</div>)
  return (
    <Draggable draggableId={card._id} index={props.index}>
      {(provided, snapshot) => {
        return (
          <div className="card" ref={provided.innerRef}
            snapshot={snapshot}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className="card-body">
              <p className="card-text">  {card.title}
                <button className="btn-delete" style={{ zIndex: 1000, position: "relative" }} onClick={deleteCard}> Delete </button>
              </p>
              <Link to={`card/${card._id}`} className="btn btn-link stretched-link" />
            </div>
          </div>
        )
      }}
    </Draggable>
  );
}
