import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { CreateListForm } from "./createListForm";

export function NewListButton(props) {
    const [creating, setCreating] = useState(false);

    function handleClose() {
        setCreating(false);
    }

    return <div>
        {creating ?
            (<div> <CreateListForm cardRefreshHandler={props.cardRefreshHandler} closeHandler={() => handleClose()} /> </div>)
            :
            (<button className="btn btn-secondary btn-newList" onClick={() => setCreating(true)}> <span> <FaPlus /> <span className="test"> New List</span> </span></button>)
        }
    </div >
}