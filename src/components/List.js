import React from 'react';

const list = (props) => {
    console.log('rendering list....');

    return <ul>
            {props.todoList.map((m,i) => <li key={m.id} onClick={() => props.onClick(m.id)}>{m.name}</li>)}
        </ul>
};


export default list;