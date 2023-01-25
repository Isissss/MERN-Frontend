
import { List } from "./List";
import { themeContext } from "./Layout";
import { useContext } from "react";
import { NewListButton } from "./NewListButton";
import { Button } from "react-bootstrap";
export function Board(props) {

    const cards = props.cards

    const theme = useContext(themeContext);

    return <div className={`board ${theme}`}>
        {cards.map((value, index) => (
            <List cards={props.cards[index]} key={value._id} cardRefreshHandler={() => props.cardRefreshHandler()} />

        ))}
        <NewListButton cardRefreshHandler={props.cardRefreshHandler} />

    </div>
}