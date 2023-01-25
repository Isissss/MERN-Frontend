import { React } from 'react';
import { Link } from 'react-router-dom';

export function Card(props) {
  const card = props.card;

  const deleteCard = () => {
    fetch(card._links.self.href, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
      },
    })
      .then((res) => props.cardRefreshHandler())
      .catch((err) => console.log(err));
  };

  return (
    <div className="card">
      <div className="card-body">

        <h5 className="card-title"> {card.title && card.title} </h5>
        <p className="card-text">  {card.body && card.body}
          <button className="btn-delete" style={{ zIndex: 1000, position: "relative" }} onClick={deleteCard}> Delete </button>
        </p>
        <Link className="stretched-link" to={`/cards/${card._id}`} />
      </div>
    </div>
  );
}
