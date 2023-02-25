import { List } from "../List/List";
import { themeContext } from "../Layout";
import { useContext, useEffect } from "react";
import { NewListButton } from "../List/createListButton";
import { DragDropContext } from "react-beautiful-dnd";


export function Board(props) {
    if (!props.board) return
    const { theme, setTheme } = useContext(themeContext)
    const lists = props.board.lists
    const BASE_URL = 'https://prg06.iettech.nl/cards';

    useEffect(() => {
        localStorage.setItem("theme", JSON.stringify(theme));
    }, [theme]);


    const toggleTheme = (e) => {
        if (e.target.value === theme || (e.target.value !== "blue" && e.target.value !== "purple" && e.target.value !== "black")) return;
        setTheme(e.target.value);
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;

        // Remove card from source list and move to destination list
        if (result.destination.droppableId !== result.source.droppableId) {
            const index = lists.findIndex(x => x._id === result.source.droppableId)
            const indexDest = lists.findIndex(x => x._id === result.destination.droppableId)
            lists[indexDest].cards.splice(result.destination.index, 0, lists[index].cards[result.source.index])
            lists[index].cards.splice(result.source.index, 1)
        } else {
            // Move card within list
            const index = lists.findIndex(x => x._id === result.source.droppableId)
            const [removed] = lists[index].cards.splice(result.source.index, 1);
            lists[index].cards.splice(result.destination.index, 0, removed);
        }

        fetch(`${BASE_URL}/${result.draggableId}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ list_id: result.destination.droppableId })
        })
            .then(() => props.socket.emit("sendUpdate", props.board._id))
            .catch((err) => console.log(err));
    }

    return <DragDropContext onDragEnd={onDragEnd}>
        <div className="board-layout">
            <div className="board-header px-3">
                <h2 className="text-white"> {props.board.name} </h2>
                <div className="colorPicker">
                    <input type="radio" id="blue" name="color" defaultChecked={theme === "blue"} value="blue" onClick={toggleTheme} />
                    <input type="radio" id="black" name="color" defaultChecked={theme === "black"} value="black" onClick={toggleTheme} />
                    <input type="radio" id="purple" name="color" defaultChecked={theme === "purple"} value="purple" onClick={toggleTheme} />
                </div>
            </div>
            <div className={`board-body ${theme}`}>
                {lists.map((value, index) => (
                    <List cards={lists[index]} key={value._id} socket={props.socket} cardRefreshHandler={() => props.cardRefreshHandler()} />
                ))}
                <NewListButton boardId={props.board._id} cardRefreshHandler={() => props.cardRefreshHandler()} socket={props.socket} />
            </div>
        </div>
    </DragDropContext>
}