import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


export function BoardCard(props) {
    const board = props.board;
    return (
        <div className="card">
            <Link to={`/board/${board._id}`} > ddd </Link> {board.name}
        </div>
    );
}
