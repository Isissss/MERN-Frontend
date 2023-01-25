import { useState, useRef } from "react";

import { FaPlus } from "react-icons/fa";
import { CreateListForm } from "./createListForm";

export function NewListButton(props) {
    const [creating, setCreating] = useState(false);
    const inputRef = useRef();
    function handleClose() {
        setCreating(false);
    }

    const [list, setList] = useState({
        name: ''
    });

    const test = () => {
        setCreating(true);

        console.log(inputRef.current)
    }


    return <div>

        {
            creating ? (<div> <CreateListForm cardRefreshHandler={props.cardRefreshHandler} closeHandler={() => handleClose()} /></div>
            )
                :
                (<button className="btn btn-secondary btn-newList" onClick={() => test()}> <span> <FaPlus /> <span className="test"> New List</span> </span></button>)
        }
    </div >
}