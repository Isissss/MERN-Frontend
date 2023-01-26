import { List } from "./List";
import { themeContext } from "./Layout";
import { useContext } from "react";
import { NewListButton } from "./NewListButton";
import { DragDropContext } from "react-beautiful-dnd";

export function Board(props) {
    const lists = props.lists
    const BASE_URL = 'https://prg06.iettech.nl/cards';
    const theme = useContext(themeContext);

    const onDragEnd = (result) => {
        if (!result.destination) return;

        // Remove card from source list and move to destination list
        const index = lists.findIndex(x => x._id === result.source.droppableId)
        const indexDest = lists.findIndex(x => x._id === result.destination.droppableId)
        lists[indexDest].cards.splice(result.destination.index, 0, lists[index].cards[result.source.index])
        lists[index].cards.splice(result.source.index, 1)

        fetch(`${BASE_URL}/${result.draggableId}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ list_id: result.destination.droppableId })
        })
            .catch((err) => console.log(err));
    }

    return <DragDropContext onDragEnd={onDragEnd}>
        <div className={`board ${theme}`}>
            {lists.map((value, index) => (
                <List cards={lists[index]} key={value._id} cardRefreshHandler={() => props.cardRefreshHandler()} />
            ))}
            <NewListButton cardRefreshHandler={props.cardRefreshHandler} />
        </div>
    </DragDropContext>
}